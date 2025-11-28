#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./setup-dev.sh            -> do install (idempotent)
#   ./setup-dev.sh --re-install
#   ./setup-dev.sh --reinstall

# -------------------------
# Safety checks (NEW)
# -------------------------
# 1) Don't run as root (script must be run as normal user)
if [ "$(id -u)" -eq 0 ]; then
  cat <<'MSG' >&2
ERROR: Do NOT run this script as root or via sudo.
This script installs per-user tools like pyenv and nvm and must run as a regular user.
Run it as your normal user (no sudo):
  ./setup-dev.sh
MSG
  exit 1
fi

# 2) Prevent accidentally running when HOME is /root
if [ "${HOME:-}" = "/root" ]; then
  echo "ERROR: Your HOME is /root. Please run this script as a non-root user." >&2
  exit 1
fi

# 3) If /root/.pyenv exists (likely from an earlier sudo mistake), try to remove it using sudo.
if [ -d /root/.pyenv ]; then
  echo "Detected /root/.pyenv from a previous run (likely from running pyenv under sudo)."
  echo "Attempting to remove /root/.pyenv using sudo (you will be prompted for your password)."
  if sudo rm -rf /root/.pyenv; then
    echo "/root/.pyenv removed successfully."
  else
    echo "Failed to remove /root/.pyenv. Please run this command as your user and re-run the script:" >&2
    echo "  sudo rm -rf /root/.pyenv" >&2
    exit 1
  fi
fi

# 4) If SUDO_USER is set (meaning user invoked via sudo), abort.
if [ -n "${SUDO_USER:-}" ]; then
  echo "ERROR: Detected SUDO_USER environment variable. Do not run this script via sudo." >&2
  echo "Run as your normal user account instead: ./setup-dev.sh" >&2
  exit 1
fi

# -------------------------
# End safety checks
# -------------------------

REINSTALL=false
for arg in "$@"; do
  case "$arg" in
    --re-install|--reinstall)
      REINSTALL=true
      ;;
    *)
      echo "Unknown arg: $arg"
      ;;
  esac
done

# Variables
PYENV_ROOT="$HOME/.pyenv"
NVM_DIR="$HOME/.nvm"
VSCODE_DEBUG_PATH="/usr/local/lib/vscode-js-debug"
LAZY_NVIM_DEST="$HOME/.local/share/nvim/site/pack/lazy/start/lazy.nvim"
NVIM_CONFIG_DIR="$HOME/.config/nvim"
VENV_NAME="ml-ai"
PYENV_PYTHON_VERSION="3.13.0"
CODE_WORKDIR="$HOME/Documents/code"
BACKUP_DIR="$HOME/.setup_dev_backups_$(date +%s)"

# Helper functions
info(){ echo -e "\n=== $* ==="; }
safe_backup() {
  local file="$1"
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR"
    cp -a "$file" "$BACKUP_DIR/$(basename "$file").bak"
    echo "backed up $file -> $BACKUP_DIR/$(basename "$file").bak"
  fi
}

# -- Reinstall mode: remove things installed by this script (best-effort)
remove_tooling() {
  info "Running removal (best-effort). You may be prompted for sudo."

  mkdir -p "$BACKUP_DIR"
  safe_backup "$HOME/.bashrc"
  safe_backup "$HOME/.profile"
  safe_backup "$HOME/.zshrc" || true

  # 1) Remove pyenv + virtualenv
  if [ -d "$PYENV_ROOT" ]; then
    info "Removing pyenv directory $PYENV_ROOT"
    rm -rf "$PYENV_ROOT"
  fi

  # 2) Remove nvm
  if [ -d "$NVM_DIR" ]; then
    info "Removing nvm directory $NVM_DIR"
    rm -rf "$NVM_DIR"
  fi

  # 3) Remove pyenv-related lines from shell rc files (best-effort)
  for rc in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.zshrc"; do
    if [ -f "$rc" ]; then
      cp -a "$rc" "$BACKUP_DIR/$(basename "$rc").pre_remove"
      sed -E '/pyenv|NVM_DIR|nvm\.sh|nodenv/d' "$BACKUP_DIR/$(basename "$rc").pre_remove" > "$rc"
      echo "cleaned pyenv/nvm lines from $rc (backup in $BACKUP_DIR)"
    fi
  done

  # 4) Remove vscode (apt)
  if command -v code >/dev/null 2>&1; then
    info "Removing VS Code (apt) -- may need sudo"
    sudo apt remove -y code || true
  fi
  if [ -f /etc/apt/sources.list.d/vscode.list ]; then
    sudo rm -f /etc/apt/sources.list.d/vscode.list || true
  fi
  if [ -f /usr/share/keyrings/packages.microsoft.gpg ]; then
    sudo rm -f /usr/share/keyrings/packages.microsoft.gpg || true
  fi

  # 5) Remove vscode-js-debug
  if [ -d "$VSCODE_DEBUG_PATH" ]; then
    info "Removing $VSCODE_DEBUG_PATH"
    sudo rm -rf "$VSCODE_DEBUG_PATH"
  fi

  # 6) Remove lazy.nvim
  if [ -d "$LAZY_NVIM_DEST" ]; then
    info "Removing lazy.nvim at $LAZY_NVIM_DEST"
    rm -rf "$LAZY_NVIM_DEST"
  fi

  # 7) Remove neovim config
  if [ -d "$NVIM_CONFIG_DIR" ]; then
    info "Removing neovim config $NVIM_CONFIG_DIR"
    rm -rf "$NVIM_CONFIG_DIR"
  fi

  # 8) Do not delete user code; only remove if empty
  if [ -d "$CODE_WORKDIR" ]; then
    if [ -z "$(ls -A "$CODE_WORKDIR")" ]; then
      rmdir "$CODE_WORKDIR"
    else
      echo "Note: $CODE_WORKDIR is not empty; left intact to avoid deleting user code."
    fi
  fi

  # 9) Remove apt packages installed by the script (best-effort)
  info "Attempting to remove apt packages installed by this script (android-tools-adb, android-tools-fastboot, nodejs, npm, neovim)."
  sudo apt remove -y android-tools-adb android-tools-fastboot nodejs npm neovim || true

  # 10) Remove global npm packages (no longer used by this script)
  if command -v npm >/dev/null 2>&1; then
    info "Skipping npm global removal (we no longer install LSPs globally)."
  fi

  # 11) pip packages
  if command -v pip >/dev/null 2>&1 || command -v pip3 >/dev/null 2>&1; then
    PIP_CMD="$(command -v pip3 || command -v pip)"
    info "Attempting to uninstall python packages installed by script: debugpy"
    $PIP_CMD uninstall -y debugpy || true
  fi

  # 12) cleanup local caches and leftover directories
  rm -rf "$HOME/.cache/nvim" "$HOME/.local/state/nvim" "$HOME/.local/share/nvim/site/pack/lazy" || true

  info "Finished removal step. APT packages were only 'removed' (not purged). You may run 'sudo apt autoremove -y' manually if you want."
}

# If user asked for re-install, perform removal first
if [ "$REINSTALL" = true ]; then
  remove_tooling
  info "Removal complete. Proceeding to fresh install."
fi

# --- Ensure system up-to-date and base deps ---
info "Updating system package list and installing base dependencies"
sudo apt update
sudo apt upgrade -y

sudo apt install -y \
  curl git build-essential unzip wget software-properties-common gnupg cmake python3-dev ninja-build \
  neovim ripgrep fd-find python3-pip nodejs npm \
  libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev llvm \
  libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl

# --- Install NVM ---
if [ ! -d "$NVM_DIR" ] || ! command -v nvm >/dev/null 2>&1; then
  info "Installing NVM"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # Ensure profile contains NVM export
  safe_backup "$HOME/.bashrc"
  if ! grep -q 'NVM_DIR' "$HOME/.bashrc"; then
    cat >> "$HOME/.bashrc" <<'EOF'

# NVM (added by setup-dev.sh)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF
  fi

  # Load nvm into current shell
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
else
  info "NVM already installed"
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi

# --- Install pyenv using pyenv.run and ensure proper evals are available in this script's environment ---
if ! command -v pyenv >/dev/null 2>&1; then
  info "Installing pyenv using https://pyenv.run"
  curl https://pyenv.run | bash

  # add pyenv initialization to .bashrc/.profile (if not already present)
  safe_backup "$HOME/.bashrc"
  if ! grep -q 'pyenv init' "$HOME/.bashrc"; then
    cat >> "$HOME/.bashrc" <<'EOF'

# pyenv (added by setup-dev.sh)
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
# For login shells (PATH manipulation)
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi
# For interactive shells
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
fi
EOF
  fi
fi

# Ensure pyenv environment variables are present for the current run (so pyenv works immediately)
export PYENV_ROOT="${PYENV_ROOT:-$HOME/.pyenv}"
export PATH="$PYENV_ROOT/bin:$PATH"

# Initialize pyenv for this shell (both login & interactive forms)
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)" 2>/dev/null || true
  eval "$(pyenv init -)" 2>/dev/null || true
  eval "$(pyenv virtualenv-init -)" 2>/dev/null || true
else
  # If pyenv not in PATH but installation dir exists, source its bin
  if [ -x "$PYENV_ROOT/bin/pyenv" ]; then
    export PATH="$PYENV_ROOT/bin:$PATH"
    eval "$("$PYENV_ROOT/bin/pyenv" init --path)" 2>/dev/null || true
  fi
fi

# Verify pyenv available, otherwise error instructing to source rc
if ! command -v pyenv >/dev/null 2>&1; then
  echo "ERROR: pyenv not found in PATH after installation. Please open a new shell or run 'source ~/.bashrc'. Exiting."
  exit 1
fi

# Ensure pyenv-virtualenv plugin exists (pyenv.run typically adds it)
if [ ! -d "$PYENV_ROOT/plugins/pyenv-virtualenv" ]; then
  info "Installing pyenv-virtualenv plugin"
  git clone https://github.com/pyenv/pyenv-virtualenv.git "$PYENV_ROOT/plugins/pyenv-virtualenv"
fi

# Rehash & update
pyenv rehash || true

# Create Python version and virtualenv if needed
if ! pyenv versions --bare | grep -q "^${PYENV_PYTHON_VERSION}\$"; then
  info "Installing Python ${PYENV_PYTHON_VERSION} via pyenv (may take a while)"
  # make build slightly more robust by exporting configure opts
  env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install -s "$PYENV_PYTHON_VERSION"
fi

if ! pyenv virtualenvs --bare | grep -q "^${VENV_NAME}\$"; then
  info "Creating pyenv virtualenv ${VENV_NAME}"
  pyenv virtualenv "$PYENV_PYTHON_VERSION" "$VENV_NAME"
fi

info "Activating pyenv virtualenv $VENV_NAME for this script"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
pyenv activate "$VENV_NAME" || true

# Upgrade pip inside venv and install debugpy
info "Upgrading pip and installing Python dev packages inside ${VENV_NAME}"
pip install --upgrade pip setuptools wheel
pip install --upgrade debugpy || true

# Install adb & fastboot
info "Installing ADB & Fastboot"
sudo apt install -y android-tools-adb android-tools-fastboot || true

# ----------------------------
# 5. Install VS Code JS Debug Adapter (use prebuilt release instead of building)
# ----------------------------
if [ ! -d "$VSCODE_DEBUG_PATH" ]; then
  info "Installing VS Code JS Debug Adapter (using latest release tarball)"
  tmpdir="$(mktemp -d)"
  pushd "$tmpdir" >/dev/null

  # Get latest release tarball URL via GitHub API (best-effort)
  release_json="$(curl -sS https://api.github.com/repos/microsoft/vscode-js-debug/releases/latest || true)"
  tarball_url="$(printf '%s\n' "$release_json" | grep -o '"tarball_url": *"[^"]*"' | sed -E 's/.*"([^"]+)".*/\1/' || true)"

  if [ -n "$tarball_url" ]; then
    info "Downloading release tarball from GitHub API"
    curl -sL -o js-debug.tar.gz "$tarball_url"
    sudo mkdir -p "$VSCODE_DEBUG_PATH"
    # Extract strip top-level folder into destination
    sudo tar -xzf js-debug.tar.gz --strip-components=1 -C "$VSCODE_DEBUG_PATH"
    info "Extracted js-debug release into $VSCODE_DEBUG_PATH"
  else
    info "Could not retrieve release tarball (API rate-limited or network issue). Falling back to cloning (no forced npm build)."
    sudo mkdir -p "$(dirname "$VSCODE_DEBUG_PATH")"
    sudo chown "$USER":"$USER" "$(dirname "$VSCODE_DEBUG_PATH")"
    git clone https://github.com/microsoft/vscode-js-debug.git "$VSCODE_DEBUG_PATH"
    # Do NOT attempt npm run build unconditionally; do a best-effort npm install if npm available.
    if command -v npm >/dev/null 2>&1; then
      cd "$VSCODE_DEBUG_PATH"
      npm install || true
      # Only run build if the repo exposes a build script
      if npm run | grep -q ' build'; then
        npm run build || true
      else
        info "No top-level 'build' script present in repo; skipping 'npm run build'."
      fi
      cd - >/dev/null || true
    fi
  fi

  popd >/dev/null
  rm -rf "$tmpdir"
else
  info "VS Code JS Debug Adapter already exists at $VSCODE_DEBUG_PATH"
fi

# Install VS Code (apt repo) - idempotent check
if ! command -v code >/dev/null 2>&1; then
  info "Installing VS Code (apt)"
  curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /tmp/packages.microsoft.gpg
  sudo install -o root -g root -m 644 /tmp/packages.microsoft.gpg /usr/share/keyrings/packages.microsoft.gpg
  sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
  sudo apt update
  sudo apt install -y code || true
  rm -f /tmp/packages.microsoft.gpg
else
  info "VS Code already installed"
fi

# Install lazy.nvim into official pack path for neovim & make a minimal init.lua
if [ ! -d "$LAZY_NVIM_DEST" ]; then
  info "Installing lazy.nvim into $LAZY_NVIM_DEST"
  mkdir -p "$(dirname "$LAZY_NVIM_DEST")"
  git clone https://github.com/folke/lazy.nvim.git "$LAZY_NVIM_DEST"
else
  info "lazy.nvim already exists at $LAZY_NVIM_DEST"
fi

# Create a minimal init.lua that bootstraps lazy.nvim and includes Mason/mason-lspconfig/nvim-lspconfig
mkdir -p "$NVIM_CONFIG_DIR"
INIT_LUA="$NVIM_CONFIG_DIR/init.lua"
if [ ! -f "$INIT_LUA" ] || ! grep -q "mason.nvim" "$INIT_LUA"; then
  safe_backup "$INIT_LUA"
  cat > "$INIT_LUA" <<'EOF'
-- Minimal init.lua to bootstrap lazy.nvim and Mason (created by setup-dev.sh)
local lazypath = vim.fn.stdpath("data") .. "/site/pack/lazy/start/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  -- Mason and LSP plugins
  { "williamboman/mason.nvim" },
  { "williamboman/mason-lspconfig.nvim" },
  { "neovim/nvim-lspconfig" },

  -- Optional extras you might like (uncomment to enable)
  -- { "hrsh7th/nvim-cmp" },
  -- { "hrsh7th/cmp-nvim-lsp" },
})

-- Mason setup and ensure_installed for LSP servers we want
require("mason").setup()
require("mason-lspconfig").setup {
  ensure_installed = { "bashls", "pyright", "tsserver" },
}

-- Basic lspconfig setup for the installed servers
local lspconfig = require("lspconfig")
-- bash
lspconfig.bashls.setup{}
-- python
lspconfig.pyright.setup{}
-- typescript / javascript
lspconfig.tsserver.setup{}

-- Basic sensible defaults
vim.o.number = true
vim.o.relativenumber = true
vim.o.expandtab = true
vim.o.shiftwidth = 2
vim.o.tabstop = 2
EOF
  info "Wrote minimal $INIT_LUA (backed up previous file if existed) with Mason config"
else
  info "$INIT_LUA already contains Mason bootstrap"
fi

# Ensure code workspace exists
mkdir -p "$CODE_WORKDIR"

# NOTE: We no longer install language servers globally via npm.
# Instead, Mason.nvim will manage LSP servers (installs into Neovim's data dir).
info "Skipping npm global language-server installs; Mason.nvim will manage LSP servers for Neovim."

info "Setup complete!"
echo
echo "Important next steps:"
echo "  - Open a new terminal or run: source ~/.bashrc"
echo "  - Launch Neovim: nvim"
echo "  - Inside Neovim run: :Lazy to let lazy.nvim finish plugin setup"
echo "  - Then run: :Mason and verify the servers (bashls, pyright, tsserver) are installed."
echo "Activate the pyenv virtualenv with: pyenv activate $VENV_NAME"

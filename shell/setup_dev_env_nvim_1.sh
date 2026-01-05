#!/usr/bin/env bash
set -euo pipefail

# setup-dev.sh
# Usage:
#   ./setup-dev.sh              -> install / bootstrap
#   ./setup-dev.sh --re-install -> remove then fresh install
#   ./setup-dev.sh --remove     -> remove everything created by the script and exit

# -------------------------
# Safety checks
# -------------------------
if [ "$(id -u)" -eq 0 ]; then
  cat <<'MSG' >&2
ERROR: Do NOT run this script as root or via sudo.
This script installs per-user tools (pyenv, nvm, etc.) and must run as a regular user.
Run it as your normal user (no sudo):
  ./setup-dev.sh
MSG
  exit 1
fi

if [ "${HOME:-}" = "/root" ]; then
  echo "ERROR: Your HOME is /root. Please run this script as a non-root user." >&2
  exit 1
fi

# If /root/.pyenv exists (likely from earlier sudo mistake), try to remove it using sudo.
if [ -d /root/.pyenv ]; then
  echo "Detected /root/.pyenv from a previous run (likely caused by running pyenv under sudo)."
  echo "Attempting to remove /root/.pyenv using sudo (you will be prompted for your password)."
  if sudo rm -rf /root/.pyenv; then
    echo "/root/.pyenv removed successfully."
  else
    echo "Failed to remove /root/.pyenv. Please run this command as your user and re-run the script:" >&2
    echo "  sudo rm -rf /root/.pyenv" >&2
    exit 1
  fi
fi

if [ -n "${SUDO_USER:-}" ]; then
  echo "ERROR: Detected SUDO_USER environment variable. Do not run this script via sudo." >&2
  echo "Run as your normal user account instead: ./setup-dev.sh" >&2
  exit 1
fi

# -------------------------
# Args
# -------------------------
REINSTALL=false
REMOVE_ONLY=false

for arg in "$@"; do
  case "$arg" in
    --re-install|--reinstall)
      REINSTALL=true
      ;;
    --remove)
      REMOVE_ONLY=true
      ;;
    *)
      echo "Unknown arg: $arg"
      exit 1
      ;;
  esac
done

# -------------------------
# Variables
# -------------------------
PYENV_ROOT="${PYENV_ROOT:-$HOME/.pyenv}"
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
VSCODE_DEBUG_PATH="${VSCODE_DEBUG_PATH:-/usr/local/lib/vscode-js-debug}"
LAZY_NVIM_DEST="${LAZY_NVIM_DEST:-$HOME/.local/share/nvim/site/pack/lazy/start/lazy.nvim}"
NVIM_CONFIG_DIR="${NVIM_CONFIG_DIR:-$HOME/.config/nvim}"
VENV_NAME="${VENV_NAME:-ml-ai}"
PYENV_PYTHON_VERSION="${PYENV_PYTHON_VERSION:-3.13.0}"
CODE_WORKDIR="${CODE_WORKDIR:-$HOME/Documents/code}"
BACKUP_DIR="${BACKUP_DIR:-$HOME/.setup_dev_backups_$(date +%s)}"
NVIM_APPIMAGE_URL="${NVIM_APPIMAGE_URL:-https://github.com/neovim/neovim/releases/latest/download/nvim.appimage}"

# -------------------------
# Helpers
# -------------------------
info(){ echo -e "\n=== $* ==="; }
safe_backup() {
  local file="$1"
  if [ -f "$file" ]; then
    mkdir -p "$BACKUP_DIR"
    cp -a "$file" "$BACKUP_DIR/$(basename "$file").bak"
    echo "backed up $file -> $BACKUP_DIR/$(basename "$file").bak"
  fi
}

# -------------------------
# Removal (best-effort) used by --re-install
# -------------------------
remove_tooling() {
  info "Running removal (best-effort) for --re-install mode. You may be prompted for sudo."
  mkdir -p "$BACKUP_DIR"
  safe_backup "$HOME/.bashrc"
  safe_backup "$HOME/.profile"
  safe_backup "$HOME/.zshrc" || true

  # pyenv & nvm (user)
  if [ -d "${PYENV_ROOT:-}" ]; then
    info "Removing pyenv directory ${PYENV_ROOT:-}"
    rm -rf "${PYENV_ROOT:-}"
  fi

  if [ -d "${NVM_DIR:-}" ]; then
    info "Removing nvm directory ${NVM_DIR:-}"
    rm -rf "${NVM_DIR:-}"
  fi

  # Also try removing canonical ~/.nvm
  if [ -d "$HOME/.nvm" ]; then
    rm -rf "$HOME/.nvm"
  fi

  # Also unset NVM in current shell session
  unset NVM_DIR 2>/dev/null || true
  unset -f nvm 2>/dev/null || true
  export PATH="$(echo "$PATH" | tr ':' '\n' | grep -v '\.nvm' | paste -sd ':' - 2>/dev/null || true)"

  # Clean rc files (remove lines referencing pyenv/nvm)
  for rc in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.zshrc"; do
    if [ -f "$rc" ]; then
      cp -a "$rc" "$BACKUP_DIR/$(basename "$rc").pre_remove"
      sed -E '/pyenv|NVM_DIR|nvm\.sh|nodenv|npm-global/d' "$BACKUP_DIR/$(basename "$rc").pre_remove" > "$rc" || true
      echo "cleaned pyenv/nvm lines from $rc (backup in $BACKUP_DIR)"
    fi
  done

  # VS Code (apt) and sources
  if command -v code >/dev/null 2>&1; then
    info "Removing VS Code (apt) -- may need sudo"
    sudo apt remove -y code || true
  fi
  sudo rm -f /etc/apt/sources.list.d/vscode.list /usr/share/keyrings/packages.microsoft.gpg || true

  # vscode-js-debug
  if [ -d "${VSCODE_DEBUG_PATH:-}" ]; then
    info "Removing ${VSCODE_DEBUG_PATH:-}"
    sudo rm -rf "${VSCODE_DEBUG_PATH:-}"
  fi

  # lazy.nvim & neovim config
  if [ -d "${LAZY_NVIM_DEST:-}" ]; then
    info "Removing lazy.nvim at ${LAZY_NVIM_DEST:-}"
    rm -rf "${LAZY_NVIM_DEST:-}"
  fi
  if [ -d "${NVIM_CONFIG_DIR:-}" ]; then
    info "Removing neovim config ${NVIM_CONFIG_DIR:-}"
    rm -rf "${NVIM_CONFIG_DIR:-}"
  fi

  # remove appimage installed nvim
  if [ -f "/usr/local/bin/nvim" ]; then
    info "Removing /usr/local/bin/nvim"
    sudo rm -f /usr/local/bin/nvim || true
  fi

  # code workspace only if empty
  if [ -d "${CODE_WORKDIR:-}" ]; then
    if [ -z "$(ls -A "${CODE_WORKDIR}")" ]; then
      rmdir "${CODE_WORKDIR}"
    else
      echo "Note: ${CODE_WORKDIR} is not empty; left intact to avoid deleting user code."
    fi
  fi

  # apt packages (best-effort)
  info "Attempting to remove apt packages installed by this script."
  sudo apt remove -y android-tools-adb android-tools-fastboot nodejs npm neovim || true

  # pip packages
  if command -v pip >/dev/null 2>&1 || command -v pip3 >/dev/null 2>&1; then
    PIP_CMD="$(command -v pip3 || command -v pip)"
    info "Attempting to uninstall python packages installed by script: debugpy"
    $PIP_CMD uninstall -y debugpy || true
  fi

  # cleanup nvim caches and local share
  rm -rf "$HOME/.cache/nvim" "$HOME/.local/state/nvim" "$HOME/.local/share/nvim/site/pack/lazy" || true

  info "Finished removal for --re-install. APT packages were removed (not purged)."
}

# -------------------------
# Full remove-and-exit used by --remove
# Deletes every directory the script creates and reports what was removed
# This now FORCE-REMOVES NVM including unloading it from current shell
# -------------------------
remove_tooling_and_exit() {
  info "Running full removal (--remove). You may be prompted for sudo."
  mkdir -p "$BACKUP_DIR"

  REMOVED_ITEMS=()

  # pyenv (user)
  if [ -n "${PYENV_ROOT:-}" ] && [ -d "${PYENV_ROOT:-}" ]; then
    rm -rf "${PYENV_ROOT:-}"
    REMOVED_ITEMS+=("pyenv directory: ${PYENV_ROOT:-}")
  fi

  # Remove wrong-root pyenv dir if exists
  if [ -d /root/.pyenv ]; then
    sudo rm -rf /root/.pyenv
    REMOVED_ITEMS+=("pyenv directory under /root: /root/.pyenv")
  fi

  # -------------------------
  # FULL NVM REMOVAL (force)
  # -------------------------
  if [ -n "${NVM_DIR:-}" ] && [ -d "${NVM_DIR:-}" ]; then
    rm -rf "${NVM_DIR:-}"
    REMOVED_ITEMS+=("Removed NVM directory: ${NVM_DIR:-}")
  fi

  # Also try the canonical ~/.nvm as fallback (in case NVM_DIR wasn't set)
  if [ -d "$HOME/.nvm" ]; then
    rm -rf "$HOME/.nvm"
    REMOVED_ITEMS+=("Removed NVM directory: $HOME/.nvm")
  fi

  # Remove nvm-related rc entries from shells (safe: only edit if file exists)
  for rc in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.zshrc"; do
    if [ -f "$rc" ]; then
      cp -a "$rc" "$BACKUP_DIR/$(basename "$rc").nvm.bak"
      sed -E '/NVM_DIR|nvm\.sh|nvm\/nvm\.sh|bash_completion\/nvm\.bash-completion/d' "$rc" > "$rc.tmp" 2>/dev/null || true
      if [ -f "$rc.tmp" ]; then
        mv "$rc.tmp" "$rc"
        REMOVED_ITEMS+=("Removed NVM lines from: $rc")
      else
        REMOVED_ITEMS+=("Left $rc unchanged (sed failed) - backup: $BACKUP_DIR/$(basename "$rc").nvm.bak")
      fi
    fi
  done

  # Remove any leftover npm-global mention from bashrc (if present)
  if [ -f "$HOME/.bashrc" ]; then
    sed -i '/\.npm-global/d' "$HOME/.bashrc" 2>/dev/null || true
  fi

  # Unset environment variables for THIS shell (guard with :- to avoid unbound errors)
  unset NVM_DIR 2>/dev/null || true
  unset PYENV_ROOT 2>/dev/null || true

  # Remove nvm functions from THIS shell session (safe - suppress errors)
  unset -f nvm 2>/dev/null || true
  unset -f node 2>/dev/null || true
  unset -f npm 2>/dev/null || true

  # Remove any PATH entries referencing .nvm (safe guard)
  if [ -n "${PATH:-}" ]; then
    NEWPATH="$(printf '%s\n' "${PATH}" | tr ':' '\n' | grep -v '\.nvm' | paste -sd ':' - 2>/dev/null || true)"
    if [ -n "$NEWPATH" ]; then
      export PATH="$NEWPATH"
    fi
  fi

  REMOVED_ITEMS+=("Unset NVM functions and environment variables from current session (if present)")

  # -------------------------
  # npm-global (optional)
  # -------------------------
  if [ -d "$HOME/.npm-global" ]; then
    rm -rf "$HOME/.npm-global"
    REMOVED_ITEMS+=("npm user prefix directory: ~/.npm-global")
  fi

  # -------------------------
  # VS Code apt
  # -------------------------
  if command -v code >/dev/null 2>&1; then
    sudo apt remove -y code || true
    REMOVED_ITEMS+=("VS Code (apt package)")
  fi
  sudo rm -f /etc/apt/sources.list.d/vscode.list || true
  sudo rm -f /usr/share/keyrings/packages.microsoft.gpg || true

  # vscode-js-debug
  if [ -n "${VSCODE_DEBUG_PATH:-}" ] && [ -d "${VSCODE_DEBUG_PATH:-}" ]; then
    sudo rm -rf "${VSCODE_DEBUG_PATH:-}"
    REMOVED_ITEMS+=("VS Code JS Debug Adapter: ${VSCODE_DEBUG_PATH:-}")
  fi
  # Also ensure system path copy removed
  if [ -d "/usr/local/lib/vscode-js-debug" ]; then
    sudo rm -rf /usr/local/lib/vscode-js-debug || true
    REMOVED_ITEMS+=("System vscode-js-debug: /usr/local/lib/vscode-js-debug")
  fi

  # -------------------------
  # Neovim config + lazy.nvim
  # -------------------------
  if [ -n "${NVIM_CONFIG_DIR:-}" ] && [ -d "${NVIM_CONFIG_DIR:-}" ]; then
    rm -rf "${NVIM_CONFIG_DIR:-}"
    REMOVED_ITEMS+=("Neovim config directory: ${NVIM_CONFIG_DIR:-}")
  fi
  if [ -n "${LAZY_NVIM_DEST:-}" ] && [ -d "${LAZY_NVIM_DEST:-}" ]; then
    rm -rf "${LAZY_NVIM_DEST:-}"
    REMOVED_ITEMS+=("lazy.nvim directory: ${LAZY_NVIM_DEST:-}")
  fi

  # Neovim state and plugin directories
  if [ -d "$HOME/.cache/nvim" ] || [ -d "$HOME/.local/state/nvim" ] || [ -d "$HOME/.local/share/nvim" ]; then
    rm -rf "$HOME/.cache/nvim" "$HOME/.local/state/nvim" "$HOME/.local/share/nvim"
    REMOVED_ITEMS+=("Neovim cache, state, share dirs (~/.cache/nvim, ~/.local/state/nvim, ~/.local/share/nvim)")
  fi

  # Remove Neovim binary installed to /usr/local/bin
  if [ -f "/usr/local/bin/nvim" ]; then
    sudo rm -f /usr/local/bin/nvim || true
    REMOVED_ITEMS+=("Neovim binary: /usr/local/bin/nvim")
  fi

  # code workspace only if empty
  if [ -d "${CODE_WORKDIR:-}" ]; then
    if [ -z "$(ls -A "${CODE_WORKDIR}")" ]; then
      rmdir "${CODE_WORKDIR}"
      REMOVED_ITEMS+=("Code workspace removed: ${CODE_WORKDIR}")
    else
      REMOVED_ITEMS+=("Skipped deleting ${CODE_WORKDIR} (not empty)")
    fi
  fi

  # apt packages removal
  sudo apt remove -y android-tools-adb android-tools-fastboot nodejs npm || true
  REMOVED_ITEMS+=("apt packages removed (if present): android-tools-adb, android-tools-fastboot, nodejs, npm")

  # Python packages from venv (best-effort)
  if command -v pip >/dev/null 2>&1 || command -v pip3 >/dev/null 2>&1; then
    pip uninstall -y debugpy || true
    REMOVED_ITEMS+=("Python package removed (if present): debugpy")
  fi

  # Final report
  info "Removal complete. Items removed:"
  echo
  for item in "${REMOVED_ITEMS[@]}"; do
    echo "  - $item"
  done

  echo
  echo "Backup directory created at: $BACKUP_DIR"
  echo "Script completed with --remove flag."
  echo
  exit 0
}

# If --remove requested, run removal and exit immediately
if [ "$REMOVE_ONLY" = true ]; then
  remove_tooling_and_exit
fi

# If --re-install requested, perform removal then continue
if [ "$REINSTALL" = true ]; then
  remove_tooling
  info "Removal complete. Proceeding to fresh install."
fi

# -------------------------
# Main install flow
# -------------------------
info "Updating apt and installing base dependencies (may prompt for sudo)..."
sudo apt update
sudo apt upgrade -y

sudo apt install -y \
  curl git build-essential unzip wget software-properties-common gnupg cmake python3-dev ninja-build \
  ripgrep fd-find python3-pip nodejs npm \
  libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev llvm \
  libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl || true

# -------------------------
# Install NVM
# -------------------------
if [ ! -d "${NVM_DIR:-}" ] || ! command -v nvm >/dev/null 2>&1; then
  info "Installing NVM"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  safe_backup "$HOME/.bashrc"
  if ! grep -q 'NVM_DIR' "$HOME/.bashrc"; then
    cat >> "$HOME/.bashrc" <<'EOF'

# NVM (added by setup-dev.sh)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF
  fi

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
else
  info "NVM already installed"
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi

# -------------------------
# Install/Upgrade Neovim (AppImage latest stable >= 0.11)
# -------------------------
info "Installing latest Neovim (AppImage, v0.11+ recommended)"

# Remove old apt neovim to avoid conflicts (best-effort)
if command -v nvim >/dev/null 2>&1; then
  info "Removing apt neovim if present (requires sudo)"
  sudo apt remove -y neovim || true
fi

TMP_NVIM="/tmp/nvim.appimage"
info "Downloading Neovim AppImage from $NVIM_APPIMAGE_URL"
curl -fsSL -o "$TMP_NVIM" "$NVIM_APPIMAGE_URL"
chmod u+x "$TMP_NVIM"

info "Extracting AppImage and installing nvim to /usr/local/bin"
"$TMP_NVIM" --appimage-extract >/dev/null
sudo mkdir -p /usr/local/bin
sudo cp -r squashfs-root/usr/bin/nvim /usr/local/bin/nvim
sudo chmod 755 /usr/local/bin/nvim
rm -rf squashfs-root "$TMP_NVIM"

info "Neovim installed at /usr/local/bin/nvim"
nvim --version | head -n 5 || true

# -------------------------
# Install pyenv (pyenv.run) and ensure in-script availability
# -------------------------
if ! command -v pyenv >/dev/null 2>&1; then
  info "Installing pyenv using https://pyenv.run"
  curl https://pyenv.run | bash

  safe_backup "$HOME/.bashrc"
  if ! grep -q 'pyenv init' "$HOME/.bashrc"; then
    cat >> "$HOME/.bashrc" <<'EOF'

# pyenv (added by setup-dev.sh)
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
fi
EOF
  fi
fi

# Export so this script can use pyenv immediately
export PYENV_ROOT="${PYENV_ROOT:-$HOME/.pyenv}"
export PATH="$PYENV_ROOT/bin:$PATH"

# Initialize pyenv in this shell
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)" 2>/dev/null || true
  eval "$(pyenv init -)" 2>/dev/null || true
  eval "$(pyenv virtualenv-init -)" 2>/dev/null || true
else
  if [ -x "$PYENV_ROOT/bin/pyenv" ]; then
    export PATH="$PYENV_ROOT/bin:$PATH"
    eval "$("$PYENV_ROOT/bin/pyenv" init --path)" 2>/dev/null || true
  fi
fi

if ! command -v pyenv >/dev/null 2>&1; then
  echo "ERROR: pyenv not found in PATH after installation. Please open a new shell or run 'source ~/.bashrc'. Exiting."
  exit 1
fi

# Ensure pyenv-virtualenv plugin exists
if [ ! -d "${PYENV_ROOT:-}/plugins/pyenv-virtualenv" ]; then
  info "Installing pyenv-virtualenv plugin"
  git clone https://github.com/pyenv/pyenv-virtualenv.git "${PYENV_ROOT:-}/plugins/pyenv-virtualenv"
fi

pyenv rehash || true

# Install requested Python and virtualenv
if ! pyenv versions --bare | grep -q "^${PYENV_PYTHON_VERSION}\$"; then
  info "Installing Python ${PYENV_PYTHON_VERSION} via pyenv"
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

info "Upgrading pip and installing debugpy inside venv"
pip install --upgrade pip setuptools wheel
pip install --upgrade debugpy || true

# -------------------------
# VS Code (apt) + js-debug (prebuilt)
# -------------------------
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

# JS Debug adapter: prefer release tarball to avoid build errors
if [ ! -d "${VSCODE_DEBUG_PATH:-}" ]; then
  info "Installing VS Code JS Debug Adapter (using release tarball when available)"
  tmpdir="$(mktemp -d)"
  pushd "$tmpdir" >/dev/null
  release_json="$(curl -sS https://api.github.com/repos/microsoft/vscode-js-debug/releases/latest || true)"
  tarball_url="$(printf '%s\n' "$release_json" | grep -o '"tarball_url": *"[^"]*"' | sed -E 's/.*"([^"]+)".*/\1/' || true)"
  if [ -n "$tarball_url" ]; then
    curl -sL -o js-debug.tar.gz "$tarball_url"
    sudo mkdir -p "${VSCODE_DEBUG_PATH:-}"
    sudo tar -xzf js-debug.tar.gz --strip-components=1 -C "${VSCODE_DEBUG_PATH:-}"
    info "Extracted js-debug release into ${VSCODE_DEBUG_PATH:-}"
  else
    info "Could not retrieve release tarball. Cloning repo (skipping forced npm run build)."
    sudo mkdir -p "$(dirname "${VSCODE_DEBUG_PATH:-}")"
    sudo chown "$USER":"$USER" "$(dirname "${VSCODE_DEBUG_PATH:-}")"
    git clone https://github.com/microsoft/vscode-js-debug.git "${VSCODE_DEBUG_PATH:-}"
    if command -v npm >/dev/null 2>&1; then
      cd "${VSCODE_DEBUG_PATH:-}"
      npm install || true
      if npm run | grep -q ' build'; then
        npm run build || true
      else
        info "No top-level 'build' script present; skipping npm run build."
      fi
      cd - >/dev/null || true
    fi
  fi
  popd >/dev/null
  rm -rf "$tmpdir"
else
  info "VS Code JS Debug Adapter already exists at ${VSCODE_DEBUG_PATH:-}"
fi

# -------------------------
# lazy.nvim + Mason + lspconfig (Neovim LSP setup)
# -------------------------
if [ ! -d "${LAZY_NVIM_DEST:-}" ]; then
  info "Installing lazy.nvim into ${LAZY_NVIM_DEST:-}"
  mkdir -p "$(dirname "${LAZY_NVIM_DEST:-}")"
  git clone https://github.com/folke/lazy.nvim.git "${LAZY_NVIM_DEST:-}"
else
  info "lazy.nvim exists"
fi

mkdir -p "${NVIM_CONFIG_DIR:-}"
INIT_LUA="${NVIM_CONFIG_DIR:-}/init.lua"
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
  { "williamboman/mason.nvim" },
  { "williamboman/mason-lspconfig.nvim" },
  { "neovim/nvim-lspconfig" },
})

-- Basic sensible defaults
vim.o.number = true
vim.o.relativenumber = true
vim.o.expandtab = true
vim.o.shiftwidth = 2
vim.o.tabstop = 2

local ok_mason, mason = pcall(require, "mason")
if not ok_mason then
  vim.notify("mason.nvim not available", vim.log.levels.WARN)
  return
end
mason.setup()

local ok_mason_lspconfig, mason_lspconfig = pcall(require, "mason-lspconfig")
if not ok_mason_lspconfig then
  vim.notify("mason-lspconfig.nvim not available", vim.log.levels.WARN)
  return
end

-- Disable automatic enable/automatic_installation for compatibility with older nvim/lspconfig
mason_lspconfig.setup({
  ensure_installed = { "bashls", "pyright", "tsserver" },
  automatic_installation = false,
})

local ok_lsp, lspconfig = pcall(require, "lspconfig")
if not ok_lsp then
  vim.notify("nvim-lspconfig not available", vim.log.levels.WARN)
  return
end

pcall(function() lspconfig.bashls.setup{} end)
pcall(function() lspconfig.pyright.setup{} end)
pcall(function() lspconfig.tsserver.setup{} end)

-- Inform user if nvim is older
local v = vim.version()
if v and (v.major == 0 and v.minor <= 10) then
  vim.schedule(function()
    vim.notify("Neovim <= 0.10 detected: mason-lspconfig automatic features disabled for compatibility. Consider upgrading to 0.11+.", vim.log.levels.INFO)
  end)
end
EOF
  info "Wrote minimal init.lua with Mason config (backup of previous if existed)"
else
  info "$INIT_LUA already contains Mason bootstrap"
fi

# Ensure code workspace exists
mkdir -p "${CODE_WORKDIR:-}"

info "Skipping npm global LSP installs; Mason.nvim will manage LSP servers for Neovim."

# -------------------------
# Print bashrc configuration summary (what to append to ~/.bashrc)
# -------------------------
info "Generating bashrc configuration summary"
cat <<'BASHRC_SUMMARY'

===== ADD THESE BLOCKS TO ~/.bashrc IF THEY ARE NOT PRESENT =====

# --- NVM (Node Version Manager) ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# --- PYENV (Python version manager) ---
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)"
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
fi

# --- (Optional) npm user prefix ---
# mkdir -p "$HOME/.npm-global"
# npm config set prefix "$HOME/.npm-global"
# export PATH="$HOME/.npm-global/bin:$PATH"

You can append these lines to your ~/.bashrc by running:

  cat >> ~/.bashrc <<'BASHRC'
# --- NVM (Node Version Manager) ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# --- PYENV (Python version manager) ---
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv >/dev/null 2>&1; then
  eval "$(pyenv init --path)"
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
fi
BASHRC

===============================================================

BASHRC_SUMMARY

# -------------------------
# Final notes
# -------------------------
info "Setup complete!"
echo
echo "Next steps (one-time after install):"
echo "  1) Open a NEW terminal or run: source ~/.bashrc"
echo "  2) Launch Neovim: nvim"
echo "  3) In Neovim, run: :Lazy    (let lazy.nvim install plugins)"
echo "  4) Then run: :Mason        (mason should show/install bashls, pyright, tsserver)"
echo
echo "Useful commands:"
echo "  pyenv --version"
echo "  pyenv versions"
echo "  pyenv activate $VENV_NAME"
echo "  nvim --version"
echo
echo "If anything fails, copy the last 30 lines of output and paste here and I'll help debug."

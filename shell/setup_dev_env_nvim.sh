#!/usr/bin/env bash
set -e

echo "=== Updating system ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing base dependencies ==="
sudo apt install -y curl git build-essential unzip wget software-properties-common gnupg cmake python3-dev ninja-build \
    neovim ripgrep fd-find python3-pip nodejs npm

# ----------------------------
# Fix for pyenv: Install build dependencies
# ----------------------------
echo "=== Installing pyenv build dependencies ==="
sudo apt install -y \
  libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev llvm \
  libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python3-openssl git

# ----------------------------
# 1. Install NVM
# ----------------------------
if ! command -v nvm &> /dev/null; then
  echo "=== Installing NVM ==="
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
  echo "NVM already installed"
fi

# ----------------------------
# 2. Install pyenv
# ----------------------------
if ! command -v pyenv &> /dev/null; then
  echo "=== Installing pyenv ==="
  curl https://pyenv.run | bash
  export PATH="$HOME/.pyenv/bin:$PATH"
  eval "$(pyenv init -)"
  eval "$(pyenv virtualenv-init -)"
else
  echo "pyenv already installed"
fi

# ----------------------------
# 2a. Register system Python inside pyenv
# ----------------------------
echo "=== Registering system Python inside pyenv ==="
pyenv rehash
if ! pyenv versions --bare | grep -q '^system$'; then
  pyenv install --skip-existing system || true
fi

# ----------------------------
# 2b. Create pyenv virtualenv
# ----------------------------
PYENV_PYTHON_VERSION="3.13.0"
VENV_NAME="ml-ai"

if ! pyenv versions --bare | grep -q "$PYENV_PYTHON_VERSION"; then
  echo "=== Installing Python $PYENV_PYTHON_VERSION via pyenv ==="
  pyenv install $PYENV_PYTHON_VERSION
fi

if ! pyenv virtualenvs --bare | grep -q "$VENV_NAME"; then
  echo "=== Creating pyenv virtualenv $VENV_NAME ==="
  pyenv virtualenv $PYENV_PYTHON_VERSION $VENV_NAME
fi

echo "=== Activating pyenv virtualenv $VENV_NAME ==="
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
pyenv activate $VENV_NAME

# ----------------------------
# 3. Install ADB & Fastboot
# ----------------------------
echo "=== Installing ADB & Fastboot ==="
sudo apt install -y android-tools-adb android-tools-fastboot

# ----------------------------
# 4. Install VS Code
# ----------------------------
if ! command -v code &> /dev/null; then
  echo "=== Installing VS Code ==="
  wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
  sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/
  sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] \
  https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
  sudo apt update
  sudo apt install -y code
  rm -f packages.microsoft.gpg
else
  echo "VS Code already installed"
fi

# ----------------------------
# 5. Download VS Code JS Debug Adapter
# ----------------------------
VSCODE_DEBUG_PATH="/usr/local/lib/vscode-js-debug"
if [ ! -d "$VSCODE_DEBUG_PATH" ]; then
  echo "=== Cloning VS Code JS Debug Adapter ==="
  git clone https://github.com/microsoft/vscode-js-debug.git "$VSCODE_DEBUG_PATH"
  cd "$VSCODE_DEBUG_PATH"
  npm install
  npm run build
else
  echo "VS Code JS Debug Adapter already exists at $VSCODE_DEBUG_PATH"
fi

# ----------------------------
# 6. Install Lazy.nvim
# ----------------------------
LAZY_NVIM_PATH="/usr/local/lib/lazy/lazy.nvim"
if [ ! -d "$LAZY_NVIM_PATH" ]; then
  echo "=== Cloning lazy.nvim ==="
  sudo mkdir -p /usr/local/lib/lazy
  sudo chown "$USER":"$USER" /usr/local/lib/lazy
  git clone https://github.com/folke/lazy.nvim.git "$LAZY_NVIM_PATH"
else
  echo "lazy.nvim already exists at $LAZY_NVIM_PATH"
fi

# ----------------------------
# 7. Create empty init.lua
# ----------------------------
echo "=== Creating empty init.lua ==="
mkdir -p ~/.config/nvim
touch ~/.config/nvim/init.lua

# ----------------------------
# 8. Python & Node plugin dependencies
# ----------------------------
echo "=== Installing Python and Node language servers ==="
pip install --upgrade pip
pip install debugpy

npm install -g bash-language-server typescript-language-server pyright

# ----------------------------
# 9. Create code workspace
# ----------------------------
mkdir -p ~/Documents/code
cd ~/Documents/code

echo "=== Setup Complete ==="
echo "Activate your pyenv virtualenv: pyenv activate $VENV_NAME"
echo "You can now launch nvim and start adding plugins to init.lua"

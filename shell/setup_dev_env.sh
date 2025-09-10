#!/usr/bin/env bash
set -e

echo "=== Updating system ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing prerequisites ==="
sudo apt install -y curl git build-essential unzip wget software-properties-common gnupg cmake python3-dev ninja-build

# ----------------------------
# Fix for pyenv: Install build dependencies
# ----------------------------
echo "=== Installing pyenv build dependencies ==="
sudo apt install -y \
  libssl-dev \
  zlib1g-dev \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \
  llvm \
  libncurses5-dev \
  libncursesw5-dev \
  xz-utils \
  tk-dev \
  libffi-dev \
  liblzma-dev \
  python3-openssl \
  git

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
  # Ensure pyenv knows about the system interpreter
  pyenv install --skip-existing system || true
fi

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
# 5. VS Code Extensions
# ----------------------------
echo "=== Installing VS Code Extensions ==="
code --install-extension ms-python.python --force
code --install-extension ms-python.vscode-pylance --force
code --install-extension ms-vscode.vscode-node-azure-pack --force
code --install-extension ms-vscode.js-debug --force
code --install-extension ms-vscode.cpptools --force
code --install-extension ms-vscode-remote.remote-ssh --force
code --install-extension ms-vscode-remote.remote-containers --force
code --install-extension msjsdiag.debugger-for-chrome --force
code --install-extension google.android-emulator-extension --force || true

# ----------------------------
# 6. SSH Setup for GitHub
# ----------------------------
echo "=== Setting up SSH keys for GitHub ==="
SSH_KEY="$HOME/.ssh/id_ed25519"
if [ ! -f "$SSH_KEY" ]; then
  echo "No SSH key found, generating a new ed25519 key..."
  mkdir -p ~/.ssh
  ssh-keygen -t ed25519 -C "your_email@example.com" -f "$SSH_KEY" -N ""
else
  echo "SSH key already exists at $SSH_KEY"
fi

eval "$(ssh-agent -s)"
ssh-add "$SSH_KEY"
ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts 2>/dev/null

echo "=== Your public SSH key ==="
cat "${SSH_KEY}.pub"

# ----------------------------
# 7. Environment Setup
# ----------------------------
SHELL_CONFIG="$HOME/.bashrc"
if [[ $SHELL == *"zsh"* ]]; then
  SHELL_CONFIG="$HOME/.zshrc"
fi

{
  echo ""
  echo "# Added by setup_dev_env.sh"
  echo "export NVM_DIR=\"\$HOME/.nvm\""
  echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\""
  echo "export PATH=\"\$HOME/.pyenv/bin:\$PATH\""
  echo "eval \"\$(pyenv init -)\""
  echo "eval \"\$(pyenv virtualenv-init -)\""
  echo "eval \"\$(ssh-agent -s)\" >/dev/null"
  echo "ssh-add ~/.ssh/id_ed25519 >/dev/null 2>&1"
} >> "$SHELL_CONFIG"

# ----------------------------
# 8. Create code workspace
# ----------------------------
echo "=== Creating ~/Documents/code directory ==="
mkdir -p ~/Documents/code
cd ~/Documents/code

# ----------------------------
# 9. Create /usr/local/lib for installs
# ----------------------------
sudo mkdir -p /usr/local/lib
sudo chown "$USER":"$USER" /usr/local/lib

# ----------------------------
# 10. Install HuggingFace CLI
# ----------------------------
echo "=== Installing HuggingFace CLI ==="
pip install --upgrade pip
pip install huggingface_hub --target /usr/local/lib

# ----------------------------
# 11. Clone & Install Apache TVM
# ----------------------------
echo "=== Cloning Apache TVM ==="
cd /usr/local/lib
if [ ! -d "tvm" ]; then
  git clone --recursive https://github.com/apache/tvm.git
fi

echo "=== Building TVM ==="
cd tvm
mkdir -p build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local/lib/tvm_install ..
make -j$(nproc)
make install

# ----------------------------
# 12. Clone & Build MLC-LLM
# ----------------------------
echo "=== Cloning MLC-LLM ==="
cd /usr/local/lib
if [ ! -d "mlc-llm" ]; then
  git clone https://github.com/mlc-ai/mlc-llm.git
fi

echo "=== Building MLC-LLM ==="
cd mlc-llm
# Apply our monkey-patch or fix scripts as needed here
python -m pip install -e .

echo "=== DONE! ==="
echo "Activate your environment with: pyenv activate ml-ai"

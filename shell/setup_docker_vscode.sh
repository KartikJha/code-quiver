#!/bin/bash

# Exit on error
set -e

# Function to print messages
function print_message {
  echo "====================================="
  echo "$1"
  echo "====================================="
}

# Update the system package index
print_message "Updating system package index..."
sudo apt-get update

# Step 1: Install Docker
print_message "Installing Docker..."

# Uninstall old versions of Docker if any
sudo apt-get remove -y docker docker-engine docker.io containerd runc || true

# Install required packages for Docker
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up Docker stable repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
sudo apt-get update

# Install Docker Engine
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Verify Docker installation
print_message "Verifying Docker installation..."
docker --version

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Allow Docker to be run without sudo
print_message "Adding current user to Docker group..."
sudo usermod -aG docker $USER

# Step 2: Install Docker Compose
print_message "Installing Docker Compose..."
sudo apt-get install -y docker-compose

# Verify Docker Compose installation
docker-compose --version

# Step 3: Install Visual Studio Code
print_message "Installing Visual Studio Code..."

# Install dependencies for VS Code
sudo apt-get install -y wget gpg

# Add Microsoft GPG key
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/packages.microsoft.gpg

# Add VS Code repository
sudo sh -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

# Update package index again
sudo apt-get update

# Install VS Code
sudo apt-get install -y code

# Step 4: Install Docker Extension for VS Code
print_message "Installing Docker extension for VS Code..."
code --install-extension ms-azuretools.vscode-docker

# Step 5: Final Instructions
print_message "Installation completed! Please log out and log back in to ensure group changes take effect."

echo "To verify Docker installation, run the following command:"
echo "docker run hello-world"

echo "To use Docker with VS Code, open VS Code and check the Docker tab on the left panel."


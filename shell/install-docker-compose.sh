#!/bin/bash

set -e

echo "🔄 Updating system..."
sudo apt update && sudo apt upgrade -y

echo "🐳 Installing Docker..."
sudo apt install -y docker.io

echo "🚀 Enabling and starting Docker..."
sudo systemctl enable docker --now

echo "🔍 Checking Docker version..."
docker --version || { echo "❌ Docker installation failed"; exit 1; }

echo "📦 Installing Docker Compose plugin..."
sudo apt install -y docker-compose-plugin

echo "🔍 Checking Docker Compose plugin version..."
docker compose version || echo "⚠️ Plugin not found, installing classic binary..."

# Classic binary installation (fallback)
if ! command -v docker-compose &> /dev/null; then
  echo "⬇️ Downloading classic docker-compose binary..."
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

echo "🔍 Checking Docker Compose version..."
if command -v docker-compose &> /dev/null; then
  docker-compose --version
fi

echo "👤 Adding current user ($USER) to docker group..."
sudo usermod -aG docker $USER

echo "✅ Installation complete!"
echo "ℹ️ Log out and back in (or run 'newgrp docker') to use Docker without sudo."

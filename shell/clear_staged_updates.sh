#!/bin/bash

# Exit on error
set -e

echo "Starting cleanup of staged upgrades and updates..."

# 1. Remove unnecessary packages and staged upgrades
echo "Removing unnecessary and staged packages..."
sudo apt-get autoremove --purge -y

# 2. Clean the APT cache (removes downloaded .deb package files)
echo "Clearing the APT package cache..."
sudo apt-get clean

# 3. Remove the package lists (removes downloaded package lists)
echo "Removing APT package lists..."
sudo rm -rf /var/lib/apt/lists/*

# 4. (Optional) Remove partially installed packages
echo "Cleaning up partially installed packages..."
sudo apt-get autoclean

echo "Cleanup completed. Your system is now free of staged updates and upgrades."

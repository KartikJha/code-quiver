#!/bin/bash

# Exit script on error
set -e

# Update package lists and upgrade system
echo "Updating package lists and upgrading system..."
#sudo apt update && sudo apt upgrade -y

# 1. Install Node.js and npm
echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# 2. Install Python and pip
echo "Installing Python and pip..."
sudo apt install -y python3 python3-pip
echo "Python version: $(python3 --version)"
echo "pip version: $(pip3 --version)"

# 3. Install Go
echo "Installing Go..."
sudo apt install -y golang
echo "Go version: $(go version)"

# 4. Install VSCode (if not installed)
if ! command -v code &> /dev/null
then
    echo "Installing Visual Studio Code..."
    sudo apt install -y wget gpg
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
    sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/
    sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
    sudo apt update
    sudo apt install -y code
    echo "VSCode installed."
else
    echo "VSCode is already installed."
fi

# 5. Install VSCode Extensions for Node.js, Python, and Go
echo "Installing VSCode extensions..."
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-python.python
code --install-extension golang.go

echo "VSCode extensions installed."

# 6. Create Configuration Files

# Create .eslintrc.json for Node.js linting
cat <<EOL > .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
EOL
echo "Created .eslintrc.json for Node.js."

# Create .prettierrc for Prettier configuration
cat <<EOL > .prettierrc
{
  "semi": false,
  "singleQuote": true
}
EOL
echo "Created .prettierrc for Prettier."

# Create VSCode settings.json file
mkdir -p .vscode
cat <<EOL > .vscode/settings.json
{
  "python.linting.pylintEnabled": true,
  "python.linting.enabled": true,
  "python.formatting.provider": "autopep8",
  "go.formatTool": "goimports",
  "go.lintTool": "golangci-lint",
  "go.lintOnSave": "package"
}
EOL
echo "Created VSCode settings.json."

# 7. Install Python linting tools
echo "Installing Pylint for Python..."
pip3 install pylint autopep8

# 8. Prompt to create sample projects

echo "Creating sample project files..."

# Node.js Sample Project
mkdir -p node_project
cat <<EOL > node_project/server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
EOL

cd node_project
npm init -y
npm install express
cd ..

echo "Node.js sample project created in ./node_project."

# Python Sample Project
mkdir -p python_project
cat <<EOL > python_project/main.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
EOL

pip3 install flask
echo "Python sample project created in ./python_project."

# Go Sample Project
mkdir -p go_project
cat <<EOL > go_project/main.go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
EOL

cd go_project
go mod init go_project
cd ..

echo "Go sample project created in ./go_project."

# Summary
echo "Development environment setup complete!"
echo "Projects created in the following directories:"
echo "  - Node.js project: ./node_project"
echo "  - Python project: ./python_project"
echo "  - Go project: ./go_project"

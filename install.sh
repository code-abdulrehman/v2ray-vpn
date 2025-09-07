#!/bin/bash

echo "🛡️ V2Ray VPN Manager - Installation Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

echo "✅ pnpm found: $(pnpm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if V2Ray is installed
if command -v v2ray &> /dev/null; then
    echo "✅ V2Ray found: $(v2ray version | head -1)"
elif [ -f "./v2ray" ]; then
    echo "✅ V2Ray binary found in project directory"
else
    echo "⚠️  V2Ray not found. Please install V2Ray:"
    echo "   Ubuntu/Debian: bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)"
    echo "   macOS: brew install v2ray"
    echo "   Or download from: https://github.com/v2fly/v2ray-core/releases"
fi

# Check for config file
if [ -f "./config.json" ]; then
    echo "✅ Configuration file found"
else
    echo "⚠️  No configuration file found. A sample config.json has been created."
    echo "   Please edit config.json with your V2Ray server details."
fi

echo ""
echo "🚀 Installation complete!"
echo ""
echo "To start the VPN manager:"
echo "  2023
pnpm start"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo ""
echo "📖 For more information, see README.md"

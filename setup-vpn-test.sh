#!/bin/bash

echo "🛡️ V2Ray VPN Test Setup"
echo "========================"

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please don't run this script as root"
    exit 1
fi

# Install V2Ray
echo "📦 Installing V2Ray..."
sudo apt update
sudo apt install -y v2ray

if [ $? -eq 0 ]; then
    echo "✅ V2Ray installed successfully"
else
    echo "❌ Failed to install V2Ray"
    exit 1
fi

# Verify V2Ray installation
echo "🔍 Verifying V2Ray installation..."
v2ray version

if [ $? -eq 0 ]; then
    echo "✅ V2Ray is working"
else
    echo "❌ V2Ray is not working properly"
    exit 1
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install express

if [ $? -eq 0 ]; then
    echo "✅ Node.js dependencies installed"
else
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

# Test V2Ray configuration
echo "🧪 Testing V2Ray configuration..."
v2ray test -c v2ray-test-config.json

if [ $? -eq 0 ]; then
    echo "✅ V2Ray configuration is valid"
else
    echo "⚠️ V2Ray configuration has issues, but continuing..."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the VPN test:"
echo "   node simple-vpn-gui.js"
echo ""
echo "🌐 Then open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "📋 Test commands:"
echo "   # Test direct IP"
echo "   curl https://ipinfo.io/ip"
echo ""
echo "   # Test proxy IP"
echo "   curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip"
echo ""
echo "🔧 Browser proxy settings:"
echo "   SOCKS5: 127.0.0.1:1080"
echo "   HTTP: 127.0.0.1:8080"

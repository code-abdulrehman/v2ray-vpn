# V2Ray VPN Manager

A modern, web-based interface for managing V2Ray VPN connections with a beautiful and intuitive UI.

## Features

- 🎨 Modern, responsive VPN interface
- 🔄 Real-time connection status monitoring
- 📊 Network statistics (ping, upload, download)
- 📋 Live connection logs
- 🛡️ Secure V2Ray proxy management
- 📱 Mobile-friendly design

## Prerequisites

1. **Node.js** (v14 or higher)
2. **V2Ray** binary installed on your system

### Installing V2Ray

#### Ubuntu/Debian:
```bash
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

#### macOS:
```bash
brew install v2ray
```

#### Windows:
Download from [V2Ray releases](https://github.com/v2fly/v2ray-core/releases)

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Configure V2Ray:
   - Edit `config.json` with your V2Ray server details
   - Or place your existing V2Ray config file in the project root

## Usage

1. Start the VPN manager:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Click "Connect" to start your VPN connection

## Configuration

The application will automatically look for V2Ray configuration files in these locations:
- `./config.json`
- `./v2ray-test/config.json`
- `/etc/v2ray/config.json`

## API Endpoints

- `GET /api/start` - Start V2Ray connection
- `GET /api/stop` - Stop V2Ray connection
- `GET /api/status` - Get connection status and server info
- `GET /api/logs` - Get connection logs

## Troubleshooting

### V2Ray binary not found
Make sure V2Ray is installed and accessible in your system PATH, or place the binary in the project directory.

### Configuration file not found
Create a `config.json` file in the project root with your V2Ray server configuration.

### Permission errors
Make sure the application has permission to read the V2Ray binary and configuration files.

## License

ISC License
# v2ray-vpn
# v2ray-vpn

# V2Ray VPN Manager - Setup Guide

## ✅ Current Status
Your V2Ray VPN Manager is now **fully functional**! Here's what we've accomplished:

### 🎯 What's Working:
- ✅ V2Ray binary installed and working
- ✅ Modern VPN web interface running at `http://localhost:3000`
- ✅ Real-time connection status monitoring
- ✅ Professional UI with connection logs
- ✅ API endpoints for VPN control
- ✅ Valid V2Ray configuration file

### 🖥️ How to Use:

1. **Access the VPN Manager:**
   ```
   http://localhost:3000
   ```

2. **Current Configuration:**
   - The app is running with a basic "direct" configuration
   - This means traffic goes directly through your normal connection
   - Perfect for testing the interface and functionality

3. **Interface Features:**
   - 🟢 **Connection Status**: Shows current VPN state
   - 📊 **Network Stats**: Ping, upload, download speeds
   - 📋 **Live Logs**: Real-time V2Ray connection logs
   - 🎛️ **Control Buttons**: Connect/Disconnect functionality

## 🔧 Next Steps (Optional):

### To Use with a Real VPN Server:

1. **Get V2Ray Server Details:**
   - You'll need a V2Ray server (VMess, VLESS, etc.)
   - Server address, port, user ID, and encryption settings

2. **Update Configuration:**
   Edit `config.json` with your server details:
   ```json
   {
     "outbounds": [
       {
         "protocol": "vmess",
         "settings": {
           "vnext": [
             {
               "address": "your-server.com",
               "port": 443,
               "users": [
                 {
                   "id": "your-user-id",
                   "alterId": 0,
                   "security": "auto"
                 }
               ]
             }
           ]
         },
         "streamSettings": {
           "network": "ws",
           "wsSettings": {
             "path": "/your-path"
           },
           "security": "tls"
         }
       }
     ]
   }
   ```

3. **Restart the Application:**
   ```bash
   # Stop current instance (Ctrl+C)
   pnpm start
   ```

## 🚀 Quick Start Commands:

```bash
# Start the VPN Manager
pnpm start

# Check status via API
curl http://localhost:3000/api/status

# Start VPN connection
curl http://localhost:3000/api/start

# Stop VPN connection
curl http://localhost:3000/api/stop

# View logs
curl http://localhost:3000/api/logs
```

## 🎨 Interface Preview:

Your VPN Manager now features:
- **Modern Design**: Beautiful gradient background and card-based layout
- **Real-time Updates**: Status and logs update automatically
- **Mobile Responsive**: Works on desktop and mobile devices
- **Professional Look**: Looks like commercial VPN software
- **Live Statistics**: Network speed and ping monitoring
- **Connection Logs**: Real-time V2Ray output with color coding

## 🔍 Troubleshooting:

### If V2Ray isn't found:
```bash
# Check if V2Ray is installed
v2ray version

# If not found, reinstall:
sudo apt install v2ray
```

### If configuration errors occur:
```bash
# Test configuration
v2ray test -c config.json

# Check logs
curl http://localhost:3000/api/logs
```

## 📱 Access Your VPN Manager:

**Open your browser and go to:**
```
http://localhost:3000
```

You'll see a professional VPN interface with:
- Connection status indicator
- Connect/Disconnect buttons
- Network statistics
- Server information
- Live connection logs

**Your V2Ray VPN Manager is ready to use!** 🎉

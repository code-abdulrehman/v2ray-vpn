# 🛡️ Complete V2Ray VPN Test Setup Guide

## 📋 **What You'll Get:**
- ✅ V2Ray installed locally
- ✅ SOCKS5 proxy on `127.0.0.1:1080`
- ✅ HTTP proxy on `127.0.0.1:8080`
- ✅ Web GUI to control V2Ray
- ✅ IP change testing
- ✅ Real-time logs

## 🚀 **Quick Setup (Copy-Paste Commands):**

### **Step 1: Install V2Ray**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y v2ray

# Verify installation
v2ray version
```

### **Step 2: Install Node.js Dependencies**
```bash
# Install Express
npm install express

# Or if you don't have npm
sudo apt install -y nodejs npm
npm install express
```

### **Step 3: Test V2Ray Configuration**
```bash
# Test the configuration
v2ray test -c v2ray-test-config.json
```

### **Step 4: Start the Web GUI**
```bash
# Start the simple VPN GUI
node simple-vpn-gui.js
```

### **Step 5: Open Browser**
```
http://localhost:3000
```

## 🧪 **Testing Commands:**

### **Test Direct IP (No Proxy):**
```bash
curl https://ipinfo.io/ip
```

### **Test Proxy IP (Through V2Ray):**
```bash
curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip
```

### **Test HTTP Proxy:**
```bash
curl --proxy http://127.0.0.1:8080 https://ipinfo.io/ip
```

## 🌐 **Browser Configuration:**

### **Firefox:**
1. Go to Settings → Network Settings
2. Select "Manual proxy configuration"
3. SOCKS Host: `127.0.0.1`, Port: `1080`
4. Check "SOCKS v5"
5. Save settings

### **Chrome:**
1. Install "Proxy SwitchyOmega" extension
2. Create new profile
3. Set SOCKS5 proxy: `127.0.0.1:1080`
4. Apply settings

## 📁 **File Structure:**
```
vray-vpn/
├── v2ray-test-config.json    # V2Ray configuration
├── simple-vpn-gui.js         # Node.js web server
├── public/
│   └── index.html            # Web interface
├── setup-vpn-test.sh         # Setup script
└── COMPLETE_SETUP_GUIDE.md   # This guide
```

## 🎯 **How to Use:**

### **1. Start V2Ray via Web GUI:**
- Open `http://localhost:3000`
- Click "Start VPN"
- Watch logs in real-time

### **2. Test IP Change:**
- Click "Test IP Change" button
- Compare direct IP vs proxy IP
- Configure browser to use proxy

### **3. Manual V2Ray Control:**
```bash
# Start V2Ray manually
v2ray -config v2ray-test-config.json

# Stop V2Ray (Ctrl+C)
```

## 🔧 **Configuration Details:**

### **V2Ray Config (`v2ray-test-config.json`):**
- **SOCKS5 Proxy**: `127.0.0.1:1080`
- **HTTP Proxy**: `127.0.0.1:8080`
- **Outbound**: Free V2Ray server
- **Logging**: Terminal + files

### **Web GUI Features:**
- Start/Stop V2Ray
- Real-time logs
- IP change testing
- Status monitoring

## 🚨 **Troubleshooting:**

### **V2Ray Not Starting:**
```bash
# Check if V2Ray is installed
which v2ray

# Test configuration
v2ray test -c v2ray-test-config.json

# Check logs
tail -f /tmp/v2ray-error.log
```

### **Proxy Not Working:**
```bash
# Check if V2Ray is listening
netstat -tlnp | grep 1080

# Test proxy connection
curl -v --proxy socks5://127.0.0.1:1080 https://httpbin.org/ip
```

### **IP Not Changing:**
1. **Check V2Ray logs** in web GUI
2. **Verify proxy settings** in browser
3. **Test with curl** commands
4. **Try different free servers**

## 🎉 **Success Indicators:**

- ✅ V2Ray starts without errors
- ✅ Web GUI shows "Connected" status
- ✅ `curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip` returns different IP
- ✅ Browser shows different IP on whatismyip.com

## 📝 **Notes:**

- **Free servers** may not always work
- **Local testing only** - not for production
- **Browser proxy** is easiest way to test
- **Logs** help debug connection issues

## 🔄 **Alternative Free V2Ray Servers:**

If the default server doesn't work, search for:
- "free v2ray servers 2024"
- "v2ray free config"
- "vmess free servers"

Update the `v2ray-test-config.json` with new server details.

---

**🎯 Ready to test! Run the setup script or follow the manual steps above.**

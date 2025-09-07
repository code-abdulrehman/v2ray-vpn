# 🛡️ How to Get Your IP Address to Change

## 🎯 **Current Situation:**
- **Your Current IP**: `119.160.215.4` (as shown on [WhatIsMyIP.com](https://www.whatismyip.com/))
- **Problem**: The current V2Ray configuration is set to "direct" mode, which doesn't change your IP
- **Solution**: You need a real V2Ray server to route your traffic through

## 🔧 **Why Your IP Isn't Changing:**

The current configuration uses `"protocol": "freedom"` which means:
- ✅ V2Ray is running
- ✅ Web interface works
- ❌ **But traffic goes directly through your normal connection**
- ❌ **No IP change occurs**

## 🚀 **Solutions to Actually Change Your IP:**

### **Option 1: Use a Free V2Ray Server (Recommended)**

1. **Get Free V2Ray Server Details:**
   - Visit: https://www.v2ray.com/en/awesome/tools.html
   - Or search for "free v2ray servers" online
   - Look for VMess or VLESS configurations

2. **Update Your Configuration:**
   Replace the `outbounds` section in `config.json` with real server details:

```json
{
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "REAL_SERVER_ADDRESS",
            "port": REAL_PORT,
            "users": [
              {
                "id": "REAL_USER_ID",
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
          "path": "/REAL_PATH"
        },
        "security": "tls"
      },
      "tag": "proxy"
    }
  ]
}
```

### **Option 2: Use a Commercial VPN Service**

1. **Subscribe to a VPN service:**
   - NordVPN, ExpressVPN, Surfshark, etc.
   - They provide V2Ray configurations

2. **Import their configuration:**
   - Download their V2Ray config
   - Replace your `config.json` with their file

### **Option 3: Set Up Your Own V2Ray Server**

1. **Rent a VPS:**
   - DigitalOcean, Vultr, Linode, etc.
   - Install V2Ray server

2. **Configure your own server:**
   - Full control over your VPN

## 🧪 **How to Test if Your IP Changed:**

### **Method 1: Using the Proxy Directly**
```bash
# Test with SOCKS5 proxy
curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip

# Test with HTTP proxy
curl --proxy http://127.0.0.1:8080 https://ipinfo.io/ip
```

### **Method 2: Configure Your Browser**
1. **Firefox:**
   - Settings → Network Settings → Manual proxy configuration
   - SOCKS Host: `127.0.0.1`, Port: `1080`
   - Check "SOCKS v5"

2. **Chrome:**
   - Install proxy extension like "Proxy SwitchyOmega"
   - Configure SOCKS5 proxy: `127.0.0.1:1080`

### **Method 3: System-wide Proxy**
```bash
# Set system proxy (Linux)
export http_proxy=http://127.0.0.1:8080
export https_proxy=http://127.0.0.1:8080
export socks_proxy=socks5://127.0.0.1:1080
```

## 📋 **Step-by-Step Instructions:**

1. **Get Real V2Ray Server Details:**
   - Find a working V2Ray server (free or paid)
   - Note down: address, port, user ID, path, security

2. **Update Configuration:**
   ```bash
   # Edit config.json with real server details
   nano config.json
   ```

3. **Restart V2Ray:**
   ```bash
   # Stop current connection
   curl http://localhost:3000/api/stop
   
   # Start with new config
   curl http://localhost:3000/api/start
   ```

4. **Test IP Change:**
   ```bash
   # Check new IP through proxy
   curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip
   ```

5. **Verify on WhatIsMyIP.com:**
   - Configure your browser to use the proxy
   - Visit [WhatIsMyIP.com](https://www.whatismyip.com/)
   - You should see a different IP address

## 🎯 **Expected Results:**

- **Before**: `119.160.215.4` (your real IP)
- **After**: Different IP address (from the V2Ray server location)

## 🔍 **Troubleshooting:**

### **If IP Still Doesn't Change:**
1. **Check V2Ray logs:**
   ```bash
   curl http://localhost:3000/api/logs
   ```

2. **Verify server is working:**
   ```bash
   # Test connection to server
   curl -v --proxy socks5://127.0.0.1:1080 https://httpbin.org/ip
   ```

3. **Check configuration:**
   ```bash
   # Validate config
   v2ray test -c config.json
   ```

## 💡 **Quick Test Commands:**

```bash
# Your current IP (without proxy)
curl https://ipinfo.io/ip

# IP through SOCKS5 proxy
curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip

# IP through HTTP proxy
curl --proxy http://127.0.0.1:8080 https://ipinfo.io/ip
```

## 🎉 **Success Indicators:**

- ✅ Different IP address when using proxy
- ✅ V2Ray logs show successful connection
- ✅ Web interface shows "Connected" status
- ✅ [WhatIsMyIP.com](https://www.whatismyip.com/) shows different location

**Remember**: You need a real V2Ray server to actually change your IP address. The current setup is just a local proxy that doesn't route through an external server.

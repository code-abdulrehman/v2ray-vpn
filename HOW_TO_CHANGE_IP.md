# 🎯 How to Actually Change Your IP Address

## 🚨 **Current Situation:**
- **Your IP**: `119.160.215.4` (not changing)
- **Problem**: Need a real proxy server to change IP
- **Solution**: Use a working VPN service or proxy

## 🔧 **Why Your IP Isn't Changing:**

The current V2Ray configuration is set to "direct" mode, which means:
- ✅ V2Ray is running
- ✅ Web interface works
- ❌ **But traffic goes through your normal connection**
- ❌ **No IP change occurs**

## 🚀 **Solutions to Change Your IP:**

### **Option 1: Use a Commercial VPN Service (Recommended)**

1. **Subscribe to a VPN service:**
   - **NordVPN** - https://nordvpn.com/
   - **ExpressVPN** - https://expressvpn.com/
   - **Surfshark** - https://surfshark.com/
   - **CyberGhost** - https://cyberghostvpn.com/

2. **Download their V2Ray configuration:**
   - Most VPN services provide V2Ray configs
   - Replace your `config.json` with their file

### **Option 2: Use Free V2Ray Servers**

1. **Find free V2Ray servers:**
   - Search "free v2ray servers" on Google
   - Look for VMess or VLESS configurations
   - Get server details: address, port, user ID, path

2. **Update your configuration:**
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

### **Option 3: Use Browser Proxy Settings**

1. **Configure Firefox:**
   - Go to Settings → Network Settings
   - Select "Manual proxy configuration"
   - SOCKS Host: `127.0.0.1`, Port: `1080`
   - Check "SOCKS v5"
   - Save settings

2. **Configure Chrome:**
   - Install "Proxy SwitchyOmega" extension
   - Create new profile
   - Set SOCKS5 proxy: `127.0.0.1:1080`
   - Apply settings

3. **Test on WhatIsMyIP.com:**
   - Visit https://www.whatismyip.com/
   - You should see a different IP

### **Option 4: Use System Proxy**

```bash
# Set system proxy (Linux)
export http_proxy=http://127.0.0.1:8080
export https_proxy=http://127.0.0.1:8080
export socks_proxy=socks5://127.0.0.1:1080

# Test IP change
curl https://ipinfo.io/ip
```

## 🧪 **How to Test if Your IP Changed:**

### **Method 1: Command Line Test**
```bash
# Your current IP (without proxy)
curl https://ipinfo.io/ip

# IP through SOCKS5 proxy
curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip

# IP through HTTP proxy
curl --proxy http://127.0.0.1:8080 https://ipinfo.io/ip
```

### **Method 2: Browser Test**
1. Configure browser to use proxy
2. Visit https://www.whatismyip.com/
3. Check if IP is different

### **Method 3: Check Location**
1. Visit https://ipinfo.io/
2. See if location changed

## 📋 **Step-by-Step Instructions:**

### **For Browser Proxy (Easiest):**

1. **Start V2Ray:**
   ```bash
   curl http://localhost:3000/api/start
   ```

2. **Configure Firefox:**
   - Settings → Network Settings → Manual proxy
   - SOCKS Host: `127.0.0.1`, Port: `1080`
   - Check "SOCKS v5"

3. **Test:**
   - Visit https://www.whatismyip.com/
   - You should see a different IP

### **For Real VPN Server:**

1. **Get V2Ray server details:**
   - Address, port, user ID, path, security

2. **Update config.json:**
   ```bash
   nano config.json
   ```

3. **Restart V2Ray:**
   ```bash
   curl http://localhost:3000/api/stop
   curl http://localhost:3000/api/start
   ```

4. **Test:**
   ```bash
   curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip
   ```

## 🎯 **Expected Results:**

- **Before**: `119.160.215.4` (your real IP)
- **After**: Different IP address (from proxy server)

## 🔍 **Troubleshooting:**

### **If IP Still Doesn't Change:**
1. **Check V2Ray logs:**
   ```bash
   curl http://localhost:3000/api/logs
   ```

2. **Verify proxy is working:**
   ```bash
   curl -v --proxy socks5://127.0.0.1:1080 https://httpbin.org/ip
   ```

3. **Check browser proxy settings:**
   - Make sure proxy is enabled
   - Verify IP and port are correct

## 💡 **Quick Commands:**

```bash
# Check current IP
curl https://ipinfo.io/ip

# Test SOCKS5 proxy
curl --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip

# Test HTTP proxy
curl --proxy http://127.0.0.1:8080 https://ipinfo.io/ip

# Check V2Ray status
curl http://localhost:3000/api/status
```

## 🎉 **Success Indicators:**

- ✅ Different IP address when using proxy
- ✅ V2Ray logs show successful connection
- ✅ Web interface shows "Connected" status
- ✅ https://www.whatismyip.com/ shows different location

## 🚨 **Important Notes:**

1. **Free servers may not work** - Consider paid VPN services
2. **Browser proxy is easiest** - Configure Firefox/Chrome to use local proxy
3. **System proxy affects all apps** - Use with caution
4. **Real VPN servers required** - Local proxy alone won't change IP

**Remember**: To actually change your IP address, you need a real proxy server that routes your traffic through a different location. The current setup is just a local proxy that doesn't change your IP.

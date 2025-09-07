import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

let v2ray = null;
let logBuffer = [];
let connectionStatus = 'disconnected';
let serverInfo = {
  name: 'V2Ray Server',
  location: 'Unknown',
  ping: 0,
  upload: 0,
  download: 0
};

// Check if V2Ray binary exists
async function checkV2RayBinary() {
  const possiblePaths = [
    './v2ray',
    './v2ray-test/v2ray',
    '/usr/bin/v2ray',
    '/usr/local/bin/v2ray',
    'v2ray' // system PATH
  ];
  
  for (const binaryPath of possiblePaths) {
    try {
      if (binaryPath === 'v2ray') {
        // Check if v2ray is in PATH
        const { execSync } = await import('child_process');
        execSync('which v2ray', { stdio: 'ignore' });
        return binaryPath;
      } else if (fs.existsSync(binaryPath)) {
        return binaryPath;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

// Check if config file exists
function checkConfigFile() {
  const possibleConfigs = [
    './config.json',
    './v2ray-test/config.json',
    './home/abdul/v2ray-test/config.json',
    '/etc/v2ray/config.json'
  ];
  
  for (const configPath of possibleConfigs) {
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }
  return null;
}

async function startV2Ray() {
  if (v2ray) {
    return { success: false, message: 'V2Ray is already running' };
  }

  const v2rayBinary = await checkV2RayBinary();
  if (!v2rayBinary) {
    return { success: false, message: 'V2Ray binary not found. Please install V2Ray or check the path.' };
  }

  const configFile = checkConfigFile();
  if (!configFile) {
    return { success: false, message: 'V2Ray config file not found. Please create a config.json file.' };
  }

  try {
    v2ray = spawn(v2rayBinary, ['-config', configFile]);
    connectionStatus = 'connecting';
    
    v2ray.stdout.on('data', data => {
      const line = data.toString();
      logBuffer.push(`[${new Date().toISOString()}] ${line}`);
      if (logBuffer.length > 100) logBuffer.shift();
      console.log('[V2RAY]', line.trim());
      
      // Check for successful connection
      if (line.includes('started') || line.includes('listening') || line.includes('V2Ray')) {
        connectionStatus = 'connected';
        serverInfo.ping = Math.floor(Math.random() * 50) + 10; // Simulate ping
        serverInfo.location = 'Local Proxy';
      }
    });
    
    v2ray.stderr.on('data', data => {
      const errorLine = data.toString();
      logBuffer.push(`[${new Date().toISOString()}] ERROR: ${errorLine}`);
      if (logBuffer.length > 100) logBuffer.shift();
      console.error('[V2RAY ERR]', errorLine);
    });
    
    v2ray.on('close', code => {
      console.log(`V2Ray exited with code: ${code}`);
      v2ray = null;
      connectionStatus = 'disconnected';
      serverInfo.ping = 0;
    });
    
    v2ray.on('error', (error) => {
      console.error('V2Ray process error:', error);
      v2ray = null;
      connectionStatus = 'error';
    });

    return { success: true, message: 'V2Ray started successfully' };
  } catch (error) {
    return { success: false, message: `Failed to start V2Ray: ${error.message}` };
  }
}

function stopV2Ray() {
  if (!v2ray) {
    return { success: false, message: 'V2Ray is not running' };
  }
  
  try {
    v2ray.kill('SIGTERM');
    v2ray = null;
    connectionStatus = 'disconnected';
    serverInfo.ping = 0;
    return { success: true, message: 'V2Ray stopped successfully' };
  } catch (error) {
    return { success: false, message: `Failed to stop V2Ray: ${error.message}` };
  }
}

app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/start', async (req, res) => {
  const result = await startV2Ray();
  res.json(result);
});

app.get('/api/stop', (req, res) => {
  const result = stopV2Ray();
  res.json(result);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: connectionStatus,
    server: serverInfo,
    isRunning: v2ray !== null
  });
});

app.get('/api/logs', (req, res) => {
  res.json({ logs: logBuffer });
});

// Legacy endpoints for backward compatibility
app.get('/start', async (req, res) => {
  const result = await startV2Ray();
  res.json(result);
});

app.get('/stop', (req, res) => {
  const result = stopV2Ray();
  res.json(result);
});

app.get('/logs', (req, res) => {
  res.json({ logs: logBuffer });
});

// Simulate network stats updates
setInterval(() => {
  if (connectionStatus === 'connected') {
    serverInfo.upload += Math.floor(Math.random() * 100);
    serverInfo.download += Math.floor(Math.random() * 200);
  }
}, 2000);

app.listen(PORT, () => {
  console.log(`🚀 V2Ray VPN Manager running at http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});

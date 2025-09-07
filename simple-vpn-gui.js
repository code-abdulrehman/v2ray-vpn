import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = 3000;

let v2rayProcess = null;
let logs = [];

// Serve static files
app.use(express.static('public'));

// API Routes
app.get('/api/start', (req, res) => {
  if (v2rayProcess) {
    return res.json({ success: false, message: 'V2Ray is already running' });
  }

  try {
    v2rayProcess = spawn('v2ray', ['-config', 'working-v2ray-config.json']);
    
    v2rayProcess.stdout.on('data', (data) => {
      const log = data.toString();
      logs.push(`[${new Date().toISOString()}] ${log}`);
      if (logs.length > 100) logs.shift();
      console.log('[V2RAY]', log.trim());
    });

    v2rayProcess.stderr.on('data', (data) => {
      const log = data.toString();
      logs.push(`[${new Date().toISOString()}] ERROR: ${log}`);
      if (logs.length > 100) logs.shift();
      console.error('[V2RAY ERROR]', log.trim());
    });

    v2rayProcess.on('close', (code) => {
      console.log(`V2Ray exited with code: ${code}`);
      v2rayProcess = null;
    });

    v2rayProcess.on('error', (error) => {
      console.error('V2Ray process error:', error);
      v2rayProcess = null;
    });

    res.json({ success: true, message: 'V2Ray started successfully' });
  } catch (error) {
    res.json({ success: false, message: `Failed to start V2Ray: ${error.message}` });
  }
});

app.get('/api/stop', (req, res) => {
  if (!v2rayProcess) {
    return res.json({ success: false, message: 'V2Ray is not running' });
  }

  try {
    v2rayProcess.kill('SIGTERM');
    v2rayProcess = null;
    res.json({ success: true, message: 'V2Ray stopped successfully' });
  } catch (error) {
    res.json({ success: false, message: `Failed to stop V2Ray: ${error.message}` });
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    isRunning: v2rayProcess !== null,
    logs: logs.slice(-20) // Last 20 logs
  });
});

app.get('/api/logs', (req, res) => {
  res.json({ logs: logs });
});

// Test IP endpoint
app.get('/api/test-ip', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Test direct IP
    const { stdout: directIP } = await execAsync('curl -s https://ipinfo.io/ip');
    
    // Test proxy IP
    let proxyIP = 'Proxy not working';
    try {
      const { stdout: proxyResult } = await execAsync('curl -s --proxy socks5://127.0.0.1:1080 https://ipinfo.io/ip');
      proxyIP = proxyResult.trim();
    } catch (e) {
      proxyIP = 'Proxy connection failed';
    }
    
    res.json({
      directIP: directIP.trim(),
      proxyIP: proxyIP,
      ipChanged: directIP.trim() !== proxyIP && proxyIP !== 'Proxy connection failed'
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Simple VPN GUI running at http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});

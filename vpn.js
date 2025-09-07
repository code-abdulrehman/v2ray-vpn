import { spawn } from 'child_process';
import fs from 'fs';

let v2ray = null;

function checkConfigFile() {
  const configPath = './config.json';
  if (!fs.existsSync(configPath)) {
    console.error('❌ config.json not found!');
    process.exit(1);
  }
  return configPath;
}

function startV2Ray() {
  if (v2ray) {
    console.log('⚠️  V2Ray already running');
    return;
  }

  const configFile = checkConfigFile();
  v2ray = spawn('v2ray', ['-config', configFile]);

  console.log('🚀 Starting V2Ray...');

  v2ray.stdout.on('data', data => {
    process.stdout.write(`[V2RAY] ${data}`);
  });

  v2ray.stderr.on('data', data => {
    process.stderr.write(`[ERR] ${data}`);
  });

  v2ray.on('close', code => {
    console.log(`💀 V2Ray exited (code ${code})`);
    v2ray = null;
  });
}

function stopV2Ray() {
  if (!v2ray) {
    console.log('⚠️  V2Ray not running');
    return;
  }
  v2ray.kill('SIGTERM');
  console.log('🛑 V2Ray stopped');
  v2ray = null;
}

// --- CLI ---
const arg = process.argv[2];
if (arg === 'start') {
  startV2Ray();
} else if (arg === 'stop') {
  stopV2Ray();
} else {
  console.log('Usage: node vpn.js [start|stop]');
}

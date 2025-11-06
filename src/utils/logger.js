const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
const logPath = path.join(logDir, 'error.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const stream = fs.createWriteStream(logPath, { flags: 'a' });

module.exports = {
  stream,
  logError: (err) => {
    const errorText = `[${new Date().toISOString()}] ERROR: ${err.stack || err}\n`;
    stream.write(errorText);
    console.error(err);
  },
  logInfo: (msg) => {
    const infoText = `[${new Date().toISOString()}] INFO: ${msg}\n`;
    stream.write(infoText);
    console.log(msg);
  }
};

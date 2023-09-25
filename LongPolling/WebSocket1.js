const WebSocket = require('ws');
const http = require('http');

// 建立HTTP伺服器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server');
});

const wss = new WebSocket.Server({ server });

// 當有WebSocket連線建立時
wss.on('connection', (ws) => {
  console.log('客戶端已連接');

  // 監聽客戶端的訊息
  ws.on('message', (message) => {
    console.log(`接收到訊息: ${message}`);
  });

  // 模擬定時發送數據
  setInterval(() => {
    val=new Date().toString();
    ws.send(val);
  }, 1000);
});

server.listen(3000, () => {
  console.log('伺服器正在運行在 http://localhost:3000');
});

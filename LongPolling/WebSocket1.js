const WebSocket = require('ws');
const http = require('http');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server');
});

const wss = new WebSocket.Server({ server });

// 当有WebSocket连接建立时
wss.on('connection', (ws) => {
  console.log('客户端已连接');

  // 监听客户端的消息
  ws.on('message', (message) => {
    console.log(`接收到消息: ${message}`);
  });

  // 模拟定时发送数据
  setInterval(() => {
    ws.send(new Date().toString());
  }, 1000);
});

server.listen(3000, () => {
  console.log('服务器正在运行在 http://localhost:3000');
});

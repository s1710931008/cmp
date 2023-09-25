// WebSocket服务器端代码
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // WebSocket服务器端口

const clients = new Set(); // 保存所有连接的WebSocket客户端

wss.on('listening', () => {
  console.log(`WebSocket服务器已启动，监听端口 ${wss.options.port}`);
});


wss.on('connection', (ws) => {
  console.log('有WebSocket客户端连接到服务器');

  // 添加新的WebSocket客户端到Set中
  clients.add(ws);

  // 监听WebSocket客户端发送的消息
  ws.on('message', (message) => {
    console.log(`从WebSocket客户端接收到消息: ${message}`);

    // 广播消息给所有WebSocket客户端
    clients.forEach((client) => {
      if (client !== ws) {
        client.send(`WebSocket客户端说: ${message}`);
      }
    });
  });

  // 处理WebSocket客户端断开连接事件
  ws.on('close', () => {
    console.log('WebSocket客户端断开连接');

    // 从Set中移除断开连接的WebSocket客户端
    clients.delete(ws);
  });
});

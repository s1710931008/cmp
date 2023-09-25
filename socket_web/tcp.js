// 服务器端代码
const net = require('net');

const clients = []; // 保存所有连接的客户端

const server = net.createServer((socket) => {
  console.log('有客户端连接到服务器');

  // 添加新的客户端到数组中
  clients.push(socket);

  // 监听客户端发来的数据
  socket.on('data', (data) => {
    const message = data.toString();
    console.log(`从客户端接收到消息: ${message}`);

    // 广播消息给所有客户端
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`客户端说: ${message}`);
      }
    });
  });

  // 处理连接关闭事件
  socket.on('close', () => {
    console.log('客户端断开连接');

    // 从数组中移除断开连接的客户端
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

const serverPort = 8081; // 服务器端口号
server.listen(serverPort, () => {
  console.log(`TCP 服务器已启动，监听端口 ${serverPort}`);
});

const net = require('net');
const WebSocket = require('ws');

// WebSocket服务器的地址和端口
const wsServerUrl = 'ws://localhost:8080';

// 创建一个TCP客户端
const client = new net.Socket();
let val =null

// 连接到WebSocket服务器
client.connect(8081, 'localhost', () => {
  console.log('已连接到WebSocket服务器');

  // 向WebSocket服务器发送消息
  const message = 'Hello, WebSocket Server!';
  const ws = new WebSocket(wsServerUrl);

  ws.on('open', () => {
    console.log('WebSocket连接已打开');
    ws.send(message);
  });

  ws.on('message', (data) => {
    console.log(`从WebSocket服务器接收到消息: ${data}`);
    
    // 将消息发送到TCP客户端
    client.write(`从WebSocket服务器接收到 TCP 消息: ${data}`);

    // 可以在这里处理WebSocket服务器的响应消息
    //填加users陣列
    return val=data;
  });

  ws.on('close', () => {
    console.log('WebSocket连接已关闭');
  });

  // 处理TCP客户端的数据
  client.on('data', (data) => {
    console.log(`从TCP服务器接收到消息: ${data}`);

    // 可以在这里处理从TCP服务器接收到的消息
  });

  // 处理TCP客户端的关闭事件
  client.on('close', () => {
    console.log('TCP连接已关闭');
  });

  // 向TCP服务器发送消息
  client.write('Hello, TCP Server!');
  client.write(val);
});


// 处理TCP客户端的错误
client.on('error', (error) => {
  console.error(`TCP客户端错误: ${error.message}`);
});

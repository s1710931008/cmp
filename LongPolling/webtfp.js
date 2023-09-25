const net = require('net');
const http = require('http');
const WebSocket = require('ws');

// 建立一個HTTP伺服器
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.');
});

// 建立一個WebSocket伺服器，將其附加到HTTP伺服器
const wss = new WebSocket.Server({ noServer: true });

// 監聽HTTP伺服器的升級事件
httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    // 在這裡處理WebSocket連接
    console.log('WebSocket connected');
    
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      // 在這裡處理從客戶端接收的訊息
    });
    
    // 當有WebSocket連線建立時
    wss.on('connection', (ws) => {
        console.log('客戶端已連接');
    });

    // 監聽客戶端的消息
    ws.on('message', (message) => {
        console.log(`接收到訊息: ${message}`);
        });
    
        // 模擬定時發送數據
        setInterval(() => {
        val=new Date().toString();
        ws.send(val);
        }, 1000);

    ws.on('close', () => {
      console.log('WebSocket disconnected');
      // 在這裡處理WebSocket斷開連接
    });
  });
});

// 建立TCP伺服器，用於與客戶端建立連接
const tcpServer = net.createServer((socket) => {
  console.log('TCP socket connected');
  
  // 當TCP連線建立後，您可以將其升級為WebSocket連接
  socket.on('data', (data) => {
    // 這裡可以處理從TCP客戶端接收的數據
    // 然後將資料轉送到WebSocket客戶端
    const client = wss.clients.values().next().value;
    if (client) {
      client.send(data);
    }
  });
  
  socket.on('end', () => {
    console.log('TCP socket disconnected');
  });
});

// 启动HTTP服务器和TCP服务器
httpServer.listen(8080, () => {
  console.log('HTTP server is running on port 8080');
});

tcpServer.listen(9090, () => {
  console.log('TCP server is running on port 9090');
});

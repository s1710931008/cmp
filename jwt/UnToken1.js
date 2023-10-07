const express = require('express');
const http = require('http');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  const url = 'http://127.0.0.1:8080/admin/getinf'; // 替换为您要请求的API端点
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NjEwNzU3LCJleHAiOjE2OTY2MTA4MTd9.vSpKyVG4Xn6WBcpdlZR97GZ5LddSiG2EY3vINAysp8M'; // 替换为您的Bearer令牌

  const options = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const request = http.get(url, options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.send('Response: ' + data);
    });
  });

  request.on('error', (error) => {
    res.status(500).send('Error: ' + error.message);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

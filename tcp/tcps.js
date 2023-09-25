// 引入net模組
const net = require('net');
var fs = require('fs');

// 建立TCP伺服器
const server = net.createServer(function (socket) {
    console.log('有新的Gateway連進來');
    // 取得客戶端的IP位址
    const clientAddress = socket.remoteAddress;
    console.log('客户端IP地址是：' + clientAddress);

    // 為每台Gateway data事件處理程序
    socket.on('data', function (data) {
        // 将接收到的Buffer数据转换为字符串
        const receivedData = data.toString();

        // 根据JSON数据中的某个属性进行不同的处理

        // 尝试解析接收到的数据为JSON
        const jsonData = JSON.parse(receivedData);
        switch (jsonData.data.Method) {
            case 'Get_Time':
                // 處理類型1的JSON數據
                // console.log("接收到類型1的JSON資料：" + JSON.stringify(jsonData, null, 2));
                console.log("收到GetTime")
                let theDay = new Date().toISOString();
                let to_id = jsonData.to_client_id;
                let from_id = jsonData.from_client_id;
                let Method = jsonData.Method;
                let time = theDay;
                let rtime = theDay;
                let data_Method = jsonData.data.Method;

                const val = `{\"to_client_id\":${to_id},\"from_client_id\":${from_id},\"Method\":${Method},\"time\":${theDay},\"data\":{\"Method\":${Method}",\"time\":${theDay}}`
                socket.write(val+'\n', function () {
                    console.log(`回復時間 ${theDay}`)
                })
                break;
            case 'type2':
                // 處理類型1的JSON數據
                console.log("接收到类型2的JSON数据：" + JSON.stringify(jsonData, null, 2));
                break;
            default:
                // console.log("接收到類型1的JSON資料：" + JSON.stringify(jsonData, null, 2));
                
        }
         
       // 使用fs.writeFile寫入資料到文件
        fs.appendFile('TestFile.txt', receivedData, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('Write operation complete.');
            }
        });
        
        // 在控制台列印接收到的數據
        console.log("接收到数据：" + receivedData);

        // 在這裡你可以根據需要處理receivedData
        // 例如，你可以向客戶端發送回應數據
        // socket.write("你傳送的資料是：" + receivedData);
    });
    socket.on('error', function (err) {
        console.error('Socket error:', err.message);
    });
});

// 設定監聽埠
server.listen(4000);

// 設定監聽時的回呼函數
server.on('listening', function () {
    // 取得地址資訊
    let address = server.address();
    // 取得地址詳細信息
    console.log("伺服器監聽的連接埠是：" + address.port);
    console.log("伺服器監聽的位址是：" + address.address);
    console.log("伺服器監聽的位址類型是：" + address.family);
});

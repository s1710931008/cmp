var ws = require("nodejs-websocket")

// type分類: 0:表示進入聯天室  1:用戶離開 2:正常訊息
// msg:消息的內容
// time:發送時間

let count = 0;
const Type_Enter = 0;
const Type_Leave = 1;
const Type_Msg = 2;
 
const  server = ws.createServer(conn => {
    //每個連接服器的用戶，都會有一個conn
    console.log('連接成功')
    count++
    conn.userName =`用戶${count}`
    // 1.通知所有用戶有人加人
    // broadcast(`${conn.userName} 進入聯天室`)
    broadcast({
        type:Type_Enter,
        msg:`${conn.userName} 進入聯天室`,
        time: new Date().toLocaleTimeString()
    })
    
    // conn.send() 限定當前用戶發訊息

    // 接收訊息
    conn.on('text',data =>{
         // 2.通知所有用戶接收訊息
        //  broadcast(`${conn.userName}:${data}`)
        broadcast({
            type:Type_Msg,
            msg: `${conn.userName} ${data}`,
            time: new Date().toLocaleTimeString()
        })
    })

    // 關閉訊息
    conn.on('close',data =>{
        console.log('關閉連接')
        count--
        // 3.通知所有用戶有人離開了訊息
        // broadcast(`${conn.userName} 離開聯天室`)
        broadcast({
            type:Type_Leave,
            msg: `${conn.userName} 離開聯天室`,
            time: new Date().toLocaleTimeString()
        })
    })
    // 發生錯誤
    conn.on('error',data =>{
        console.log('發生異常')
    })
})

// //廣播訊息
// function broadcast(msg){
//     // server.connections 代客所有用戶
//     server.connections.forEach(item =>{
//         item.send(msg)
//         console.log(msg)
//     })
// }

//廣播訊息
function broadcast(msg){
    // server.connections 代客所有用戶
    server.connections.forEach(item =>{
        item.send(JSON.stringify(msg))
        console.log(JSON.stringify(msg))
    })
}

server.listen(3000, ()=>{
    console.log('監聽端口 3000')
})
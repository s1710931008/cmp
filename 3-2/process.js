// 屬性
console.log(process.argv);      //node命令參數
console.log(process.env);       //對象操作查詢
console.log(process.pid);       //當前進程編號 
console.log(process.platform);  //操作系統
console.log(process.version);   //node版本

// 方法
// process.cwd() //進程當前工作目錄
// process.chdir() //進程的工作目錄
// process.exitTick(fn) //將任務做到當前循環的尾部,加到'next tick'隊列，一旦當前事件輪巡隊列的任務全部完成，在next tick中的的所有 callback會位次調用
// process.exit()

// 事件
bbb(); 
process.on('uncaughtException', err => {
	console.log('Uncaughted Exception happens!')
	// 記錄錯誤下來，等到所有其他服務處理完成，然後停掉當前進程。
	console.log(err);
	server.close(() => {
		process.exit(1)
	});
});
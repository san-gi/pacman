var socket = io.connect('192.168.2.97');
socket.emit("filesRequest");
socket.on('filesPost',(files)=>{
    console.log("files post")
    console.log(files)
})
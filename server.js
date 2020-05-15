var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs');

app.use(express.static('static')) //dossier static

var f = [];
const testFolder = './sav';
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/refactor.html');
});
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/pacman.html');
});
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/historique.html');
});
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/analyse.html');
});

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        f.push(file);
    });
});

console.log("lancement")

io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
    console.log("testsav")
    socket.on('json', function (logs) {
        fs = require('fs');
        fs.writeFile("./sav/" + new Date().getTime() + ".json", JSON.stringify(logs), function (err) {
            if (err) return console.log(err);
            console.log('new sav');
        });
    });
    socket.on('filesRequest',()=>{
        console.log("files request")
        socket.emit('filesPost',f);
    });

});



server.listen(80)

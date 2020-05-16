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
        var d = new Date();
        fs.writeFile("./sav/" + d.getTime()
            + "-" + logs.lvl + "-" + logs.score + ".json", JSON.stringify(logs), function (err) {
                if (err) return console.log(err);
                console.log('new sav');
                f.push(d.getTime()
                    + "-" + logs.lvl + "-" + logs.score + ".json")
            });
    });
    socket.on('filesRequest', () => {
        console.log(f);
        console.log("files request")
        socket.emit('filesPost', f);
    });
    socket.on("requestJson",(name)=>{
        console.log("json"+name)
        fs.readFile("./sav/"+name, (err, data) => {
            if (err) throw err;
            let student = JSON.parse(data);
            console.log(student);
            console.log("oui");
            socket.broadcast.emit('postJson', student);
        });
    })

});



server.listen(80)

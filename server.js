var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs');

    app.use(express.static('static')) //dossier static



app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/refactor.html');
});
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/pacman.html');
});










console.log("lancement")

io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
    console.log("testsav")
    socket.on('json', function (logs) {
        fs = require('fs');
        fs.writeFile(new Date().getTime() + ".json", JSON.stringify(logs), function (err) {
            if (err) return console.log(err);
            console.log('new sav');
        });
    });


});



server.listen(80)

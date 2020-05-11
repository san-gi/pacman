var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs');


app.get('', (req, res) => {
    res.sendFile(__dirname + '/pacman.html');
});

io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
    socket.on('json', function (logs) {
        fs = require('fs');
        fs.writeFile(new Date().getTime() + ".json", JSON.stringify(logs), function (err) {
            if (err) return console.log(err);
            console.log('new sav');
        });
    });


});



server.listen(80)

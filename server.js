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
var origine = {};
var DataOrigine
fs.readFile('./static/arbre.json', function (err, data) {
    if (err) throw err;
    DataOrigine = JSON.parse(data);;
});
console.log("lancement")
async function makeArbre(logs) {
    console.log("makearbre")
    var chaine = "";
    var arbre = origine;
    var lvl = 0;
    for (action in logs) {
        try {


            if (logs[action].lvl != lvl) {
                lvl = logs[action].lvl
                arbre = origine;

            }
            var chaine2 = Math.round(logs[action].pacman.x) + "" +
                Math.round(logs[action].pacman.y) + "" +
                Math.round(logs[action].blinky.y) + "" +
                Math.round(logs[action].blinky.y) + "" +
                Math.round(logs[action].pinky.y) + "" +
                Math.round(logs[action].pinky.y) + "" +
                Math.round(logs[action].inky.y) + "" +
                Math.round(logs[action].inky.y) + "" +
                Math.round(logs[action].clyde.y) + "" +
                Math.round(logs[action].clyde.y)
            if (chaine2 != chaine) {
                try {
                    arbre[chaine2].total += 1;
                    console.log("total++")
                } catch (error) {
                    arbre[chaine2] = {
                        win: 0,
                        total: 1
                    }
                }
                if (logs.lvl > lvl)
                    arbre[chaine2].win += 1;
                arbre = arbre[chaine2]
                chaine = chaine2
            }

        } catch (error) {

        }
    }
    fs.writeFile("./static/arbre.json", JSON.stringify(origine), function (err) {
        if (err) return console.log(err);
        console.log('edit arbre.json');

    });
}


io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
    console.log("testsav")
    socket.on('json', function (logs) {
        makeArbre(logs);
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
    socket.on("requestJson", (name, clé) => {
        console.log("json" + name)
        fs.readFile("./sav/" + name, (err, data) => {
            if (err) throw err;
            let student = JSON.parse(data);

            console.log("oui");
            socket.broadcast.emit('postJson', student, clé);
        });
    })

});



server.listen(80)

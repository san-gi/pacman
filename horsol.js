const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs');

app.use(express.static('static')) //dossier static
app.get('', (req, res) => {
    res.sendFile(__dirname + '/static/refactor.html');
});

var jeuW;
var jeuH;
var taille;
var pacman = {
    x: 13.5,
    y: 23,
    vitesse: 0.08,
    direction: null,
    directionSuivante: null
}
var up = false;
var action = "";
var time = 0;
var score = 0;
var ptsEat = 0;
var highscore = 0;
var fruit = false;
var life = 1;
var lvl = 1;
var mode = "scatter";
var FantomeBleu = false;
var fantomeEat = 200;

var d = new Date().getTime();
var pause = false;
var total = 0;
var win = 0;
var mangerInky = 10000000;
var mangerpinky = 10000000;
var mangerclyde = 10000000;
var mangerblinky = 10000000;
var fantome = {
    blinky: {
        x: 13.5,
        y: 11,
        couleur: "#FF0000",
        direction: "gauche",
        vitesse: 0.07,
        sortie: true,
        choix: false,
    },
    pinky: {
        x: 13.5,
        y: 14,
        couleur: "#FF00FF",
        direction: "gauche",
        vitesse: 0.07,
        sortie: false,
        choix: false,
    },
    inky: {
        x: 11.5,
        y: 14,
        couleur: "#00FFFF",
        direction: "gauche",
        vitesse: 0.07,
        sortie: false,
        choix: false,
    },
    clyde: {
        x: 15.5,
        y: 14,
        couleur: "#FF9900",
        direction: "gauche",
        vitesse: 0.07,
        sortie: false,
        choix: false,
    }
}

var timeTotal = 0;
var MCTS = {
    total: 0,
    win: 0,
    "36d": {
        total: 0,
        win: 0,
    },
    "36g": {
        total: 0,
        win: 0,
    },
    "36h": {
        total: 0,
        win: 0,
    },
    "36b": {
        total: 0,
        win: 0,
    }
}
var tabArbre = [];
var Explo = 1.4;
var arbre = MCTS;
var Bchoix = 10000000;
var Cchoix = 10000000;
var Ichoix = 10000000;
var Pchoix = 10000000;
$.getJSON('http://192.168.2.97/arbreMCTS2.json', function (data) {
    console.log(data[0])
    if (data.total != undefined) {
        total = data.total
        win = data.win
        MCTS = data;
        arbre = MCTS;
        console.log("useArbreJson")
    }
});


window.onresize = function () {
    this.resize();
}

function resize() {
    var h = 1000;
    var w = 1000;
    ratio = 280 / 450;

    jeuW = (h - 240) * (280 / 450)

    jeuH = (h - 240);

    taille = jeuH / 45 - ((jeuH / 45) % 2);
}
var tab =
    [["2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "5", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "5"],
    ["0", "6", "6", "6", "6", "6", "7", "6", "6", "6", "6", "6", "6", "0", "0", "6", "6", "6", "6", "6", "6", "7", "6", "6", "6", "6", "6", "0"],
    ["0", "6", "2", "1", "1", "5", "6", "2", "1", "1", "1", "5", "6", "0", "0", "6", "2", "1", "1", "1", "5", "6", "2", "1", "1", "5", "6", "0"],
    ["0", "6", "0", "6", "6", "0", "6", "0", "6", "6", "6", "0", "6", "0", "0", "6", "0", "6", "6", "6", "0", "6", "0", "6", "6", "0", "6", "0"],
    ["0", "6", "3", "1", "1", "4", "6", "3", "1", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "1", "4", "6", "3", "1", "1", "4", "6", "0"],
    ["0", "7", "6", "6", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "6", "6", "7", "0"],
    ["0", "6", "2", "1", "1", "5", "6", "2", "5", "6", "2", "1", "1", "1", "1", "1", "1", "5", "6", "2", "5", "6", "2", "1", "1", "5", "6", "0"],
    ["0", "6", "3", "1", "1", "4", "6", "0", "0", "6", "3", "1", "1", "5", "2", "1", "1", "4", "6", "0", "0", "6", "3", "1", "1", "4", "6", "0"],
    ["0", "6", "6", "6", "6", "6", "7", "0", "0", "6", "6", "6", "6", "0", "0", "6", "6", "6", "6", "0", "0", "7", "6", "6", "6", "6", "6", "0"],
    ["3", "1", "1", "1", "1", "5", "6", "0", "3", "1", "1", "5", "6", "0", "0", "6", "2", "1", "1", "4", "0", "6", "2", "1", "1", "1", "1", "4"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "2", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "5", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "0", "6", "6", "6", "7", "6", "6", "7", "6", "6", "6", "0", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "0", "6", "2", "1", "1", "1", "1", "1", "1", "5", "6", "0", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["1", "1", "1", "1", "1", "4", "6", "3", "4", "6", "0", "6", "6", "6", "6", "6", "6", "0", "6", "3", "4", "6", "3", "1", "1", "1", "1", "1"],
    ["6", "6", "6", "6", "6", "6", "7", "6", "6", "7", "0", "6", "6", "6", "6", "6", "6", "0", "7", "6", "6", "7", "6", "6", "6", "6", "6", "6"],
    ["1", "1", "1", "1", "1", "5", "6", "2", "5", "6", "0", "6", "6", "6", "6", "6", "6", "0", "6", "2", "5", "6", "2", "1", "1", "1", "1", "1"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "0", "6", "3", "1", "1", "1", "1", "1", "1", "4", "6", "0", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "0", "7", "6", "6", "6", "6", "6", "6", "6", "6", "7", "0", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["6", "6", "6", "6", "6", "0", "6", "0", "0", "6", "2", "1", "1", "1", "1", "1", "1", "5", "6", "0", "0", "6", "0", "6", "6", "6", "6", "6"],
    ["2", "1", "1", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "5", "2", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "1", "1", "5"],
    ["0", "6", "6", "6", "6", "6", "7", "6", "6", "7", "6", "6", "6", "0", "0", "6", "6", "6", "7", "6", "6", "7", "6", "6", "6", "6", "6", "0"],
    ["0", "6", "2", "1", "1", "5", "6", "2", "1", "1", "1", "5", "6", "0", "0", "6", "2", "1", "1", "1", "5", "6", "2", "1", "1", "5", "6", "0"],
    ["0", "6", "3", "1", "5", "0", "6", "3", "1", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "1", "4", "6", "0", "2", "1", "4", "6", "0"],
    ["0", "6", "6", "6", "0", "0", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "0", "0", "6", "6", "6", "0"],
    ["3", "1", "5", "6", "0", "0", "6", "2", "5", "6", "2", "1", "1", "1", "1", "1", "1", "5", "6", "2", "5", "6", "0", "0", "6", "2", "1", "4"],
    ["2", "1", "4", "6", "3", "4", "6", "0", "0", "6", "3", "1", "1", "5", "2", "1", "1", "4", "6", "0", "0", "6", "3", "4", "6", "3", "1", "5"],
    ["0", "6", "6", "7", "6", "6", "6", "0", "0", "6", "6", "6", "6", "0", "0", "6", "6", "6", "6", "0", "0", "6", "6", "6", "7", "6", "6", "0"],
    ["0", "6", "2", "1", "1", "1", "1", "4", "3", "1", "1", "5", "6", "0", "0", "6", "2", "1", "1", "4", "3", "1", "1", "1", "1", "5", "6", "0"],
    ["0", "6", "3", "1", "1", "1", "1", "1", "1", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "1", "1", "1", "1", "1", "1", "4", "6", "0"],
    ["0", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "7", "6", "6", "7", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "0"],
    ["3", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "4"]];

var tabEat =
    [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "2", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "2", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "3", "0", "0", "3", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "3", "0", "0", "3", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "3", "3", "3", "3", "3", "3", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["3", "3", "3", "3", "3", "3", "1", "3", "3", "3", "0", "3", "3", "3", "3", "3", "3", "0", "3", "3", "3", "1", "3", "3", "3", "3", "3", "3"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "3", "3", "3", "3", "3", "3", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "1", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "1", "0", "0", "0", "0", "0", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
    ["0", "2", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "1", "3", "3", "1", "1", "1", "1", "1", "1", "1", "0", "0", "1", "1", "2", "0"],
    ["0", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "0"],
    ["0", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "1", "0", "0", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "0"],
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]];
var savEat = [];
for (var i = 0; i < 31; i++) {
    savEat[i] = []
    for (var j = 0; j < 28; j++) {
        savEat[i][j] = tabEat[i][j];
    }
}

function draw() {


    if (timeTotal - FBleu == 500) {
        FantomeBleu = false;
        for (e in fantome)
            fantome[e].vitesse = 0.07;
    }
    if (timeTotal - Bchoix == 15) {
        fantome.blinky.choix = false
    }
    if (timeTotal - Cchoix == 15) {
        fantome.clyde.choix = false
    }
    if (timeTotal - Ichoix == 15) {
        fantome.inky.choix = false
    }
    if (timeTotal - Pchoix == 15) {
        fantome.pinky.choix = false
    }
    if (timeTotal - SortiePinky == 150) {
        fantome.pinky.x = 13.5;
        fantome.pinky.y = 11;
        fantome.pinky.direction = "gauche";
    }
    if (timeTotal - mangerInky == 500) {
        fantome.inky.x = 13.5;
        fantome.inky.y = 11;
        fantomeEat = 200;
    }
    if (timeTotal - mangerpinky == 500) {
        fantome.pinky.x = 13.5;
        fantome.pinky.y = 11;
        fantomeEat = 200;
    }
    if (timeTotal - mangerclyde == 500) {
        fantome.clyde.x = 13.5;
        fantome.clyde.y = 11;
        fantomeEat = 200;
    }
    if (timeTotal - mangerblinky == 500) {
        fantome.blinky.x = 13.5;
        fantome.blinky.y = 11;
        fantomeEat = 200;
    }
    timeTotal++;
    if (timeTotal % 36 == 0) {
        tabArbre.push(arbre);
        if (arbre.total == 0) {
            arbre[timeTotal + "d"] = {
                win: 0,
                total: 0,
            };
            arbre[timeTotal + "g"] = {
                win: 0,
                total: 0,
            };
            arbre[timeTotal + "h"] = {
                win: 0,
                total: 0,
            };
            arbre[timeTotal + "b"] = {
                win: 0,
                total: 0,
            };
        }
        var select = "";
        var selectN = 0;
        for (choix in arbre) {
            if (choix != "win" && choix != "total") {

                var c = choix[choix.length - 1]
                if (arbre[timeTotal + c].total > 0) {
                    if (arbre[timeTotal + c].win / arbre[timeTotal + c].total + Explo * Math.sqrt(Math.log(arbre.total) / arbre[timeTotal + c].total) > selectN) {
                        selectN = arbre[timeTotal + c].win / arbre[timeTotal + c].total + Explo * Math.sqrt(Math.log(arbre.total) / arbre[timeTotal + c].total);
                        select = c;
                    }
                } else {
                    if (Explo * Math.sqrt(Math.log(arbre.total)) > selectN) {
                        selectN = Explo * Math.sqrt(Math.log(arbre.total));
                        select = c;
                    }
                }
            }
        }
        switch (select) {
            case "g": gauche();
                break;
            case "d": droite();
                break;
            case "h": haut();
                break;
            case "b": bas();
                break;
            default:
                var t = Math.random();
                if (t >= 0.75) {
                    gauche();
                    select = "g";
                } else if (t >= 0.5) {
                    droite();
                    select = "d";
                } else if (t >= 0.25) {
                    haut();
                    select = "h";
                } else {
                    bas();
                    select = "b";
                }
        }
        arbre = arbre[timeTotal + select];
    }

    if (!FantomeBleu) {
        time++;
        tempo(time);
    }
    drawEat();
    drawPacman();
    drawFantomes();
    if (score > 10000 && !up) {
        life++
        up = true;
    }
}


var FBleu = 10000000;
function bleu() {
    for (f in fantome)
        fantome[f].vitesse = 0.035;

    FantomeBleu = true;

    mode = "scatter"
    FBleu = timeTotal;


}
function tempo(t) {
    if (t == 700) {
        mode = "chasse";
        inverseDir();
    }
    else if (t == 2700) {
        mode = "scatter";
        inverseDir();
    }
    else if (t == 3400) {
        mode = "chasse";
        inverseDir();
    }
    else if (t == 5400) {
        mode = "scatter";
        inverseDir();
    }
    else if (t == 5900) {
        mode = "chasse";
        inverseDir();
    }
    else if (t == 7900) {
        mode = "scatter";
        inverseDir();
    }
    else if (t >= 8400 && mode == "scatter") {
        mode = "chasse";
        inverseDir();
    }
}
function inverseDir() {
    for (f in fantome) {
        if (fantome[f].direction == "gauche")
            fantome[f].direction = "droite"
        else if (fantome[f].direction == "droite")
            fantome[f].direction = "gauche"
        else if (fantome[f].direction == "haut")
            fantome[f].direction = "bas"
        else if (fantome[f].direction == "bas")
            fantome[f].direction = "haut"

    }
}
function drawFantomes() {
    for (f in fantome) {
        if (fantome[f].x <= fantome[f].vitesse)
            fantome[f].x = 27 - fantome[f].vitesse;
        else if (fantome[f].x >= 27 - fantome[f].vitesse)
            fantome[f].x = 0 + fantome[f].vitesse;
        switch (fantome[f].direction) {
            case "droite":
                if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x + fantome[f].vitesse + 0.5)] == "6" || tab[Math.round(fantome[f].y)][Math.round(fantome[f].x + fantome[f].vitesse + 0.5)] == "7") {
                    fantome[f].x = Math.round((fantome[f].x + fantome[f].vitesse) * 1000) / 1000;
                    if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x)] == "7" && Math.abs(fantome[f].x % 1) - fantome[f].vitesse <= fantome[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);

                break;
            case "gauche":
                if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x - fantome[f].vitesse - 0.5)] == "6" || tab[Math.round(fantome[f].y)][Math.round(fantome[f].x - fantome[f].vitesse - 0.5)] == "7") {
                    fantome[f].x = Math.round((fantome[f].x - fantome[f].vitesse) * 1000) / 1000;
                    if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x)] == "7" && Math.abs(fantome[f].x % 1) - fantome[f].vitesse <= fantome[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
            case "haut":
                if (tab[Math.round(fantome[f].y - fantome[f].vitesse - 0.5)][Math.round(fantome[f].x)] == "6" || tab[Math.round(fantome[f].y - fantome[f].vitesse - 0.5)][Math.round(fantome[f].x)] == "7") {
                    fantome[f].y = Math.round((fantome[f].y - fantome[f].vitesse) * 1000) / 1000;
                    if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x)] == "7" && Math.abs(fantome[f].y % 1) - fantome[f].vitesse <= fantome[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
            case "bas":
                if (tab[Math.round(fantome[f].y + fantome[f].vitesse + 0.5)][Math.round(fantome[f].x)] == "6" || tab[Math.round(fantome[f].y + fantome[f].vitesse + 0.5)][Math.round(fantome[f].x)] == "7") {
                    fantome[f].y = Math.round((fantome[f].y + fantome[f].vitesse) * 1000) / 1000;
                    if (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x)] == "7" && Math.abs(fantome[f].y % 1) - fantome[f].vitesse <= fantome[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
        }

        if (Math.round(fantome[f].x) == Math.round(pacman.x) && Math.round(fantome[f].y) == Math.round(pacman.y)) {
            if (FantomeBleu) {
                fantome[f].x = 13.5;
                fantome[f].y = 14;
                score += fantomeEat;
                fantomeEat += fantomeEat;
                var r = f;
                switch (r) {
                    case "blinky": mangerblinky = timeTotal;
                        break;
                    case "pinky": mangerpinky = timeTotal;
                        break;
                    case "inky": mangerInky = timeTotal;
                        break;
                    case "clyde": mangerclyde = timeTotal;
                        break;
                }

            } else {
                life -= 1;

                if (life == 0)
                    GameOver();
                else
                    repositionne();
            }

        }
    }
}

function GameOver() {
    pause = true
    if (total % 100 == 0)
        console.log(highscore + " " + total)
    var w = 0;
    if (ptsEat > 0)
        w = Math.round((score * 1000) / 5800) / 1000
    for (var i = 0; i < tabArbre.length; i++) {
        tabArbre[i].total += 1;
        tabArbre[i].win += w
    }
    fruit = false;
    win += w;
    total += 1;
    tabArbre = [];
    timeTotal = 0;
    arbre = MCTS;

    fantome.blinky.choix = false;
    fantome.clyde.choix = false;
    fantome.inky.choix = false;
    fantome.pinky.choix = false;
    if (total % 1 == 0)
        updateMCTS();

    d = new Date().getTime();
    nextLvl();
    lvl = 1;
    life = 1;
    score = 0;

}
function updateMCTS() {
    console.log("testup")
    console.log(MCTS)
    fs.writeFile("./static/arbreMCTS2.json", JSON.stringify(MCTS), function (err) {
        if (err) return console.log(err);
        console.log('updateMCTS2');
        pause = false;
        while (!pause) {
            draw();
        }
    });
}

function choixDirection(name) {
    if (!fantome[name].choix) {
        fantome[name].choix = true;


        switch (name) {
            case "blinky":
                Bchoix = timeTotal;
                if (mode == "chasse")
                    cible = [Math.round(pacman.x), Math.round(pacman.y)];
                else if (mode == "scatter")
                    cible = [26, -2];
                break;
            case "pinky":
                Pchoix = timeTotal;
                if (mode == "chasse") {
                    cible = [Math.round(pacman.x), Math.round(pacman.y)];
                    if (pacman.direction == "gauche") cible[0] -= 4;
                    else if (pacman.direction == "droite") cible[0] += 4;
                    else if (pacman.direction == "haut") cible[1] -= 4;
                    else if (pacman.direction == "bas") cible[1] += 4;
                } else if (mode == "scatter")
                    cible = [6, -2];
                break;
            case "inky":
                Ichoix = timeTotal;
                if (mode == "chasse") {
                    cible = [Math.round(pacman.x), Math.round(pacman.y)];
                    if (pacman.direction == "gauche") cible[0] -= 2;
                    else if (pacman.direction == "droite") cible[0] += 2;
                    else if (pacman.direction == "haut") cible[1] -= 2;
                    else if (pacman.direction == "bas") cible[1] += 2;

                    cible[0] += (Math.floor(cible[0] - fantome.blinky.x))
                    cible[1] += (Math.floor(cible[1] - fantome.blinky.y))
                } else if (mode == "scatter")
                    cible = [28, 33];
                break;
            case "clyde":
                Cchoix = timeTotal;
                if (mode == "chasse") {
                    cible = [Math.round(pacman.x), Math.round(pacman.y)];
                    if (Math.abs(Math.floor(fantome[name].x) - cible[0]) + Math.abs(Math.floor(fantome[name].y) - cible[1]) < 8)
                        cible = [0, 33 + 8];
                } else if (mode == "scatter")
                    cible = [0, 33];
                break;
        }
        var max = 2000;
        var dir = "nop"
        var distanceD = Math.sqrt((Math.round(fantome[name].x) - cible[0] + 1) ** 2 + Math.round((fantome[name].y) - cible[1]) ** 2)
        var distanceG = Math.sqrt((Math.round(fantome[name].x) - cible[0] - 1) ** 2 + Math.round((fantome[name].y) - cible[1]) ** 2)
        var distanceH = Math.sqrt((Math.round(fantome[name].x) - cible[0]) ** 2 + Math.round((fantome[name].y) - cible[1] - 1) ** 2)
        var distanceB = Math.sqrt((Math.round(fantome[name].x) - cible[0]) ** 2 + Math.round((fantome[name].y) - cible[1] + 1) ** 2)
        if (distanceD <= max && fantome[name].direction != "gauche" && (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x + 1)] == "6" || tab[Math.round(fantome[f].y)][Math.round(fantome[f].x + fantome[f].vitesse + 0.5)] == "7")) {

            dir = "droite";
            max = distanceD
        }
        if (distanceH <= max && fantome[name].direction != "bas" && (tab[Math.round(fantome[f].y - 1)][Math.round(fantome[f].x)] == "6" || tab[Math.round(fantome[f].y - fantome[f].vitesse - 0.5)][Math.round(fantome[f].x)] == "7")) {
            dir = "haut";
            max = distanceH;
        }
        if (distanceG <= max && fantome[name].direction != "droite" && (tab[Math.round(fantome[f].y)][Math.round(fantome[f].x - 1)] == "6" || tab[Math.round(fantome[f].y)][Math.round(fantome[f].x - fantome[f].vitesse - 0.5)] == "7")) {
            dir = "gauche";
            max = distanceG;
        }
        if (distanceB <= max && fantome[name].direction != "haut" && (tab[Math.round(fantome[f].y + 1)][Math.round(fantome[f].x)] == "6" || tab[Math.round(fantome[f].y + fantome[f].vitesse + 0.5)][Math.round(fantome[f].x)] == "7")) {
            dir = "bas";
            max = distanceB;
        }

        fantome[name].direction = dir;
    }
}

function drawPacman() {
    if (pacman.x <= pacman.vitesse)
        pacman.x = 27 - pacman.vitesse;
    else if (pacman.x >= 27 - pacman.vitesse)
        pacman.x = 0 + pacman.vitesse;
    if (pacman.direction == null)
        pacman.direction = pacman.directionSuivante;
    switch (pacman.direction) {
        case "droite":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7") {
                pacman.x = Math.round((pacman.x + pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.abs(pacman.x % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman();
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
        case "gauche":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7") {
                pacman.x = Math.round((pacman.x - pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.abs(pacman.x % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman();
            }

            else
                pacman.direction = pacman.directionSuivante
            break;
        case "haut":
            if (tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "7") {
                pacman.y = Math.round((pacman.y - pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.abs(pacman.y % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman();
            }

            else
                pacman.direction = pacman.directionSuivante
            break;
        case "bas":
            if (tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "7") {
                pacman.y = Math.round((pacman.y + pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.abs(pacman.y % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman();
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
    }
    if (tabEat[Math.round(pacman.y)][Math.round(pacman.x)] == "1") {
        tabEat[Math.round(pacman.y)][Math.round(pacman.x)] = "3"
        eat(10);
    } else if (tabEat[Math.round(pacman.y)][Math.round(pacman.x)] == "2") {
        tabEat[Math.round(pacman.y)][Math.round(pacman.x)] = "3"
        eat(50);
        bleu();
    }
}
function eat(nb) {
    score += nb;
    ptsEat += nb;
    if ((ptsEat >= 700 && ptsEat <= 750) || (ptsEat >= 1700 && ptsEat <= 1750))
        fruit = true;
    if (score > highscore)
        highscore = score;
    if (ptsEat == 2600) {
        for (var i = 0; i < tabArbre.length; i++) {
            tabArbre[i].total += 1;
            tabArbre[i].win += Math.round((score * 1000) / 5800) / 1000;

        }
        total += 1;
        win += Math.round((score * 1000) / 5800) / 1000
        tabArbre = [];
        timeTotal = 0;
        arbre = MCTS;
        updateMCTS();
        nextLvl();

    }

    if (ptsEat >= 300 && !fantome.inky.sortie) {
        fantome.inky.sortie = true;
        fantome.inky.direction = "gauche";
        fantome.inky.x = 13.5;
        fantome.inky.y = 11;
    }
    if (ptsEat >= 866 && !fantome.clyde.sortie) {
        fantome.clyde.direction = "gauche";
        fantome.clyde.sortie = true;
        fantome.clyde.x = 13.5;
        fantome.clyde.y = 11;
    }
}
function nextLvl() {

    fantome.inky.sortie = false;
    fantome.clyde.sortie = false;
    repositionne();

    ptsEat = 0;
    lvl += 1;


    for (var i = 0; i < 28; i++) {
        for (var j = 0; j < 31; j++) {
            tabEat[j][i] = savEat[j][i];
        }
    }
}
var SortiePinky = 10000000;
function repositionne() {
    time = 0;
    mode = "scatter"
    pacman.x = 13.5;
    pacman.y = 23;
    pacman.direction = null;
    pacman.directionSuivante = null;
    fantome.blinky.x = 13.5;
    fantome.blinky.y = 11;
    fantome.blinky.direction = "gauche";
    fantome.pinky.x = 13.5;
    fantome.pinky.y = 14;
    fantome.pinky.direction = "gauche";
    fantome.inky.x = 13.5;
    fantome.inky.y = 14;
    fantome.inky.direction = "gauche";
    fantome.clyde.x = 13.5;
    fantome.clyde.y = 14;
    fantome.clyde.direction = "gauche";
    SortiePinky = timeTotal;


}
function directionPacman() {
    switch (pacman.directionSuivante) {
        case "droite":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "gauche":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "haut":
            if (tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "bas":
            if (tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
    }
}
function drawEat() {

    if (fruit && Math.round(pacman.y) == 17 && Math.round(pacman.x * 2) == 27) {
        fruit = false;
        score += 100;
    }
}

function droite() {


    if (pacman.direction == "gauche" || pacman.direction == null)
        pacman.direction = "droite";
    pacman.directionSuivante = "droite";
}
function gauche() {
    if (pacman.direction == "droite" || pacman.direction == null)
        pacman.direction = "gauche";
    pacman.directionSuivante = "gauche";
}
function haut() {
    if (pacman.direction == "bas" || pacman.direction == null)
        pacman.direction = "haut";
    pacman.directionSuivante = "haut";
}
function bas() {
    if (pacman.direction == "haut" || pacman.direction == null)
        pacman.direction = "bas";
    pacman.directionSuivante = "bas";
}

resize();
repositionne();
setTimeout(() => {
    while (!pause) {
        draw();
    }
}, 1000);


server.listen(80)
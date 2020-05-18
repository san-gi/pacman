var jeuW;
var jeuH;
var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");
var taille;
var pacman = {
    x: 13.5,
    y: 23,
    vitesse: 0.08,
    direction: null,
    directionSuivante: null
}
var time = 0;
var score = 0;
var ptsEat = 0;
var highscore = 0;
var fruit = false;
var life = 4;
var lvl = 1;
var mode = "scatter";
var FantomeBleu = false;
var fantomeEat = 200;
var socket = io.connect('192.168.2.97');
var logs = {}
var d = new Date().getTime();
var SortieInky;
var SortieClyde
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
window.onresize = function () {
    this.resize();
}

function resize() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    ratio = 280 / 450;

    jeuW = (h - 240) * (280 / 450)

    jeuH = (h - 240);
    console.log(document.getElementById('Game').offsetHeight + " " + document.getElementById('Game').offsetWidth)
    taille = jeuH / 45 - ((jeuH / 45) % 2);
    document.getElementById('Game').width = taille * 28;
    document.getElementById('Game').height = taille * 44;
    drawMap();
    drawinfo();
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
    if (!FantomeBleu) {
        time++;
        tempo(time);
    }
    drawEat();
    drawPacman();
    drawFantomes();
    if (fruit)
        drawFruit();

}
function drawFruit() {
    ctx.beginPath();
    ctx.arc(14 * taille, 25.5 * taille, taille / 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "#cd5757";
    ctx.fill();
    ctx.closePath();
}
function bleu() {
    for (f in fantome)
        fantome[f].vitesse = 0.035;

    FantomeBleu = true;

    mode = "scatter"

    var FBleu = setTimeout(function () {
        FantomeBleu = false;
        for (e in fantome)
            fantome[e].vitesse = 0.07;
    }, 5000);
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
                var manger = setTimeout(function () {
                    fantome[r].x = 13.5;
                    fantome[r].y = 11;
                    fantomeEat = 200;
                }, 5000);
            } else {
                life -= 1;
                repositionne();
                if (life == 0)
                    GameOver();
                drawinfo();
            }

        }

        ctx.beginPath();
        ctx.arc(fantome[f].x * taille + taille / 2, fantome[f].y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
        if (!FantomeBleu)
            ctx.fillStyle = fantome[f].couleur;
        else
            ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.closePath();
    }
}

function GameOver() {
    logs.score = score;
    logs.lvl = lvl;
    if (score > 1000)
        socket.emit("json", logs);
    logs = {}
    d = new Date().getTime();
    console.log("GameOver")
    nextLvl();
    lvl = 1;
    life = 4;
    score = 0;

}
function choixDirection(name) {
    if (!fantome[name].choix) {
        fantome[name].choix = true;
        setTimeout(function () { fantome[name].choix = false }, 2 / fantome[name].vitesse);
        switch (name) {
            case "blinky":
                if (mode == "chasse")
                    cible = [Math.round(pacman.x), Math.round(pacman.y)];
                else if (mode == "scatter")
                    cible = [26, -2];
                break;
            case "pinky":
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
        sav(name + dir);
        fantome[name].direction = dir;
    }
}
function sav(act) {
    var tabSav ="";
    for (var i = 0; i < 31; i++) {
        tabSav+=tabEat[i].join()+"-"
    }
    console.log("sav")
    var dd = new Date().getTime();
    logs[dd - d] = {
        action: act, life: life, score: score, hsctore: highscore, ptsEat: ptsEat, lvl: lvl, mode: mode, bleu: FantomeBleu, tabsav: tabSav,
        pacman: {
            x: pacman.x, y: pacman.y,
        },
        blinky: {
            x: fantome.blinky.x,
            y: fantome.blinky.y,
            dir: fantome.blinky.direction
        },
        pinky: {
            x: fantome.pinky.x,
            y: fantome.pinky.y,
            dir: fantome.pinky.direction
        },
        inky: {
            x: fantome.inky.x,
            y: fantome.inky.y,
            dir: fantome.inky.direction
        },
        clyde: {
            x: fantome.clyde.x,
            y: fantome.clyde.y,
            dir: fantome.clyde.direction
        }
    };
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
    ctx.beginPath();
    ctx.arc(pacman.x * taille + taille / 2, pacman.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
}
function eat(nb) {
    score += nb;
    ptsEat += nb;
    if ((ptsEat >= 700 && ptsEat <= 750) || (ptsEat >= 1700 && ptsEat <= 1750))
        fruit = true;
    if (score > highscore)
        highscore = score;
    if (ptsEat == 2600) {
        nextLvl();

    }

    if (ptsEat >= 300 && !fantome.inky.sortie) {
        console.log("sortie inki")
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
    drawinfo();
}
function nextLvl() {
    clearTimeout(SortieInky);
    clearTimeout(SortieClyde);
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

    var SortiePinky = setTimeout(function () {
        fantome.pinky.x = 13.5;
        fantome.pinky.y = 11;
        fantome.pinky.direction = "gauche";

    }, 1500);
    if (ptsEat >= 300 && fantome.inky.sortie)
        SortieInky = setTimeout(function () {
            console.log("il part")
            fantome.inky.x = 13.5;
            fantome.inky.y = 11;

            fantome.inky.direction = "gauche";
        }, 3000);
    if (ptsEat > 870 && fantome.clyde.sortie)
        SortieClyde = setTimeout(function () {
            fantome.clyde.x = 13.5;
            fantome.clyde.y = 11;

            fantome.clyde.direction = "gauche";
        }, 4500);
}
function drawinfo() {
    ctx.beginPath();
    ctx.rect(0, 0, taille * 28, taille * 8);
    ctx.fillStyle = "#111111";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 40 * taille, taille * 28, taille * 4);
    ctx.fillStyle = "#111111";
    ctx.fill();
    ctx.closePath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(score, 5 * taille, 7 * taille);
    ctx.fillText(highscore, 14 * taille, 5 * taille);
    ctx.fillText("HIGH SCORE", 14 * taille, 3 * taille);
    ctx.fillText("LIFE : " + life, 5 * taille, 43 * taille);
    ctx.fillText("LVL : " + lvl, 24 * taille, 43 * taille);
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
    for (var i = 0; i < 28; i++) {
        for (var j = 0; j < 31; j++) {
            switch (tabEat[j][i]) {
                case '1'://horizontal
                    ctx.beginPath();
                    ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                    ctx.fillStyle = "#111111";
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.arc(i * taille + taille / 2, j * taille + taille / 2 + 8 * taille, taille / 6, 0, Math.PI * 2);
                    ctx.fillStyle = "#FFFF00";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '2': //angle bas-droit
                    ctx.beginPath();
                    ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                    ctx.fillStyle = "#111111";
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.arc(i * taille + taille / 2, j * taille + taille / 2 + 8 * taille, taille / 4, 0, Math.PI * 2);
                    ctx.fillStyle = "#f6f6f6";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '3': //angle bas-droit
                    ctx.beginPath();
                    ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                    ctx.fillStyle = "#111111";
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
        }
    }
    if (fruit && Math.round(pacman.y) == 17 && Math.round(pacman.x * 2) == 27) {
        fruit = false;
        score += 100;
    }
}
function drawMap() {
    for (var i = 0; i < 28; i++) {
        for (var j = 0; j < 31; j++) {
            switch (tab[j][i]) {
                case '0'://vertical
                    ctx.beginPath();
                    ctx.rect(i * taille + taille / 4, j * taille + 8 * taille, taille / 2, taille);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '1'://horizontal
                    ctx.beginPath();
                    ctx.rect(i * taille, j * taille + taille / 4 + 8 * taille, taille, taille / 2);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '2': //angle bas-droit
                    ctx.beginPath();
                    ctx.rect(i * taille + taille / 4, j * taille + taille / 4 + 8 * taille, taille / 2, taille * (3 / 4));
                    ctx.rect(i * taille + taille / 4, j * taille + taille / 4 + 8 * taille, taille * (3 / 4), taille / 2);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '3': //angle droit-haut
                    ctx.beginPath();
                    ctx.rect(i * taille + taille / 4, j * taille + 8 * taille, taille / 2, taille * (3 / 4));
                    ctx.rect(i * taille + taille / 4, j * taille + taille / 4 + 8 * taille, taille * (3 / 4), taille / 2);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '4': //angle haut-gauche
                    ctx.beginPath();
                    ctx.rect(i * taille + taille / 4, j * taille + 8 * taille, taille / 2, taille * (3 / 4));
                    ctx.rect(i * taille, j * taille + taille / 4 + 8 * taille, taille * (3 / 4), taille / 2);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                case '5': //angle gauche-bas
                    ctx.beginPath();
                    ctx.rect(i * taille + taille / 4, j * taille + taille / 4 + 8 * taille, taille / 2, taille * (3 / 4));
                    ctx.rect(i * taille, j * taille + taille / 4 + 8 * taille, taille * (3 / 4), taille / 2);
                    ctx.fillStyle = "#0002ff";
                    ctx.fill();
                    ctx.closePath();
                    break;
                default:
                    ctx.beginPath();
                    ctx.rect(i * taille, j * taille + 8 * taille, taille, taille);
                    ctx.fillStyle = "#000000";
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
        }
    }
}
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    console.log(e.key)
    if (e.key == "d") {
        sav("pacmandroite");
        if (pacman.direction == "gauche" || pacman.direction == null)
            pacman.direction = "droite";
        pacman.directionSuivante = "droite";
    }
    else if (e.key == "q" || e.key == "a") {
        sav("pacmangauche");
        if (pacman.direction == "droite" || pacman.direction == null)
            pacman.direction = "gauche";
        pacman.directionSuivante = "gauche";
    }
    else if (e.key == "z" || e.key == "w") {
        sav("pacmanhaut");
        if (pacman.direction == "bas" || pacman.direction == null)
            pacman.direction = "haut";
        pacman.directionSuivante = "haut";
    }
    else if (e.key == "s") {
        sav("pacmanbas");
        if (pacman.direction == "haut" || pacman.direction == null)
            pacman.direction = "bas";
        pacman.directionSuivante = "bas";
    }
}

resize();
repositionne();
setInterval(function () { draw(); }, 10);
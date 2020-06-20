var jeuW;
var jeuH;
var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");
var taille;
var pacman = {
    x: 13.5,
    y: 23,
    vitesse: 0.07,
    direction: null,
    directionSuivante: null
}
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
var socket = io.connect('192.168.2.97');
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
        vitesse: 0.06,
        sortie: true,
        choix: false,
    },
    pinky: {
        x: 13.5,
        y: 14,
        couleur: "#FF00FF",
        direction: "gauche",
        vitesse: 0.06,
        sortie: false,
        choix: false,
    },
    inky: {
        x: 11.5,
        y: 14,
        couleur: "#00FFFF",
        direction: "gauche",
        vitesse: 0.06,
        sortie: false,
        choix: false,
    },
    clyde: {
        x: 15.5,
        y: 14,
        couleur: "#FF9900",
        direction: "gauche",
        vitesse: 0.06,
        sortie: false,
        choix: false,
    }
}

var timeTotal = 0;
var MCTS = {
    t: 0,
    w: 0,
    "1d": {
        total: 0,
        w: 0,
    },
    "1g": {
        total: 0,
        w: 0,
    },
    "1h": {
        total: 0,
        w: 0,
    }

}
var reception = false;
var tabArbre = [];
var Explo = 0;
var arbre = MCTS;
var Bchoix = 10000000;
var Cchoix = 10000000;
var Ichoix = 10000000;
var Pchoix = 10000000;
var select = "h";
var PhaseChoix = false
var tabChoix = [];
var nbphase = 0;
var selectTourche = "";
$.getJSON('http://192.168.2.97/arbreMCTS2.json', function (data) {
    console.log(data)
    if (data.t != undefined) {
        total = data.t
        win = data.w
        MCTS = data;
        arbre = MCTS;
        console.log("useArbreJson")
        drawinfo();
    }
    reception = true;
});


window.onresize = function () {
    this.resize();
}

function resize() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    ratio = 280 / 450;

    jeuW = (h - 240) * (280 / 450)

    jeuH = (h - 240);

    taille = jeuH / 45 - ((jeuH / 45) % 2);
    document.getElementById('Game').width = taille * 28;
    document.getElementById('Game').height = taille * 44;
    document.getElementById('info').style = "height:" + taille * 44 + "px; width:" + taille * 28 + "px;";
    document.getElementById('dir').style = "height:" + taille * 34 + "px;overflow:scroll;";
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
var tabEat2 =
    [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]];
var tabEat3 = []
for (var i = 0; i < 31; i++) {
    tabEat3[i] = []
    for (var j = 0; j < 28; j++) {
        tabEat3[i][j] = tabEat2[i][j];
    }
}
var savEat = [];
for (var i = 0; i < 31; i++) {
    savEat[i] = []
    for (var j = 0; j < 28; j++) {
        savEat[i][j] = tabEat[i][j];
    }
}

function draw() {
    if (reception) {
        if (!pause) {
            if (timeTotal - FBleu == 500) {
                FantomeBleu = false;
                for (e in fantome)
                    fantome[e].vitesse = 0.06;
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
            if (timeTotal % 12 == 0) {





                try {
                    if (arbre.t == 0) {
                        arbre[(timeTotal / 12) + "d"] = {
                            w: 0,
                            t: 0,
                        };
                        arbre[(timeTotal / 12) + "g"] = {
                            w: 0,
                            t: 0,
                        };
                        arbre[(timeTotal / 12) + "h"] = {
                            w: 0,
                            t: 0,
                        };
                        arbre[(timeTotal / 12) + "b"] = {
                            w: 0,
                            t: 0,
                        };
                    }
                } catch (error) {

                }

                select = "";
                var selectN = 0;
                for (choix in arbre) { // pour chaque branche
                    if (choix != "w" && choix != "t") {

                        /**
                         * ici qu'il faut explorer le tab pour voir le chemin le court chemin valie pour aller sur une gomme
                         * 
                         *  parcourir le tableau, et recursion a chaque embrenchement pour chercher la boule la plus proche
                         * 
                         */

                        var c = choix[choix.length - 1]
                        select = "g";
                        
                    }
                }
                if (PhaseChoix && selectTourche != ""){
                    select = selectTourche;
                }
                if (PhaseChoix && nbphase < tabChoix.length){
                    select = tabChoix[nbphase]
                }
                PhaseChoix = true;
                tabArbre.push(arbre);
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
                if (nbphase == tabChoix.length) {
                    tabChoix.push(select)
                    PhaseChoix = false
                    nbphase = 10000000
                }
                nbphase++;
                try {
                    arbre = arbre[(timeTotal / 12) + select];
                    if (!PhaseChoix) {
                        if (arbre.t > 0)
                            $("#dir").html($("#dir").html() + `<div  class="d-flex justify-content-around"><div class=" bg-secondary">${Math.round((arbre[((timeTotal + 12) / 12) + "h"].w / arbre[((timeTotal + 12) / 12) + "h"].t) * 100 / 100)}</div><div  class=" bg-secondary">${Math.round((arbre[((timeTotal + 12) / 12) + "b"].w / arbre[((timeTotal + 12) / 12) + "b"].t) * 100) / 100}</div><div class="bg-secondary">${Math.round((arbre[((timeTotal + 12) / 12) + "g"].w / arbre[((timeTotal + 12) / 12) + "g"].t) * 100) / 100}</div><div class="bg-secondary">${Math.round((arbre[((timeTotal + 12) / 12) + "d"].w / arbre[((timeTotal + 12) / 12) + "d"].t * 100) / 100)}</div></div>`);
                        else
                            $("#dir").html(`<div><button type="button"  class="btn btn-dark">?</button><button type="button" class="btn btn-dark">?</button><button type="button" class="btn btn-dark">?</button><button type="button" class="btn btn-dark">?</button></div>`);
                        $("#dir").scrollTop(1000000)
                    }
                } catch (error) {
                    GameOver()
                }
            }

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
    }
    if (PhaseChoix) {

        draw()
    }
}

function drawFruit() {
    if (!PhaseChoix) {
        ctx.beginPath();
        ctx.arc(14 * taille, 25.5 * taille, taille / 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#cd5757";
        ctx.fill();
        ctx.closePath();
    }
}
var FBleu = 10000000;
function bleu() {
    for (f in fantome)
        fantome[f].vitesse = 0.03;
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

        if (pacman.x < fantome[f].x + 0.2 && pacman.x > fantome[f].x - 0.2 && pacman.y < fantome[f].y + 0.2 && pacman.y > fantome[f].y - 0.2) {
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
                GameOver();
            }

        }
        if (!PhaseChoix) {
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
}

function GameOver() {

    nbphase = 0;
    for (var i = 0; i < 31; i++) {
        tabEat3[i] = []
        for (var j = 0; j < 28; j++) {
            tabEat3[i][j] = tabEat2[i][j]
        }
    }
    for (var i = 0; i < 31; i++) {
        tabEat2[i] = []
        for (var j = 0; j < 28; j++) {
            tabEat2[i][j] = "0"
        }
    }
    tabArbre.push(arbre);
    mangerInky = 10000000;
    mangerpinky = 10000000;
    mangerclyde = 10000000;
    mangerblinky = 10000000;
    Bchoix = 10000000;
    Cchoix = 10000000;
    Ichoix = 10000000;
    Pchoix = 10000000;
    FBleu = 10000000;
    SortiePinky = 10000000;
    $("#dir").html("");
    var w = 1;
    if (!PhaseChoix) {
        //if (tabArbre[tabArbre.length].t === 0)
        for (var i = 0; i < tabArbre.length; i++) {
            try {
                tabArbre[i].t += 1;
                if (Object.keys(tabArbre[i]).length > 2)
                    tabArbre[i].w = Math.round((tabArbre[i].w + w) * 100) / 100
            } catch (error) {
            }
        }
        var nb = 0;
        for (obj in tabArbre[tabArbre.length - 3]) {
            if (tabArbre[tabArbre.length - 3][obj].w == 0 && tabArbre[tabArbre.length - 3][obj].t > 0) {
                nb++;
            }
        } if (nb < 4) {
            nb = 0
            for (obj in tabArbre[tabArbre.length - 3]) {
                if (tabArbre[tabArbre.length - 3][obj].w == 0 && tabArbre[tabArbre.length - 3][obj].t == 0) {
                    nb++;
                }
            }
        }
        if (nb == 4) {
            for (obj in tabArbre[tabArbre.length - 3]) {
                if (obj != "w" && obj != "t") {
                    delete tabArbre[tabArbre.length - 3][obj];
                }
            }
            tabArbre[tabArbre.length - 3].w = 0
        }
        nb = 0
        for (obj in tabArbre[tabArbre.length - 2]) {
            if (tabArbre[tabArbre.length - 2][obj].w == 0 && tabArbre[tabArbre.length - 2][obj].t > 0) {
                nb++;
            }
        }
        if (nb == 4) {
            for (obj in tabArbre[tabArbre.length - 2]) {
                if (obj != "w" && obj != "t") {
                    delete tabArbre[tabArbre.length - 2][obj];
                }
            }
            tabArbre[tabArbre.length - 2].w = 0
        }
        win += w;
        total += 1;
    }
    fruit = false;


    tabArbre = [];


    timeTotal = 0;
    arbre = MCTS;
    if (!PhaseChoix) {
        tabChoix = []
        updateMCTS();
        selectTourche = ""
    }
    fantome.blinky.choix = false;
    fantome.clyde.choix = false;
    fantome.inky.choix = false;
    fantome.pinky.choix = false;

    nextLvl();
    lvl = 1;
    life = 1;
    score = 0;
    select = "h";
}
async function updateMCTS() {
    socket.emit("updateMCTS2", JSON.stringify(MCTS))
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
    if (nbphase > tabArbre.length)
        tabEat2[Math.round(pacman.y)][Math.round(pacman.x)] = "1"
    if (tabEat[Math.round(pacman.y)][Math.round(pacman.x)] == "1") {
        tabEat[Math.round(pacman.y)][Math.round(pacman.x)] = "3"
        eat(10);
    } else if (tabEat[Math.round(pacman.y)][Math.round(pacman.x)] == "2") {
        tabEat[Math.round(pacman.y)][Math.round(pacman.x)] = "3"
        eat(50);
        bleu();
    }
    if (!PhaseChoix) {
        ctx.beginPath();
        ctx.arc(pacman.x * taille + taille / 2, pacman.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFF00";
        ctx.fill();
        ctx.closePath();
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
        GameOver();

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
    drawinfo();
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
function drawinfo() {
    if (!PhaseChoix) {
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
        ctx.font = "12px Arial";
        ctx.fillText("Total : " + total, 19 * taille, 6 * taille);
        ctx.fillText("win : " + win, 19 * taille, 7.5 * taille);
    }
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
    if (!PhaseChoix)
        for (var i = 0; i < 28; i++) {
            for (var j = 0; j < 31; j++) {

                switch (tabEat[j][i]) {
                    case '1':
                        ctx.beginPath();
                        ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                        if (tabEat3[j][i] == "0" || tabEat3[j][i] =="3")
                            ctx.fillStyle = "#111111";
                        else
                            ctx.fillStyle = "#333333";
                        ctx.fill();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.arc(i * taille + taille / 2, j * taille + taille / 2 + 8 * taille, taille / 6, 0, Math.PI * 2);
                        ctx.fillStyle = "#FFFF00";
                        ctx.fill();
                        ctx.closePath();
                        break;
                    case '2':
                        ctx.beginPath();
                        ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                        if (tabEat3[j][i] == "0" || tabEat3[j][i] =="3")
                            ctx.fillStyle = "#111111";
                        else
                            ctx.fillStyle = "#333333";
                        ctx.fill();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.arc(i * taille + taille / 2, j * taille + taille / 2 + 8 * taille, taille / 4, 0, Math.PI * 2);
                        ctx.fillStyle = "#f6f6f6";
                        ctx.fill();
                        ctx.closePath();
                        break;
                    case '3':
                        ctx.beginPath();
                        ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                        if (tabEat3[j][i] == "0" || tabEat3[j][i] =="3")
                            ctx.fillStyle = "#111111";
                        else
                            ctx.fillStyle = "#333333";
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
    if (e.key == "d" || e.key == "ArrowRight") {
        //droite();
        selectTourche = "d"

    }
    else if (e.key == "q" || e.key == "a" || e.key == "ArrowLeft") {
        //gauche();
        selectTourche = "g"

    }
    else if (e.key == "z" || e.key == "w" || e.key == "ArrowUp") {
        //haut();
        selectTourche = "h"

    }
    else if (e.key == "s" || e.key == "ArrowDown") {
        //bas();
        selectTourche = "b"

    } else if (e.key == " ") {
        pause = !pause;

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
    setInterval(function () { draw(); }, 10);
}, 1000);


/*
expension :
la pac gomme la plus proche
superposer le plus longtemps possibl
choisir le taux 'erreur optimal


en gros, on va faire que, a chaque boucle, ça continue le jeu automatique pour essiner le
chemin selon les meilleurs coups possible, on va faire que la seul if,
c'est que quan ça essine bha c'est pas en moe auto
et quan ça continue c'est autp
*/


















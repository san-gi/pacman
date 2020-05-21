var socket = io.connect('sangigi.ddns.net');
var names = [];
var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");
var fiche;
var inst = [];
var inter;
var i = 0;
var vitesse = 100;
var clé = Math.random();
var Pause = false;
socket.emit("filesRequest");
socket.on('filesPost', (files) => {
    names = files;
    console.log("files post")
    console.log(names)
    ajout();

})

socket.on('postJson', (fichierJson, retourclé) => {
    if (retourclé == clé) {


        console.log("start !")
        fiche = fichierJson;
        start();
    }
})

function start() {

    for (action in fiche) {
        inst.push(action)
    }
    try {
        inter = setInterval(function () {



            var ea = fiche[inst[i]].tabsav.split('-');
            for (var j = 0; j < ea.length; j++) {
                ea[j] = ea[j].split(",")
            }
            tabEat = ea;
            drawEat();

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
            ctx.fillText(fiche[inst[i]].score, 5 * taille, 7 * taille);
            ctx.fillText("Pac Man", 14 * taille, 5 * taille);
            ctx.fillText("LIFE : " + fiche[inst[i]].life, 5 * taille, 43 * taille);
            ctx.fillText("LVL : " + fiche[inst[i]].lvl, 24 * taille, 43 * taille);
            ctx.beginPath();
            ctx.arc(fiche[inst[i]].pacman.x * taille + taille / 2, fiche[inst[i]].pacman.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFF00";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(fiche[inst[i]].blinky.x * taille + taille / 2, fiche[inst[i]].blinky.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(fiche[inst[i]].inky.x * taille + taille / 2, fiche[inst[i]].inky.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#00FFFF";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(fiche[inst[i]].pinky.x * taille + taille / 2, fiche[inst[i]].pinky.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FF00FF";
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(fiche[inst[i]].clyde.x * taille + taille / 2, fiche[inst[i]].clyde.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FF9900";
            ctx.fill();
            ctx.closePath();
            i++;
            if (inst[i] == "score")
                clearInterval(inter);

        }, vitesse);
    } catch (e) {
        console.log(e)

        i = 0;
        inst = [];
        inter = null;


    }

}

function resetSelect() {
    clearInterval(inter);
    inst = [];
    inter = null;
    i = 0;
    start();
    Pause = false;
}
function use(name) {
    i = 0;
    clearInterval(inter);
    fiche = null;
    inst = [];
    inter = null;
    console.log(name)
    socket.emit("requestJson", name, clé);
}
function pause() {
    if (Pause) {
        clearInterval(inter);
        Pause = false
        start()
    } else {
        clearInterval(inter);
        Pause = true;
    }

}
function rapide() {
    vitesse = vitesse / 2;
    clearInterval(inter);
    start();
}
function lent() {
    vitesse = vitesse * 2;
    clearInterval(inter);
    start();
}
function ajout() {
    for (var i = 0; i < names.length; i++) {
        var n = names[i].split(".")[0];
        n = n.split("-")
        var d = new Date();
        d.setTime(n[0]);
        console.log(names[i]);
        $(".tab").html($(".tab").html() + `<tr>
            <th scope="row">${i}</th>
            <td>Work in progress</td>
            <td>${n[2]}</td>
            <td>${n[1]}</td>
            <td>${d.getHours() + ":" + d.getMinutes() + " " + d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() + " "}</td>
            <td onclick="use(names[${i}])">use</td>
            </tr>`)
    }
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
var socket = io.connect('sangigi.ddns.net');
var logs = {}
var d = new Date().getTime();
var SortieInky;
var SortieClyde

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
    document.getElementById('listFiles').style = "height:" + taille * 44 + "px; width:500px;"

    drawMap();
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
resize();


var jeuW;
var jeuH;
var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");
var taille;
var pacman = {
    x: 13.5,
    y: 17,
    vitesse: 0.08,
    direction: null,
    directionSuivante: null
}

window.onresize = function () {
    this.resize();
}

function resize() {
    var h = window.innerHeight;
    ratio = 280 / 450;
    document.getElementById('Game').width = h * (280 / 450);
    jeuW = h * (280 / 450)
    document.getElementById('Game').height = h;
    jeuH = h;
    console.log(document.getElementById('Game').offsetHeight + " " + document.getElementById('Game').offsetWidth)
    taille = jeuH / 45 - ((jeuH / 45) % 2);
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
    ["0", "6", "6", "6", "0", "0", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "7", "6", "6", "6", "0", "0", "6", "6", "6", "0"],
    ["3", "1", "5", "6", "0", "0", "6", "2", "5", "6", "2", "1", "1", "1", "1", "1", "1", "5", "6", "2", "5", "6", "0", "0", "6", "2", "1", "4"],
    ["2", "1", "4", "6", "3", "4", "6", "0", "0", "6", "3", "1", "1", "5", "2", "1", "1", "4", "6", "0", "0", "6", "3", "4", "6", "3", "1", "5"],
    ["0", "6", "6", "7", "6", "6", "6", "0", "0", "6", "6", "6", "6", "0", "0", "6", "6", "6", "6", "0", "0", "6", "6", "6", "7", "6", "6", "0"],
    ["0", "6", "2", "1", "1", "1", "1", "4", "3", "1", "1", "5", "6", "0", "0", "6", "2", "1", "1", "4", "3", "1", "1", "1", "1", "5", "6", "0"],
    ["0", "6", "3", "1", "1", "1", "1", "1", "1", "1", "1", "4", "6", "3", "4", "6", "3", "1", "1", "1", "1", "1", "1", "1", "1", "4", "6", "0"],
    ["0", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "7", "6", "6", "7", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "0"],
    ["3", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "4"]];

function draw() {
    drawMap();
    drawPacman();
}

function drawPacman() {
    if (pacman.direction == null)
        pacman.direction = pacman.directionSuivante;
    switch (pacman.direction) {
        case "droite":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7") {
                pacman.x = Math.round((pacman.x + pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.round(pacman.x * taille) % taille == 0&&tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] != "7")
                    directionPacman();
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
        case "gauche":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7") {
                pacman.x = Math.round((pacman.x - pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.round(pacman.x * taille) % taille == 0&&tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] != "7")
                    directionPacman();
            }

            else
                pacman.direction = pacman.directionSuivante
            break;
        case "haut":
            if (tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "7") {
                pacman.y = Math.round((pacman.y - pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.round(pacman.x * taille) % taille == 0&&tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] != "7")
                    directionPacman();
            }

            else
                pacman.direction = pacman.directionSuivante
            break;
        case "bas":
            if (tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "7") {
                pacman.y = Math.round((pacman.y + pacman.vitesse) * 1000) / 1000;
                if (tab[Math.round(pacman.y)][Math.round(pacman.x)] == "7" && Math.round(pacman.x * taille) % taille == 0&&tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] != "7")
                    directionPacman();
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
    }

    ctx.beginPath();
    ctx.arc(pacman.x * taille + taille / 2, pacman.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
}
function directionPacman() {
    switch (pacman.directionSuivante) {
        case "droite":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7") {
                pacman.direction = pacman.directionSuivante
            }
            break;
        case "gauche":
            if (tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || tab[Math.round(pacman.y)][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7") {
                pacman.direction = pacman.directionSuivante
            }
            break;
        case "haut":
            if (tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y - pacman.vitesse - 0.5)][Math.round(pacman.x)] == "7") {
                pacman.direction = pacman.directionSuivante
            }
            break;
        case "bas":
            if (tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "6" || tab[Math.round(pacman.y + pacman.vitesse + 0.5)][Math.round(pacman.x)] == "7") {
                pacman.direction = pacman.directionSuivante
            }
            break;
    }

}
function drawMap() {
    /*
    '0':vertical 
    '1':horizontal 
    '2':angle bas-droit 
    '3':angle droit-haut 
    '4':angle haut-gauche  
    '5':angle gauche-bas
    '6':vide
    '7'case de choix de direction pour fantome
    */
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
        if (pacman.direction == "gauche" || pacman.direction == null)
            pacman.direction = "droite";
        pacman.directionSuivante = "droite";
    }
    else if (e.key == "q" || e.key == "a") {
        if (pacman.direction == "droite" || pacman.direction == null)
            pacman.direction = "gauche";
        pacman.directionSuivante = "gauche";
    }
    else if (e.key == "z" || e.key == "w") {
        if (pacman.direction == "bas" || pacman.direction == null)
            pacman.direction = "haut";
        pacman.directionSuivante = "haut";
    }
    else if (e.key == "s") {
        if (pacman.direction == "haut" || pacman.direction == null)
            pacman.direction = "bas";
        pacman.directionSuivante = "bas";
    }
    console.log(pacman.direction + " " + pacman.directionSuivante)
}
resize();

setInterval(function () { draw(); }, 10);
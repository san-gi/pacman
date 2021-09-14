
let plateau =
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

let tabEat =
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
const canvas = document.getElementById("Game");
const ctx = canvas.getContext("2d");
/**
 * @const {Objet} - Objet contenant les paramètre actuel du jeu : pause, lvl, score...
 */
const jeu = {
    pause: false,
    bleu: false,
    timeTotal: 0,
    mode: "scatter",
}
/**
 * @var {Objet} - Objet contenant tout les paramètre de PacMan, ses position X et Y, sa vitesse, sa direction actuelle et la direction suivante qu'il empruntera
 */
let pacman = {
    x: 13.5,
    y: 23,
    vitesse: 0.07,
    direction: null,
    directionSuivante: null
}
/**
 * @var {Objet} - Objet contenant les fantomes qui ont chacun une position, une couleur, une direction et une vitesse
 */
let fantomes = {
    blinky: {
        x: 13.5,
        y: 11,
        couleur: "#FF0000",
        direction: "gauche",
        vitesse: 0.06,
    },
    pinky: {
        x: 13.5,
        y: 14,
        couleur: "#FF00FF",
        direction: "gauche",
        vitesse: 0.06,
    },
    inky: {
        x: 11.5,
        y: 14,
        couleur: "#00FFFF",
        direction: "gauche",
        vitesse: 0.06,
    },
    clyde: {
        x: 15.5,
        y: 14,
        couleur: "#FF9900",
        direction: "gauche",
        vitesse: 0.06,
    }
}
let Bchoix = 0;
let Pchoix = 0;
let Cchoix = 0;
let Ichoix = 0;

/**
 * Redimensionne le plateau Pacman en fonction de la page actuel
 */
function resize() {
    const h = window.innerHeight;
    const jeuH = h - 50;
    taille = jeuH / 45 - ((jeuH / 45) % 2);
    document.getElementById('Game').width = taille * 28;
    document.getElementById('Game').height = taille * 44;
    drawMap(plateau);
}
/**
 * appelle resize au redimensionnement de la page
 */
window.onresize = function () {
    this.resize();
}
/**
 * Dessine la structure de la map
 * 
 * @param {string[][]} plateau - Tableau a 2 dimmension stockant la map
 */
function drawMap(plateau) {
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 31; j++) {
            switch (plateau[j][i]) {
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
                default: //vide
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
/**
 * Dessine les pac gomme,cela permet égallement 
 * d'actualiser les zone sur lequel pac man et les
 * fantome sont passer afin de ne pas avoir une 
 * "trainer" dérière eux        
 * 
 * @param {string[][]} tabEat - Tableau a 2 dimmension stockant les pac gomme
 */
function drawEat(tabEat) {
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 31; j++) {

            switch (tabEat[j][i]) {
                case '1': // pac gomme normal
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
                case '2': // super pac gomme
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
                case '3': //emplacement vide
                    ctx.beginPath();
                    ctx.rect(i * taille - taille / 4, j * taille + 8 * taille - taille / 4, taille * 1.5, taille * 1.5);
                    ctx.fillStyle = "#111111";
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
        }
    }
}
/**
 * déplacement de pacman
 */
function movePacman() {
    //si pacman prend le tunnel vers la gauche, le fait passer a droite 
    if (pacman.x <= pacman.vitesse)
        pacman.x = 27 - pacman.vitesse;
    //sinon, si pacman prend le tunnel vers la droite, le fait passer a gauche
    else if (pacman.x >= 27 - pacman.vitesse)
        pacman.x = 0 + pacman.vitesse;
    let Px = Math.round(pacman.x)
    let Py = Math.round(pacman.y)

    /** Dans le cas de chaque direction possible que prend PacMan, "6" rpresente un chemin, 
     *  "7" represente une intersection
     *  +0.5 parce que la position est le centre de la case
     *  Seulement si nous somme au plus prés du centre d'une case d'une intersection, 
     *  on choisis la nouvelle direction
     *  si la suite du chemin n'est pas disponible, nous somme devans un mur et changeons de direction
     */
    switch (pacman.direction) {
        case "droite":
            if (plateau[Py][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || plateau[Py][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7") {
                pacman.x = Math.round((pacman.x + pacman.vitesse) * 1000) / 1000;
                Px = Math.round(pacman.x)
                if (plateau[Py][Px] == "7" && Math.abs(pacman.x % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman(Py, Px);
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
        case "gauche":
            if (plateau[Py][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || plateau[Py][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7") {
                pacman.x = Math.round((pacman.x - pacman.vitesse) * 1000) / 1000;
                Px = Math.round(pacman.x)
                if (plateau[Py][Px] == "7" && Math.abs(pacman.x % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman(Py, Px);
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
        case "haut":
            if (plateau[Math.round(pacman.y - pacman.vitesse - 0.5)][Px] == "6" || plateau[Math.round(pacman.y - pacman.vitesse - 0.5)][Px] == "7") {
                pacman.y = Math.round((pacman.y - pacman.vitesse) * 1000) / 1000;
                Py = Math.round(pacman.y)
                if (plateau[Py][Px] == "7" && Math.abs(pacman.y % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman(Py, Px);
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
        case "bas":
            if (plateau[Math.round(pacman.y + pacman.vitesse + 0.5)][Px] == "6" || plateau[Math.round(pacman.y + pacman.vitesse + 0.5)][Px] == "7") {
                pacman.y = Math.round((pacman.y + pacman.vitesse) * 1000) / 1000;
                Py = Math.round(pacman.y)
                if (plateau[Py][Px] == "7" && Math.abs(pacman.y % 1) - pacman.vitesse <= pacman.vitesse / 2)
                    directionPacman(Py, Px);
            }
            else
                pacman.direction = pacman.directionSuivante
            break;
    }
}
/**
 * verifie la posibilité de la nouvelle direction avant de la prendre 
 *
 * @param {Number} Py - position x entière de PacMan
 * @param {Number} Px - position y entière de PacMan
 */
function directionPacman(Py, Px) {
    switch (pacman.directionSuivante) {
        case "droite":
            if (plateau[Py][Math.round(pacman.x + pacman.vitesse + 0.5)] == "6" || plateau[Py][Math.round(pacman.x + pacman.vitesse + 0.5)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "gauche":
            if (plateau[Py][Math.round(pacman.x - pacman.vitesse - 0.5)] == "6" || plateau[Py][Math.round(pacman.x - pacman.vitesse - 0.5)] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "haut":
            if (plateau[Math.round(pacman.y - pacman.vitesse - 0.5)][Px] == "6" || plateau[Math.round(pacman.y - pacman.vitesse - 0.5)][Px] == "7")
                pacman.direction = pacman.directionSuivante
            break;
        case "bas":
            if (plateau[Math.round(pacman.y + pacman.vitesse + 0.5)][Px] == "6" || plateau[Math.round(pacman.y + pacman.vitesse + 0.5)][Px] == "7")
                pacman.direction = pacman.directionSuivante
            break;
    }
}
/**
 * Dessine PacMan
 * 
 * @param {Objet} pacman - Objet PacMan
 * @param {Number} taille - Dimension d'une case du plateau
 */
function drawPacman(pacman, taille) {
    ctx.beginPath();
    ctx.arc(pacman.x * taille + taille / 2, pacman.y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
}

function moveFantomes(fantome) {
    for (f in fantome) {
        //si le fantome prend le tunnel vers la gauche, le fait passer a droite 
        if (fantomes[f].x <= fantomes[f].vitesse)
            fantomes[f].x = 27 - fantomes[f].vitesse;
        //sinon, si pacman prend le tunnel vers la droite, le fait passer a gauche
        else if (fantomes[f].x >= 27 - fantomes[f].vitesse)
            fantomes[f].x = 0 + fantomes[f].vitesse;
       /** Dans le cas de chaque direction possible que prend le fantome, "6" rpresente un chemin, 
        *  "7" represente une intersection
        *  +0.5 parce que la position est le centre de la case
        *  Seulement si nous somme au plus prés du centre d'une case d'une intersection, 
        *  on choisis la nouvelle direction
        *  si la suite du chemin n'est pas disponible, nous somme devans un mur et changeons de direction
        */
        switch (fantomes[f].direction) {
            case "droite":
                if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x + fantomes[f].vitesse + 0.5)] == "6" || plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x + fantomes[f].vitesse + 0.5)] == "7") {
                    fantomes[f].x = Math.round((fantomes[f].x + fantomes[f].vitesse) * 1000) / 1000;
                    if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x)] == "7" && Math.abs(fantomes[f].x % 1) - fantomes[f].vitesse <= fantomes[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);

                break;
            case "gauche":
                if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x - fantomes[f].vitesse - 0.5)] == "6" || plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x - fantomes[f].vitesse - 0.5)] == "7") {
                    fantomes[f].x = Math.round((fantomes[f].x - fantomes[f].vitesse) * 1000) / 1000;
                    if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x)] == "7" && Math.abs(fantomes[f].x % 1) - fantomes[f].vitesse <= fantomes[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
            case "haut":
                if (plateau[Math.round(fantomes[f].y - fantomes[f].vitesse - 0.5)][Math.round(fantomes[f].x)] == "6" || plateau[Math.round(fantomes[f].y - fantomes[f].vitesse - 0.5)][Math.round(fantomes[f].x)] == "7") {
                    fantomes[f].y = Math.round((fantomes[f].y - fantomes[f].vitesse) * 1000) / 1000;
                    if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x)] == "7" && Math.abs(fantomes[f].y % 1) - fantomes[f].vitesse <= fantomes[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
            case "bas":
                if (plateau[Math.round(fantomes[f].y + fantomes[f].vitesse + 0.5)][Math.round(fantomes[f].x)] == "6" || plateau[Math.round(fantomes[f].y + fantomes[f].vitesse + 0.5)][Math.round(fantomes[f].x)] == "7") {
                    fantomes[f].y = Math.round((fantomes[f].y + fantomes[f].vitesse) * 1000) / 1000;
                    if (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x)] == "7" && Math.abs(fantomes[f].y % 1) - fantomes[f].vitesse <= fantomes[f].vitesse / 2)
                        choixDirection(f);
                } else
                    choixDirection(f);
                break;
        }
    }
}
/**
 * 
 * @param {string} name - nom du fantome
 */
function choixDirection(name) {
    switch (name) {
        case "blinky":
            Bchoix = jeu.timeTotal;
            if (jeu.mode == "chasse")
                cible = [Math.round(pacman.x), Math.round(pacman.y)];
            else if (jeu.mode == "scatter")
                cible = [26, -2];
            break;
        case "pinky":
            Pchoix = jeu.timeTotal;
            if (jeu.mode == "chasse") {
                cible = [Math.round(pacman.x), Math.round(pacman.y)];
                if (pacman.direction == "gauche") cible[0] -= 4;
                else if (pacman.direction == "droite") cible[0] += 4;
                else if (pacman.direction == "haut") cible[1] -= 4;
                else if (pacman.direction == "bas") cible[1] += 4;
            } else if (jeu.mode == "scatter")
                cible = [6, -2];
            break;
        case "inky":
            Ichoix = jeu.timeTotal;
            if (jeu.mode == "chasse") {
                cible = [Math.round(pacman.x), Math.round(pacman.y)];
                if (pacman.direction == "gauche") cible[0] -= 2;
                else if (pacman.direction == "droite") cible[0] += 2;
                else if (pacman.direction == "haut") cible[1] -= 2;
                else if (pacman.direction == "bas") cible[1] += 2;

                cible[0] += (Math.floor(cible[0] - fantomes.blinky.x))
                cible[1] += (Math.floor(cible[1] - fantomes.blinky.y))
            } else if (jeu.mode == "scatter")
                cible = [28, 33];
            break;
        case "clyde":
            Cchoix = jeu.timeTotal;
            if (jeu.mode == "chasse") {
                cible = [Math.round(pacman.x), Math.round(pacman.y)];
                if (Math.abs(Math.floor(fantomes[name].x) - cible[0]) + Math.abs(Math.floor(fantomes[name].y) - cible[1]) < 8)
                    cible = [0, 33 + 8];
            } else if (jeu.mode == "scatter")
                cible = [0, 33];
            break;
    }
    let max = 2000;
    let dir = "nop"
    const distanceD = Math.sqrt((Math.round(fantomes[name].x) - cible[0] + 1) ** 2 + Math.round((fantomes[name].y) - cible[1]) ** 2)
    const distanceG = Math.sqrt((Math.round(fantomes[name].x) - cible[0] - 1) ** 2 + Math.round((fantomes[name].y) - cible[1]) ** 2)
    const distanceH = Math.sqrt((Math.round(fantomes[name].x) - cible[0]) ** 2 + Math.round((fantomes[name].y) - cible[1] - 1) ** 2)
    const distanceB = Math.sqrt((Math.round(fantomes[name].x) - cible[0]) ** 2 + Math.round((fantomes[name].y) - cible[1] + 1) ** 2)
    if (distanceD <= max && fantomes[name].direction != "gauche" && (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x + 1)] == "6" || plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x + fantomes[f].vitesse + 0.5)] == "7")) {
        dir = "droite";
        max = distanceD
    }
    if (distanceH <= max && fantomes[name].direction != "bas" && (plateau[Math.round(fantomes[f].y - 1)][Math.round(fantomes[f].x)] == "6" || plateau[Math.round(fantomes[f].y - fantomes[f].vitesse - 0.5)][Math.round(fantomes[f].x)] == "7")) {
        dir = "haut";
        max = distanceH;
    }
    if (distanceG <= max && fantomes[name].direction != "droite" && (plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x - 1)] == "6" || plateau[Math.round(fantomes[f].y)][Math.round(fantomes[f].x - fantomes[f].vitesse - 0.5)] == "7")) {
        dir = "gauche";
        max = distanceG;
    }
    if (distanceB <= max && fantomes[name].direction != "haut" && (plateau[Math.round(fantomes[f].y + 1)][Math.round(fantomes[f].x)] == "6" || plateau[Math.round(fantomes[f].y + fantomes[f].vitesse + 0.5)][Math.round(fantomes[f].x)] == "7")) {
        dir = "bas";
        max = distanceB;
    }
    fantomes[name].direction = dir;
}
function drawFantomes(fantomes) {
    for (f in fantomes) {
        ctx.beginPath();
        ctx.arc(fantomes[f].x * taille + taille / 2, fantomes[f].y * taille + taille / 2 + 8 * taille, taille / 1.8, 0, Math.PI * 2);
        if (!jeu.bleu)
            ctx.fillStyle = fantomes[f].couleur;
        else
            ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.closePath();
    }
}
function draw() {
    //si le jeu n'est pas en pause
    if (!jeu.pause) {
        drawEat(tabEat);
        movePacman()
        drawPacman(pacman, taille);
        moveFantomes(fantomes)
        drawFantomes(fantomes)
    }
}

document.addEventListener("keydown", keyDownHandler, false);
/**
 * évenement Keydown
 * 
 * @param {key} e - touche du clavier. e.key = string de la touche
 */
function keyDownHandler(e) {

    if (e.key == "d" || e.key == "ArrowRight") {
        droite()
    }
    else if (e.key == "q" || e.key == "a" || e.key == "ArrowLeft") {
        gauche()
    }
    else if (e.key == "z" || e.key == "w" || e.key == "ArrowUp") {
        haut()
    }
    else if (e.key == "s" || e.key == "ArrowDown") {
        bas()

    } else if (e.key == " ") {
        jeu.pause = !jeu.pause;

    }
}

/**
 * décision aller a droite
 */
function droite() {
    if (pacman.direction == "gauche" || pacman.direction == null)
        pacman.direction = "droite";
    pacman.directionSuivante = "droite";
}
/**
 * décision aller a gauche
 */
function gauche() {
    if (pacman.direction == "droite" || pacman.direction == null)
        pacman.direction = "gauche";
    pacman.directionSuivante = "gauche";
}
/**
 * décision aller en haut
 */
function haut() {
    if (pacman.direction == "bas" || pacman.direction == null)
        pacman.direction = "haut";
    pacman.directionSuivante = "haut";
}
/**
 * décision aller en bas
 */
function bas() {
    if (pacman.direction == "haut" || pacman.direction == null)
        pacman.direction = "bas";
    pacman.directionSuivante = "bas";
}



















resize()
/**
 * après une seconde le jeu se lance, en créant un interval de 10 ms pour la fonction draw
 */
setTimeout(() => {
    setInterval(function () { draw(); }, 10);
}, 1000);
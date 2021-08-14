var canvas = document.getElementById("my-canvas");
const maxWidth = 600;
const maxheight = 400;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let widePadding = (window.innerWidth - maxWidth) / 2;
let highPadding = (window.innerHeight - maxheight) / 2;

//fundamental elements

tree = [];

var balloonX;
var balloonY;

var heating;

var verticalPosition;
var horizontalPosition;

var gameStarted;

var negate; //for removing trees that are crossed already

var hit = false;



//to draw at correct position

function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();

    ctx.translate(widePadding - balloonX, highPadding + maxheight);
    //referrence lines

    // //Y
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(0, -500);
    // ctx.stroke();

    // //X
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(500, 0);
    // ctx.stroke();

    drawBalloon();

    generateTrees();

    drawTrees();


    ctx.restore();
}
draw();


//drawing balloon
function drawBalloon() {

    ctx.save();
    ctx.translate(balloonX, balloonY);


    //upper rect
    ctx.fillStyle = "#4a55a8";
    ctx.beginPath();
    ctx.rect(-70, -90, 140, 20);
    ctx.fill();

    //lower rect
    ctx.fillStyle = "#091ebd";
    ctx.beginPath();
    ctx.rect(-70, -70, 140, 70);
    ctx.fill();

    //left string
    ctx.beginPath();
    ctx.strokeStyle = "#fc3003";
    ctx.moveTo(-50, -90);
    ctx.lineTo(-50, -180);
    ctx.stroke();

    //right string
    ctx.beginPath();
    ctx.strokeStyle = "#fc3003";
    ctx.moveTo(50, -90);
    ctx.lineTo(50, -180);
    ctx.stroke();

    //balloon
    ctx.beginPath();
    ctx.fillStyle = "#fc3003";
    ctx.moveTo(-50, -180);

    ctx.quadraticCurveTo(-90, -230, -90, -330);
    ctx.arc(0, -330, 90, Math.PI, 0, false);

    ctx.quadraticCurveTo(90, -230, 50, -180);
    ctx.fill();

    ctx.restore();
}

//drawing trees

function generateTrees() {

    var minDist = 100;
    var maxDist = 400;

    //random position
    var x = tree.length ? tree[tree.length - 1].x + minDist + Math.random() * (maxDist - minDist) : 200;




    var height = 100 + Math.random() * 40;

    //radii
    const r1 = 30 + Math.random() * 20;
    const r2 = 30 + Math.random() * 20;
    const r3 = 30 + Math.random() * 20;
    const r4 = 30 + Math.random() * 20;
    const r5 = 30 + Math.random() * 20;
    const r6 = 30 + Math.random() * 20;
    const r7 = 30 + Math.random() * 20;

    //colors
    var treeColors = ["#009933", "#00e600", "#33cc33"];
    var colors = treeColors[Math.floor(Math.random() * treeColors.length)];

    tree.push({ x, height, r1, r2, r3, r4, r5, r6, r7, colors });
}

//todo: 0 to be replaced by x

function drawTrees() {
    tree.forEach(({ x, height, r1, r2, r3, r4, r5, r6, r7, colors }) => {

        ctx.save();
        ctx.translate(x, 0);

        // //Y
        // ctx.beginPath();
        // ctx.moveTo(x, 0);
        // ctx.lineTo(x, -2 * height);
        // ctx.stroke();

        // //X
        // ctx.beginPath();
        // ctx.moveTo(x, 0);
        // ctx.lineTo(x + 50, 0);
        // ctx.stroke();

        const trunkWidth = 90;
        //drawing trunk
        ctx.fillStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.quadraticCurveTo(x + height / 2, -height / 2, x, -height);
        ctx.lineTo(x + trunkWidth, -height);
        ctx.quadraticCurveTo(x + (height / 2) - (height / 11), (-height / 2) + (-height / 8), x + trunkWidth, 0);
        ctx.closePath();
        ctx.fill();

        //drawing crown
        ctx.fillStyle = colors;
        ctx.moveTo(x, -height);
        drawCircle(x + trunkWidth - 90, -(height + height / 6), r1, );
        drawCircle(x + trunkWidth - 80, -(height + height / 10) - 30, r2, );
        drawCircle(x + trunkWidth - 50, -(height + height / 8) - 60, r3, );
        drawCircle(x + trunkWidth - 30, -(height + height / 9) - 50, r4, );
        drawCircle(x + trunkWidth - 10, -(height + height / 10) - 30, r5, );
        drawCircle(x + trunkWidth, -(height + height / 10) - 12, r6, );
        drawCircle(x + trunkWidth - 50, -(height + height / 4) - 10, r7, );


        ctx.restore();
    });
}

function drawCircle(cpx, cpy, r) {

    ctx.beginPath();
    ctx.arc(cpx, cpy, r, 0, 2 * Math.PI, true);
    ctx.fill();
}

//real game starts 

function restore_state() {
    balloonX = 0;
    balloonY = 0;

    gameStarted = false;
    heating = false;

    verticalPosition = 5;
    horizontalPosition = 5;

    trees = [];
    for (let i = 0; i < 10; i++) {
        generateTrees();
    }
    draw();
}
restore_state();

window.addEventListener("mousedown", () => {

    heating = true;
    if (!gameStarted) {
        gameStarted = true;
        window.requestAnimationFrame(animate);
    }
});

window.addEventListener("mouseup", () => {
    heating = false;
});



function animate() {

    if (heating) {
        verticalPosition -= 1;
    } else if (verticalPosition < 5) {
        verticalPosition += 0.5;
    }

    balloonY += verticalPosition;
    if (balloonY > 0) { balloonY = 0; }

    if (balloonY < 0) { balloonX += horizontalPosition; }

    negate += 300
    if (tree[0].x - (balloonX - widePadding) < -negate) {
        tree.shift();
        generateTrees();
    }

    draw();
    hit = hitDetection();
    if (hit) { return; }

    window.requestAnimationFrame(animate);
}

function hitDetection() {

    //for out of canvas hit
    if (balloonY < -((canvas.height / 2) + highPadding)) { return true; }

    //for balloon
    const leftLowerPoint = { x: balloonX - 70, y: balloonY };
    const rightLowerPoint = { x: balloonX + 70, y: balloonY };
    const leftUpperPoint = { x: balloonX - 70, y: balloonY - 90 };
    const rightUpperPoint = { x: balloonX + 70, y: balloonY - 90 };

    //point cross hit detection
    for (const { x, height, r1, r2, r3, r4, r5 }
        of tree) {

        const trunkWidth = 90;
        const treeBottomLeft = { x: x + trunkWidth + 90, y: -(height + height / 6) }
        const treeMidLeft = { x: x + trunkWidth - 80, y: -(height + height / 10) - 30 }
        const treeTopLeft = { x: x + trunkWidth - 50, y: -(height + height / 8) - 60 }
        const treeTop = { x: x + trunkWidth - 30, y: -(height + height / 9) - 50 }
        const treeTopRight = { x: x + trunkWidth - 10, y: -(height + height / 10) - 30 }


        if (getDistance(treeBottomLeft, rightLowerPoint) < r1) { return true; }
        if (getDistance(treeBottomLeft, rightUpperPoint) < r1) { return true; }

        if (getDistance(treeMidLeft, rightUpperPoint) < r2) { return true; }
        if (getDistance(treeMidLeft, rightLowerPoint) < r2) { return true; }

        if (getDistance(treeTopLeft, rightUpperPoint) < r3) { return true; }
        if (getDistance(treeTopLeft, rightLowerPoint) < r3) { return true; }

        if (getDistance(treeTop, rightUpperPoint) < r4) { return true; }
        if (getDistance(treeTop, rightLowerPoint) < r4) { return true; }
        if (getDistance(treeTop, leftUpperPoint) < r4) { return true; }
        if (getDistance(treeTop, leftLowerPoint) < r4) { return true; }

        if (getDistance(treeTopRight, leftLowerPoint) < r5) { return true; }
        if (getDistance(treeTopRight, leftLowerPoint) < r5) { return true; }

    }

}

function getDistance(point1, point2) {
    var d = Math.sqrt((((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2)));
    return d;
}
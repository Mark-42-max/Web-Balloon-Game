var canvas = document.getElementById("my-canvas");
const maxWidth = 600;
const maxheight = 400;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

tree = [];


let widePadding = (window.innerWidth - maxWidth) / 2;
let highPadding = (window.innerHeight - maxheight) / 2;

function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();

    ctx.translate(widePadding, highPadding + maxheight);
    //referrence lines

    //Y
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -500);
    ctx.stroke();

    //X
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(500, 0);
    ctx.stroke();

    // drawBalloon();

    generateTrees();
    drawTrees();


    ctx.restore();
}
draw();


//drawing balloon
function drawBalloon() {

    //upper rect
    ctx.fillStyle = "#4a55a8";
    ctx.beginPath();
    ctx.rect(-70, -10, 140, 20);
    ctx.fill();

    //lower rect
    ctx.fillStyle = "#091ebd";
    ctx.beginPath();
    ctx.rect(-70, 10, 140, 70);
    ctx.fill();

    //left string
    ctx.beginPath();
    ctx.strokeStyle = "#fc3003";
    ctx.moveTo(-50, -10);
    ctx.lineTo(-50, -100);
    ctx.stroke();

    //right string
    ctx.beginPath();
    ctx.strokeStyle = "#fc3003";
    ctx.moveTo(50, -10);
    ctx.lineTo(50, -100);
    ctx.stroke();

    //balloon
    ctx.beginPath();
    ctx.fillStyle = "#fc3003";
    ctx.moveTo(-50, -100);

    ctx.quadraticCurveTo(-90, -150, -90, -250);
    ctx.arc(0, -250, 90, Math.PI, 0, false);

    ctx.quadraticCurveTo(90, -150, 50, -100);
    ctx.fill();
}

//drawing trees

function generateTrees() {

    var minDist = 0;
    var maxDist = 600;

    //random position
    var x = tree.length ? tree[tree.length - 1].x + minDist + Math.random() * (maxDist - minDist) : 400;




    var height = 100 + Math.random() * 20;

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
    });
}

function drawCircle(cpx, cpy, r) {

    ctx.beginPath();
    ctx.arc(cpx, cpy, r, 0, 2 * Math.PI, true);
    ctx.fill();
}


















































// function setup() {
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;

//     var minimumWidth = 40;
//     var minimumHeight = 40;

//     let widthPadding = (window.innerWidth - minimumWidth) / 2;
//     let heightPadding = (window.innerWidth - minimumHeight) / 2;

//     draw();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.save();
//     ctx.translate(widthPadding, heightPadding);
//     ctx.restore();
// }

// setup();
// ctx.lineTo(30, 30);
// ctx.stroke();



// //full balloon setup

// //balloon
// ctx.strokeStyle = "#fc3003";
// ctx.fillStyle = "#fc3003"

// //cp = 200,260 ep = 200,200
// ctx.moveTo(230, 300);
// ctx.quadraticCurveTo(200, 260, 200, 200);


// //center = 300,200 radius = 100 
// ctx.arc(300, 200, 100, Math.PI, 0, false);


// //cp = 400,260 ep = 370,300
// ctx.quadraticCurveTo(400, 260, 370, 300);
// ctx.stroke();
// ctx.fill();

// //holding string

// //left 
// ctx.strokeStyle = "#fc3003";
// ctx.moveTo(230, 400);
// ctx.lineTo(230, 300);
// ctx.stroke();

// //right
// ctx.strokeStyle = "#fc3003";
// ctx.moveTo(370, 400);
// ctx.lineTo(370, 300);
// ctx.stroke();


// //Lower box

// //up
// ctx.strokeStyle = "#4a55a8";
// ctx.fillStyle = "#4a55a8"
// ctx.beginPath();
// ctx.rect(200, 400, 200, 50);
// ctx.stroke();
// ctx.fill();


// //down
// ctx.strokeStyle = "#091ebd";
// ctx.fillStyle = "#091ebd";
// ctx.beginPath();
// ctx.rect(200, 450, 200, 100);
// ctx.stroke();
// ctx.fill();



// //tree variation

// var trees = [];

// function generateTrees() {

//     //height
//     var h = 200 + Math.random() * 200 + 300;
//     const trunkWidth = 300;

//     //radii
//     var r1 = 60 + Math.random() * 20;
//     var r2 = 60 + Math.random() * 20;
//     var r3 = 60 + Math.random() * 20;
//     var r4 = 60 + Math.random() * 20;
//     var r5 = 60 + Math.random() * 20;
//     var r6 = 60 + Math.random() * 20;
//     var r7 = 60 + Math.random() * 20;

//     //colors
//     var colors = ["#009933", "#00e600", "#33cc33"];
//     var treeColors = colors[Math.floor(Math.random() * colors.length)];

//     trees.push({ h, trunkWidth, r1, r2, r3, r4, r5, r6, r7, treeColors });

// }

// generateTrees();

// function drawCircle(cx, cy, radius) {
//     ctx.beginPath();
//     ctx.arc(cx, cy, radius, 0, 2 * Math.PI, true);
//     ctx.fill();
// }

// function drawTrees() {

//     trees.forEach(({ h, trunkWidth, r1, r2, r3, r4, r5, r6, r7, treeColors }) => {

//         //for trunk

//         ctx.fillStyle = "#800000";
//         ctx.beginPath();
//         ctx.moveTo(trunkWidth, 500);
//         ctx.quadraticCurveTo(trunkWidth * 1.2, h / 2, trunkWidth, h / 3);
//         ctx.lineTo(trunkWidth * 1.5, h / 3);
//         ctx.quadraticCurveTo(trunkWidth * 1.3, h / 2, trunkWidth * 1.5, 500);
//         ctx.stroke();
//         ctx.fill();

//         //for crown
//         ctx.fillStyle = treeColors;
//         ctx.moveTo(trunkWidth, h / 3);
//         drawCircle(trunkWidth, h / 3, r1);
//         drawCircle(trunkWidth + 30, h / 3 - 30, r2);
//         drawCircle(trunkWidth + 50, h / 3 - 50, r3);
//         drawCircle(trunkWidth + 70, h / 3 - 70, r4);
//         drawCircle(trunkWidth + 90, h / 3 - 50, r5);
//         drawCircle(trunkWidth + 120, h / 3 - 30, r6);
//         drawCircle(trunkWidth + 150, h / 3 - 10, r7);
//     });
// }
// drawTrees();
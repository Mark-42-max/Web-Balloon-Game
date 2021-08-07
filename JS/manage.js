var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

function setup() {
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
}

setup();



//full balloon setup

//balloon
ctx.strokeStyle = "#fc3003";
ctx.fillStyle = "#fc3003"

//cp = 200,260 ep = 200,200
ctx.moveTo(230, 300);
ctx.quadraticCurveTo(200, 260, 200, 200);


//center = 300,200 radius = 100 
ctx.arc(300, 200, 100, Math.PI, 0, false);


//cp = 400,260 ep = 370,300
ctx.quadraticCurveTo(400, 260, 370, 300);
ctx.stroke();
ctx.fill();

//holding string

//left 
ctx.strokeStyle = "#fc3003";
ctx.moveTo(230, 400);
ctx.lineTo(230, 300);
ctx.stroke();

//right
ctx.strokeStyle = "#fc3003";
ctx.moveTo(370, 400);
ctx.lineTo(370, 300);
ctx.stroke();


//Lower box

//up
ctx.strokeStyle = "#4a55a8";
ctx.fillStyle = "#4a55a8"
ctx.beginPath();
ctx.rect(200, 400, 200, 50);
ctx.stroke();
ctx.fill();


//down
ctx.strokeStyle = "#091ebd";
ctx.fillStyle = "#091ebd";
ctx.beginPath();
ctx.rect(200, 450, 200, 100);
ctx.stroke();
ctx.fill();



//tree variation

var trees = [];

function generateTrees() {

    //height
    var h = 200 + Math.random() * 200 + 300;
    const trunkWidth = 300;

    //radii
    var r1 = 60 + Math.random() * 20;
    var r2 = 60 + Math.random() * 20;
    var r3 = 60 + Math.random() * 20;
    var r4 = 60 + Math.random() * 20;
    var r5 = 60 + Math.random() * 20;
    var r6 = 60 + Math.random() * 20;
    var r7 = 60 + Math.random() * 20;

    //colors
    var colors = ["#009933", "#00e600", "#33cc33"];
    var treeColors = colors[Math.floor(Math.random() * colors.length)];

    trees.push({ h, trunkWidth, r1, r2, r3, r4, r5, r6, r7, treeColors });

}

generateTrees();

function drawCircle(cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function drawTrees() {

    trees.forEach(({ h, trunkWidth, r1, r2, r3, r4, r5, r6, r7, treeColors }) => {

        //for trunk

        ctx.fillStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(trunkWidth, 500);
        ctx.quadraticCurveTo(trunkWidth * 1.2, h / 2, trunkWidth, h / 3);
        ctx.lineTo(trunkWidth * 1.5, h / 3);
        ctx.quadraticCurveTo(trunkWidth * 1.3, h / 2, trunkWidth * 1.5, 500);
        ctx.stroke();
        ctx.fill();

        //for crown
        ctx.fillStyle = treeColors;
        ctx.moveTo(trunkWidth, h / 3);
        drawCircle(trunkWidth, h / 3, r1);
        drawCircle(trunkWidth + 30, h / 3 - 30, r2);
        drawCircle(trunkWidth + 50, h / 3 - 50, r3);
        drawCircle(trunkWidth + 70, h / 3 - 70, r4);
        drawCircle(trunkWidth + 90, h / 3 - 50, r5);
        drawCircle(trunkWidth + 120, h / 3 - 30, r6);
        drawCircle(trunkWidth + 150, h / 3 - 10, r7);
    });
}
drawTrees();
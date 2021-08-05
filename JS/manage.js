var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

function setup() {
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
}

setup();

//full balloon setup

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

//draw box

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
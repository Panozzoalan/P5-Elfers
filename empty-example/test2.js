var num = 0;
var vueltas = 3.33333;
var flash = 3.35;

function setup(){
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	frameRate(300);
	angleMode(DEGREES);
}

function draw(){
	background(100);
	
	var x = 100 * cos(vueltas*360);
	var y = 100 * sin(vueltas*360);

	textSize(30);
	if (vueltas % 360 == 0){
		text(vueltas,10,50,10);
	}
	translate(width/2,height/2);
	strokeWeight(4);
	line(0,0,x,y);


	vueltas += 3.33333;
}
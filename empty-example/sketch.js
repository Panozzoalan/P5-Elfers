var a;
var ball;

function setup() {
	createCanvas(800,500);
	a = new Man();
	ball = new Ball();
}

function draw() {
	background(100);
	a.show();
	a.move();
	
	ball.update();
	ball.show();
}

function keyPressed(){
	if (keyCode === RIGHT_ARROW) {
		a.setDir(1);
	} else if(keyCode === LEFT_ARROW) {
		a.setDir(-1);
	} else if (keyCode === LEFT_ARROW && keyCode === RIGHT_ARROW){
		a.setDir(0);
	}
}
/*
function keyReleased(){
	if (key === LEFT_ARROW && key === RIGHT_ARROW){
		a.setDir(0);
	}
}
*/
function Man(){
	var size = 80;
	this.x = 100;
	this.xdir = 0

	this.setDir = function(dir){
		this.xdir = dir;
	}

	this.move = function(dir){
		this.x += this.xdir*5;
	}

	this.show = function(){
		fill(0);
		ellipse(this.x, height-size/2, size, size);
	}
}

function Ball(){
	var size = 40;
	this.x = width/2;
	this.y = height/2;
	this.yspeed = 5

	this.update = function(){
		if (this.y < height){
			this.y += this.yspeed;
		}
	}

	this.show = function(){
		fill(255);
		ellipse(this.x,this.y,size,size);
	}
}
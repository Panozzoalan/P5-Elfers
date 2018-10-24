var earth;
var moon;
var a = 0;
function setup() {
	var canvas = createCanvas(800,500);
	canvas.parent('moon');
	earth = new Planet();
	moon = new Moon();
}

function draw() {
	background(0);
	stroke(255);
	line(earth.x, earth.y, moon.x, moon.y);
	earth.show();
	moon.show(a);
	a = a + 0.001;
}

function Planet(){
	this.x = width/2;
	this.y = height/2;


	this.show = function(){
		noStroke()
		fill(100,255,100);
		ellipse(this.x, this.y,100,100);
	}
}

function Moon(){
	this.x = 0;
	this.y = 0;
	this.r = 300;


	this.show = function(num){
		this.x = this.r * cos(a) + width/2;
		this.y = this.r * sin(a) + height/2;
		noStroke()
		fill(255);
		ellipse(this.x,this.y,50,50);
	}
}
var drop = [];

function setup(){
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	for (var i = 0; i < 200; i++) {
		drop[i] = new Water();
	}
}

function draw() {
	background(100,0,100);
	for (var i = 0; i < 200; i++){
		drop[i].update();
		drop[i].show();
	}
}

function Water(){
	this.z = random(1,5);
	this.x = random(0,800);
	this.y = random(0,-100);
	this.speed = random(0.1,4);
	this.len = 5;

	this.update = function() {
		this.speed = this.speed + 0.05;
		this.y += this.speed;
		this.len = this.len + 0.1;

		if (this.y > height) {
			this.y = random(-100,-200);
			this.speed = random(0.1,4);
			this.len = 5;
		}
	}

	this.show = function(){
		noStroke();
		fill(100,100,255);
		rect(this.x,this.y,2,this.len);
	}
}
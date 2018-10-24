function Bird() {
	this.h = 50;
	this.x = 100;
	this.y = height/2;
	this.floor = height-20;
	this.speed = 0;
	this.variant = 0.1;
	
	this.jump = function() {
		this.speed = this.speed -3;
	}

	this.update = function() {
		this.speed += this.variant;
		this.y += this.speed;
	}

	this.show = function() {
		fill(100);
		rect(this.x, this.y, 10, this.h);
	}
}

function Wall(){
	// Anchura de la pared
	this.th = 50

	// Paredes o lados
	this.left = width;
	this.right = this.left + this.th;
	this.top = 0;
	this.bottom = height;

	// Abertura
	this.gap = 100;
	this.uppergap = random(100,300);
	this.lowergap = this.uppergap + this.gap;

	this.speed = -3;

	this.move = function() {
		this.left += this.speed;
	}

	this.show = function() {
		fill(255,255,0);
		rect(this.left, this.top, this.th, this.uppergap);
		rect(this.left, this.lowergap, this.th, this.bottom);
	}
}
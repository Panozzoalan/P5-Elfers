var cubo = [];
var cuboP;

function setup(){
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	cuboP = new Cubo(0,0,20);
	for (var i = 0; i < 7; i++){
		cubo[i] = new Cubo(random(width-100),random(height-100),100);
	}

}


function draw(){
	background(100);
	var moveUp = 0;
	var moveDown = 0;
	var moveLeft = 0;
	var moveRight = 0;

	if (mouseIsPressed){
		cuboP.x = mouseX;
		cuboP.y = mouseY;
	}
	
	for (var i = cubo.length -1; i >= 0; i--) {
		if (keyIsDown(UP_ARROW) && cuboP.notTouchingUp(cubo[i])){
			moveUp += 1;
		}
		if (moveUp == cubo.length){cuboP.y -= 4;}
		if (keyIsDown(DOWN_ARROW) && cuboP.notTouchingDown(cubo[i])){
			moveDown += 1;
		} 
		if (moveDown == cubo.length){cuboP.y += 4;}	
		if (keyIsDown(LEFT_ARROW) && cuboP.notTouchingLeft(cubo[i])){
			moveLeft += 1;
		}
		if (moveLeft == cubo.length){cuboP.x -= 4;}
		if (keyIsDown(RIGHT_ARROW) && cuboP.notTouchingRight(cubo[i])){
			moveRight += 1;
		}
		if (moveRight == cubo.length){cuboP.x += 4;}
		cubo[i].show();
	}

	cuboP.show();
}


function Cubo(x,y,h){
	this.x = x;
	this.y = y;

	this.h = h;

	this.notTouchingUp = function(that) {
		var left = this.x + this.h >= that.x;
		var down = this.y <= that.y + that.h;
		var right = this.x <= that.x + that.h;

		// variable incompleta
		var up = this.y + this.h >= that.y +20;
		// para que se pueda mover para arriba, c tieneq ue ser falso
		var c = down && left && right && up;
		return c == false;
	}
	this.notTouchingDown = function(that) {
		var left = this.x + this.h >= that.x;
		var up = this.y + this.h >= that.y;
		var right = this.x <= that.x + that.h;

		// variable incompleta
		var down = this.y <= that.y +80;
		// para que se pueda mover para abajo, c tiene que ser falso
		var c = up && left && right && down;
		return c == false;
	}
	this.notTouchingLeft = function(that) {
		var up = this.y + this.h >= that.y;
		var right = this.x <= that.x + that.h;
		var down = this.y <= that.y + that.h;

		// variable incompleta
		var left = this.x + this.h >= that.x +20;
		// para que se pueda mover para abajo, c tiene que ser falso
		var c = up && left && down && right;
		return c == false;
	}
	this.notTouchingRight = function(that) {
		var up = this.y + this.h >= that.y;
		var left = this.x + this.h >= that.x;
		var down = this.y <= that.y + that.h;

		// variable incompleta
		var right = this.x <= that.x +80;
		// para que se pueda mover para abajo, c tiene que ser falso
		var c = up && right && down && left;
		return c == false;
	}
	
	this.show = function(){
		rect(this.x, this.y, this.h, this.h);
	}
}
var mapa1 = [
	1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,1,
	1,1,1,1,1,1,1,1
];
var mapa2 = [
	1,1,1,1,1,1,1,1,
	1,0,0,0,0,1,0,1,
	1,0,0,0,0,1,0,1,
	1,0,0,0,0,0,0,1,
	1,1,1,1,0,1,1,1
];
var u = 50;
var cubo = [];
var cuboP;

function setup() {
	var canvas = createCanvas(800,500);
    canvas.parent('display');
    cuboP = new Cubo(width/2,height/2,20);
    cuboZ = new Cubo(200,200,30);
}

function draw() {
	background(255);
	mapa = mapa1;
	showblocks(mapa);

	if (cuboZ.x < cuboP.x){
		cuboZ.x += (cuboP.x - cuboZ.x)/100;
	} else if (cuboZ.x > cuboP.x){
		cuboZ.x -= (cuboZ.x - cuboP.x)/100;
	}
	if (cuboZ.y < cuboP.y){
		cuboZ.y += (cuboP.y - cuboZ.y)/100;
	} else if (cuboZ.y > cuboP.y){
		cuboZ.y -= (cuboZ.y - cuboP.y)/100;
	}
	if (cuboZ.x == cuboP.x &&cuboZ.y == cuboP.y){
		frameRate(1);
	}

	movimiento(cuboP,cubo);
	cuboZ.show();
	cuboP.show();
	grilla();
}

function movimiento(jugador,pared){
	var moveUp = 0;
	var moveDown = 0;
	var moveLeft = 0;
	var moveRight = 0;
	
	for (var i = pared.length -1; i >= 0; i--) {
		if (keyIsDown(UP_ARROW) && jugador.notTouchingUp(pared[i])){
			moveUp += 1;
		}
		if (moveUp == pared.length){jugador.y -= 4;}

		if (keyIsDown(DOWN_ARROW) && jugador.notTouchingDown(pared[i])){
			moveDown += 1;
		} 
		if (moveDown == pared.length){jugador.y += 4;}	

		if (keyIsDown(LEFT_ARROW) && jugador.notTouchingLeft(pared[i])){
			moveLeft += 1;
		}
		if (moveLeft == pared.length){jugador.x -= 4;}

		if (keyIsDown(RIGHT_ARROW) && jugador.notTouchingRight(pared[i])){
			moveRight += 1;
		}
		if (moveRight == pared.length){jugador.x += 4;}
		pared[i].show();
	}	
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
		push();
		fill(170);
		noStroke();
		rect(this.x, this.y, this.h, this.h);
		pop();
	}
} 
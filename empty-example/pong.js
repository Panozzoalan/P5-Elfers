var ball, me, modoRapido;
var primerMovimiento = false;
var vel = 3;

function setup(){
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	modoRapido = createCheckbox('Modo rapido');
	// modoRapido.checked() 
	ball = new Ball();
	me = new Bar();
	you = new Bar();
}

// Loop
function draw(){

	

	// Fondo negro
	background(0);
	// Input de teclado
	keyy(); 
	// Velocidad de juego
	velocidad(); 
	// Jugadores
	me.show(30);
	you.show(width - 50);
	// Pelota y sus funciones
	if (primerMovimiento){
		ball.update();
	}
	ball.show();
	// Puntuacion
	fill(255,255,255);
	textSize(40);
	text(me.puntaje,10,40);
	text(you.puntaje,width-50,40);
}

// Velocidad de juego
function velocidad(){
	if (modoRapido.checked()){
		frameRate(120)
	} else {
		frameRate(30)
	}
}

// Jugador
function Bar(){
	this.y = 100;
	this.x = 0;
	this.puntaje = 0;

	this.show = function(x){
		this.x = x;
		rect(x, this.y, 20, 100);
	}
}

// Bola
function Ball(){
	this.y = height/2;
	this.x = width/2;

	this.d = 50;
	this.r = this.d /2;

	this.yspeed = vel;
	this.xspeed = vel*3;

	this.update = function(){

		// Si toca un lateral suma puntos
		if (this.x >= width - this.r || this.x <= this.r){
			if (this.x > width/2 && primerMovimiento){
				me.puntaje += 1;
				primerMovimiento = false;
			} else if (this.x < width/2 && primerMovimiento){
				you.puntaje += 1;
				primerMovimiento = false;
			}
			this.y = height/2;
			this.x = width/2;
		}

		// Si toca a ME
		if (this.x - this.r <= me.x +20 && // Vertical
			((this.y <= me.y +100 && this.y + this.r >= me.y) || // Horizontal (lados)
			dist(this.x, this.y, me.x +20, me.y) <= this.r +1 ||
			dist(this.x, this.y, me.x +20, me.y +100) <= this.r +1)) // Horizontal (puntas)
		{
			// Rebote
			this.xspeed = 9;
		}

		// Si toca a YOU
		if (this.x + this.r >= you.x && // Vertical
			((this.y <= you.y +100 && this.y + this.r >= you.y) || // Horizontal (lados)
			dist(this.x, this.y, you.x, you.y) <= this.r + 1 || 
			dist(this.x, this.y, you.x, you.y +100) <= this.r + 1)) // Horizontal (puntas)
		{
			// Rebote
			this.xspeed = -9;			
		}

		// Si toca el piso o el techo
		if (this.y >= height - this.r || this.y <= this.r){
			// Rebote
			this.yspeed = this.yspeed * (-1);
		}



		this.y += this.yspeed;
		this.x += this.xspeed;
	}

	this.show = function (){
		if (primerMovimiento){
			fill(255,255,255);
		} else {
			fill(255,255,255,100);
		}
		ellipse(this.x, this.y, this.d, this.d);
	}
}

// Restriccion de movimiento
function puedeMover(obj,dir){
	if (dir == 'up'){
		return(obj.y >= 0);
	} else if(dir == 'down'){
		return(obj.y <= 400);
	}
}

function keyy(){
	if (keyIsDown(UP_ARROW) && puedeMover(you,'up')) {
		you.y -= vel;
		primerMovimiento = true;
	} else if(keyIsDown(DOWN_ARROW) && puedeMover(you,'down')) {
		you.y += vel;
		primerMovimiento = true;
	}

	if (keyIsDown(87) && puedeMover(me,'up')) {
		me.y-= vel;
		primerMovimiento = true;
	} else if(keyIsDown(83) && puedeMover(me,'down')) {
		me.y += vel;
		primerMovimiento = true;
	}
}
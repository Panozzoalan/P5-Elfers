var ball;
var altura;
var velocidad;
var topaltura = [];

function setup(){
	var canvas = createCanvas(800,500);
	canvas.parent('bouncyball');
	ball = new Ball();
}

function draw(){
	background(150);
	ball.update();
	ball.draw();


	altura = int((ball.y - 460) *(-1));
	velocidad = 'Velocidad: ' + int(ball.yspeed * (-1));
	
	if (int(ball.yspeed) === 0){
		append(topaltura, altura);
		console.log(topaltura);
	}
	if (topaltura.length > 3){
		var a = topaltura.indexOf(min(topaltura));
		topaltura.splice(a,1);
	}
	text('Altura: ' + altura, 20, 20);
	text(velocidad, 20, 40);
	text('Altura maxima: ' + max(topaltura), 20,60);
}

function Ball(){
	this.x = width/2;
	this.y = height/2;
	this.yspeed = 1;

	this.update = function(){
		if (this.y < height-40){
			this.yspeed += 1/10; 
		} else {
			// Lo que sucede cuando toca el piso
			this.yspeed = this.yspeed * (-1);
			this.yspeed = this.yspeed + 1;
		}
		this.y += this.yspeed;
	}

	this.draw = function() {
		if (this.y >= height-40){this.y = height-40;};
		if (mouseIsPressed){this.yspeed += 1};

		fill(255);
		ellipse(this.x,this.y,80,80);
	}
}
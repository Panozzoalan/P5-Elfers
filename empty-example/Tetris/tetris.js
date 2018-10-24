var u = 50;
var moving = [];
var static = [];

var tetra = [
	[u*2,u*3,u*2,u*3, 0,0,u,u], // o 
	[u*2,u*3,u*4,u*5, 0,0,0,0], // i
	[u*2,u*3,u*3,u*4, u,u,0,u] // t
]

function setup(){
	var canvas = createCanvas(550,800);
	canvas.parent('display');
	frameRate(5);

	// Genera una pieza inicial
	var a = parseInt(random(tetra.length));
	for (var i = 0; i < 4; i++){
		moving.push(new Piece(tetra[a][i],tetra[a][i+4]));
	}
}

function draw(){
	background(23);
	var a = parseInt(random(tetra.length));

	// Generar piezas moviles
	moving[0].fall();
	moving[1].fall();
	moving[2].fall();
	moving[3].fall();

	if (keyIsDown(LEFT_ARROW) && moving[0].x > 0){
		for (var i = 0; i < 4; i++){moving[i].x -= u;}
	} else if (keyIsDown(RIGHT_ARROW) && moving[3].x+u*2 <= width){
		for (var i = 0; i < 4; i++){moving[i].x += u;}
	}
	
	for (var i = 0; i < 4; i++){
		// Si toca el suelo
		if (moving[i].touchGround()) {
			for (var j = 0; j < 4; j++){
				moving[j].speed = 0;
				static.push(new Piece(moving[j].x, moving[j].y));

				moving[j] = new Piece(tetra[a][j],tetra[a][j+4]);
			}
			break;
		}
	}	

	// Generar piezas estaticas
	for (var i = static.length - 1; i >= 0; i--) {
		if (static[i].y == u*i){}
		static[i].show();
	}
}

function Piece(x,y){
	this.x = x;
	this.y = y;
	this.speed = u;

	this.show = function(){
		rect(this.x, this.y, u, u);
	}

	this.fall = function(){
		this.y += this.speed;

		this.show();
	}
	
	this.touchGround = function(){
		var colission = false;
		
		if (static.length > 0){
			for (var i = 0; i < static.length; i++) {
				if (
					this.y+u == static[i].y &&
					this.x == static[i].x
				){
					colission = true;
				}
			}
		}
		if (this.y+u >= height || colission) {
			console.log('true');
			return true;
		}
	}
} 
var particula = [];

function setup(){
	createCanvas(window.innerWidth,window.innerHeight);
}

function draw() {
	background(200,0,0);
	if (particula.length < 100) {
		particula.push(new Dot());
	}

	for (var i = particula.length - 1; i >= 0; i--) {
		var distancia = 0;
		var mapeo = 0;
		for (var j = particula.length - 1; j >= 0; j--) {
			distancia = dist(particula[j].x,particula[j].y,particula[i].x,particula[i].y);
			mapeo = map(mouseX,0,width,50,300);
			if (distancia < mapeo){				
				stroke(255,255,255,map(distancia,0,mapeo,255,0));
				line(particula[j].x,particula[j].y,particula[i].x,particula[i].y);
			}
		}

		particula[i].show();
		// Limite
		if (particula[i].x < 0 ||
			particula[i].x > width ||
			particula[i].y < 0 ||
			particula[i].y > height){
			particula.splice(i,1);
		}
	}

	fill(0);
	noStroke();
	textSize(20);
	text('Mouse arriba y abajo para velocidad', 10, 20);
	text('Mouse a los costados para la longitud de las uniones', 10, 40);
}

function Dot() {
	this.x = random(width);
	this.y = random(height);
	this.dirx = random(-1,1);
	this.diry = random(-1,1);
	

	this.show = function() {
		var vel = map(mouseY,0,height,1,15);
		// Direccionamiento
		this.x += this.dirx/vel;
		this.y -= this.diry/vel;




		fill(255);
		ellipse(this.x, this.y, 5,5);
	}
}
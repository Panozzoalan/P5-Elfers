var player;
var monster = [];
var shoot = [];
var best = [];
var score = 0;
var cero = 0;
var f = 0;
var pausa = false;

function setup() {
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	player = new Player();
}

function draw(){
	background(200);
	//marks();

	if (pausa){
		juegoPausado();
	} else {
		juego();
	}
}

function juego(){
	gun();
	
	// Muestra los disparos y los elimina si salen del mapa
	for (var i = shoot.length - 1; i >= 0; i--) {
		shoot[i].show();
		if (shoot[i].x < 0 ||
			shoot[i].x > width ||
			shoot[i].y < 0 ||
			shoot[i].y > height){
			shoot.splice(i,1);
		}
	}
	
	// Agrega monstruos
	if (monster.length < 5){
		monster.push(new Monster());
		monster[monster.length-1].posicion();
	}

	// Muestra los monstruos 
	for (var i = monster.length - 1; i >= 0; i--) {
		monster[i].show();
	}
	textSize(30);
	text(score,10,30);
	player.show();
}

function juegoPausado(){
	cooldown();
	best.push(score);
	if (best.length > 3){
		var a = best.indexOf(min(best));
		best.splice(a,1);
	}
	fill(255);
	textSize(100);
	textAlign(CENTER);
	text('PERDISTE', width/2, height/2);
	textSize(70);
	text('Puntuacion: ' + score, width/2, height/2 + 100);
	text('Mejor: ' + max(best), width/2, height/2 + 200);

	if (frameCount > f + 120){	// Luego de unos segundos
		pausa = false; 		// Pasa a modo juego
		player.x = width/2;
		player.y = height/2;// Coloca al jugador en la posicion inicial
		monster = [];			// Remueve los obstaculos
		score = 0;			// Resetea los puntos
		cero = 0;
	}
}

function cooldown(){
	fill(200,200,200,200);
	var x = map(cero, 0, 120, 0, TWO_PI);
	x -= HALF_PI-0.01;
	cero++;
	arc(width/2, height/2, 300, 300, -HALF_PI, x);
}

function gun(){
	if (frameCount % 15 == 0 && shoot.length < 6){
		if (keyIsDown(UP_ARROW)){
			shoot.push(new Bullet());
			shoot[shoot.length-1].yspeed = -10;

		} else if (keyIsDown(DOWN_ARROW)){
			shoot.push(new Bullet());
			shoot[shoot.length-1].yspeed = 10;

		} else if (keyIsDown(LEFT_ARROW)){
			shoot.push(new Bullet());
			shoot[shoot.length-1].xspeed = -10;

		} else if (keyIsDown(RIGHT_ARROW)){
			shoot.push(new Bullet());
			shoot[shoot.length-1].xspeed = 10;
		}
	}
}

function Bullet(){
	this.x = player.x;
	this.y = player.y;
	this.xspeed = 0;
	this.yspeed = 0;

	this.show = function(){
		for (var i = monster.length - 1; i >= 0; i--) {
			var distancia = dist(this.x,this.y,monster[i].x,monster[i].y);
			if (distancia < monster[i].r){
				score += 1;
				monster.splice(i, 1);
			}
		}
		this.x += this.xspeed;
		this.y += this.yspeed;

		ellipse(this.x,this.y,3,3);
	}
}


function Monster(){
	this.x = 0;
	this.posicion = function() {
		this.a = random(width);
		this.b = random(height);
		 else {
			this.posicion();
		}
	}
	console.log(this.x);
	this.speed = 2;
	this.r = 30;
	var num = 0;

	this.show = function(){
		var x = 0;
		var y = 0;

		var x1 = this.x;
		var y1 = this.y;
		var x2 = player.x;
		var y2 = player.y;

		// Seguimiento 
		if (x1 > x2){
			// Sector II y III
			x = x1 - x2;
			if (y1 < y2){
				// Sector II //
				y = y2 - y1;
				if(x < y){
					// Sector II-1 // // // // // // // // // // 
					num = map(x, 0, y, 0, this.speed);
					y1 = y1 + this.speed;
					x1 = x1 - num;
				}/* else if (x > y){
					// Sector II-2 // // // // // // // // // // 
					num = map(y, 0, x, 0, this.speed);
					x1 = x1 - this.speed;
					y1 = y1 + num;
				}*/
			}/* else if (y1 > y2) {
				// Sector III
				y = y1 - y2;
				if(x < y){
					// Sector III-1 // // // // // // // // // // 
					num = map(x, 0, y, 0, this.speed);
					y1 = y1 - this.speed;
					x1 = x1 - num;
				} else if (x > y){
					// Sector III-2 // // // // // // // // // // 
					num = map(y, 0, x, 0, this.speed);
					x1 = x1 - this.speed;
					y1 = y1 - num;
				}
			}*/
		}/* else if (x1 < x2) {
			x = x2 - x1;
			if (y1 > y2) {
				// Sector IV 
				y = y1 - y2;
				if(x < y){
					// Sector IV-1 // // // // // // // // // // 
					num = map(x, 0, y, 0, this.speed);
					y1 = y1 - this.speed;
					x1 = x1 + num;
				} else if (x > y){
					// Sector IV-2 // // // // // // // // // // 
					num = map(y, 0, x, 0, this.speed);
					x1 = x1 + this.speed;
					y1 = y1 - num;
				}
			} else if (y1 < y2){
				// Sector I
				y = y2 - y1;
				if(x > y){
					// Sector I-1 // // // // // // // // // // 
					num = map(y, 0, x, 0, this.speed);
					x1 = x1 + this.speed;
					y1 = y1 + num;
				} else if (x < y){
					// Sector I-2 // // // // // // // // // // 
					num = map(x, 0, y, 0, this.speed);
					y1 = y1 + this.speed;
					x1 = x1 + num;
				}
			}
		}*/
		//follow(this.x, this.y, this.speed, player.x, player.y);
		text('sda',10,20);
		text(y2,10,50)
		// Muerte
		if(dist(x1,y1,x2,y2) < this.r){
			f = frameCount;
			pausa = true;
		}
		
		fill(0);
		ellipse(x1, y1,this.r, this.r);
	}
}

function Player(){
	this.x = width/2;
	this.y = height/2;

	this.show = function(){
		// Movimiento
		if (keyIsDown(87)) {this.y -= 4;}
		if (keyIsDown(83)) {this.y += 4;}
		if (keyIsDown(65)) {this.x -= 4;}
		if (keyIsDown(68)) {this.x += 4;}

		fill(255);
		ellipse(this.x, this.y, 30, 30);
	}
}

function marks(){
	line(150,0,650,height);
	line(150,height,650,0);
	line(0,height/2,width,height/2);
	line(width/2,0,width/2,height);
	line(player.x,player.y,mouseX, mouseY);
	line(mouseX,0,mouseX,height);
	line(0,mouseY,width, mouseY);
}
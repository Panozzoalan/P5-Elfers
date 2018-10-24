var modoFacil,player,players,input,submit,data,img;
var obs = [];		// Lista de obstaculos
var best = [];
var puntos = 0;
var cero = 0;
var f = 0;
var bgpos = 800;
var pausa = false;
var inicio = true;
var modo = false;

function preload() {
	players = loadJSON('flappy.json');
	bg = loadImage('bg.png');
}

function setup() {
	var canvas = createCanvas(800,500);
	canvas.parent('display');
	modoFacil = createCheckbox('Modo fasssil');
	textFont('Arial');
	player = new Bird();
}

function draw() {
	background(150,150,255);
	animatedBG();

	if (inicio) {
		juegoInicio();
	} else if (pausa) {
		juegoPausado();
	} else {
		juego();
	}
}

function animatedBG(){

	image(bg, bgpos, 0, width, height);
	image(bg, bgpos - width, 0, width, height);
	if (bgpos <= 0) {
		bgpos = width;
	}
	bgpos--;
}

function juegoInicio(){
	fill(100,255,100);
	rect(0,0,width,height);
	push();
		rectMode(CENTER);
		fill(200);
		rect(width/2,height/2,200,40);
	pop();
	fill(0);
	textAlign(CENTER);
	textSize(30);
	text('Click to start',width/2,height/2+10);

	if (mouseIsPressed) {inicio = false}
}

function juego(){
	cero = 0;

	// Modo juego, si toca algun borde o alguna pared, pasa a modo pausa //
	player.update();
	player.show();

	if (frameCount % 80 == 0){
		obs.push(new Wall());		// Coloca un obstaculo cada 80 frames
	}


	for (var i = obs.length-1; i >= 0; i--){
		if (modoFacil.checked()){
			player.h = 30;
			obs[i].th = 20;
		} else {
			player.h = 50;
			obs[i].th = 50;
		}
		obs[i].move();
		obs[i].show();
		if (obs[i].left < -70 ){
			puntos += 1;			// Agrega un punto
			obs.splice(i, 1);		// Elimina el obstaculo al sobrepasar la pantalla
		}
		// Comprobacion de muerte
		if (player.x <= obs[i].left + obs[i].th &&
			player.x + 10 >= obs[i].left &&
			(player.y <= obs[i].uppergap ||
			player.y + player.h >= obs[i].lowergap) ||
			player.y >= player.floor || player.y < -40){
			pausa = true;			// Pausa el juego
			f = frameCount;
		}
	}

	fill(0);
	textSize(30)
	text(puntos,30,40);				// Puntuacion actual
	////////////////////////////////////////////////////////////
}

function juegoPausado(){
	append(best, puntos);

	if (best.length > 3){
		var a = best.indexOf(min(best));
		best.splice(a,1);
	}

	// Modo pausa, muestra el score y reinicia la partida //
	fill(100,255,100);
	rect(0,0,width,height); 			// Fondo del modo pausa

	cooldown();

	fill(0);
	textAlign(CENTER);
	textSize(100);
	text(puntos, width/2, height/2); 	// Puntuacion final

	fill(255,255,0);
	textSize(60);
	text('Best: '+max(best), width/2, height/2+100)


	if (frameCount > f + 120){	// Luego de unos segundos
		pausa = false; 		// Pasa a modo juego
		player.y = 200;		// Coloca al jugador en la posicion inicial
		player.speed = 0;	// Resetea la velocidad
		obs = [];			// Remueve los obstaculos
		puntos = 0;			// Resetea los puntos
	}
}

function cooldown(){
	fill(200,200,200,200);
	var x = map(cero, 0, 120, 0, TWO_PI);
	x -= HALF_PI-0.01;
	//console.log(x);
	cero++;
	arc(width/2, height/2, 300, 300, -HALF_PI, x);
}

function keyPressed(){
	if (keyCode === UP_ARROW){
		player.jump();
	}
}
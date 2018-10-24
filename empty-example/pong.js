var ball, me, modoRapido;
var primerToque = false;
var vel = 0;

function setup(){
    var canvas = createCanvas(800,500);
    canvas.parent('display');
    modoRapido = createCheckbox('Modo rapido');
    ball = new Ball();
    me = new Bar();
    you = new Bar();
}

function draw(){
    background(0);
    keyy();

    me.show(30);
    you.show(width - 50);

    ball.update();
    ball.show();

    fill(255,255,255);
    textSize(40);
    text(me.puntaje,10,40);
    text(you.puntaje,width-50,40);
}


function Bar(){
    this.y = 100;
    this.puntaje = 0;

    this.show = function(x){
        rect(x, this.y, 20, 100);
    }
}


function Ball(){
    this.y = height/2;
    this.x = width/2;

    this.d = 50;
    this.r = this.d /2;


    this.update = function(){
        if (modoRapido.checked()){
            vel = 9;
        } else {
            vel = 3;
        }
        this.yspeed = vel;
        this.xspeed = vel*3;

        // Si toca un lateral
        if (this.x >= width - this.r || this.x <= this.r){
            if (this.x > width/2 && primerToque){
                me.puntaje += 1;
            } else if (this.x < width/2 && primerToque){
                you.puntaje += 1;
            }
            this.y = height/2;
            this.x = width/2;
            primerToque = false;
        }

        // Si toca a ME
        if (this.x <= 70 &&
            this.y <= me.y +100 &&
            this.y >= me.y && (
            dist(ball.x, ball.y, 50, me.y) <= 26 ||
            dist(ball.x, ball.y, 50, me.y +100) <= 26)) {
            primerToque = true;
            this.xspeed = 9;
        }

        // Si toca a YOU
        if (this.x +25 >= width -50 &&
            this.y <= you.y +100 &&
            this.y >= you.y || (
            dist(ball.x, ball.y, width -50, you.y) <= 26 ||
            dist(ball.x, ball.y, width -50, you.y +100) <= 26)) {
            primerToque = true;
            this.xspeed = -9;
            console.log(this.xspeed);
        }

        // Si toca el piso o el techo
        if (this.y >= height - this.r || this.y <= this.r){
            this.yspeed = this.yspeed * (-1);
        }



        this.y += this.yspeed;
        this.x += this.xspeed;
    }

    this.show = function (){
        if (primerToque){
            fill(255,255,255);
        } else {
            fill(255,255,255,100);
        }
        ellipse(this.x,this.y,50,50);
    }
}

function puedeMover(obj,dir){
    if (dir == 'up'){
        return(obj.y >= 0);
    } else if(dir == 'down'){
        return(obj.y <= 400);
    }
}

function keyy(){
    var vel = 0;
    if (modoRapido.checked()){
        vel = 10;
    } else {
        vel = 2;
    }

    if (keyIsDown(UP_ARROW) && puedeMover(you,'up')) {
        you.y -= vel;
    } else if(keyIsDown(DOWN_ARROW) && puedeMover(you,'down')) {
        you.y += vel;
    }

    if (keyIsDown(87) && puedeMover(me,'up')) {
        me.y-= vel;
    } else if(keyIsDown(83) && puedeMover(me,'down')) {
        me.y += vel;
    }
}
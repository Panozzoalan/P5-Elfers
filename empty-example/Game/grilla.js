function grilla(){
	if (keyIsDown(71)){
		grid();
	}
}

function grid(){
	push();
	fill(0);
	strokeWeight(4);

	// Lineas Verticales
	line(0,0,0,height);
	line(u *2,0,u *2,height);
	line(u *4,0,u *4,height);
	line(u *6,0,u *6,height);
	line(u *8,0,u *8,height);
	line(u *10,0,u *10,height);
	line(u *12,0,u *12,height);
	line(u *14,0,u *14,height);
	line(width,0,width,height);

	// Lineas Horizontales
	line(0,0,width,0);
	line(0,u *2,width,u *2);
	line(0,u *4,width,u *4);
	line(0,u *6,width,u *6);
	line(0,u *8,width,u *8);
	line(0,u *10,width,u *10);
	line(0,u *12,width,u *12);
	line(0,u *14,width,u *14);
	line(0,height,width,height);
	pop();
}
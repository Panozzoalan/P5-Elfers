function showblocks(mapa){
	var lista = [
		block.block1,
		block.block2,
		block.block3,
		block.block4,
		block.block5,
		block.block6,
		block.block7,
		block.block8,
		block.block9,
		block.block10,
		block.block11,
		block.block12,
		block.block13,
		block.block14,
		block.block15,
		block.block16,
		block.block17,
		block.block18,
		block.block19,
		block.block20,
		block.block21,
		block.block22,
		block.block23,
		block.block24,
		block.block25,
		block.block26,
		block.block27,
		block.block28,
		block.block29,
		block.block30,
		block.block31,
		block.block32,
		block.block33,
		block.block34,
		block.block35,
		block.block36,
		block.block37,
		block.block38,
		block.block39,
		block.block40
	];
	var num = 0;
	for (var i = lista.length - 1; i >= 0; i--) {
		if (mapa[i] == 1){
			cubo[num] = new Cubo(lista[i][0],lista[i][1],u*2);
			num++;
		}

		//console.log(i);
	}
	
}

var block = {
	// Fila 1
	block1 : [0,0],
	block2 : [u*2,0],
	block3 : [u*4,0],
	block4 : [u*6,0],
	block5 : [u*8,0],
	block6 : [u*10,0],
	block7 : [u*12,0],
	block8 : [u*14,0],

	// Fila 2
	block9 : [0,u*2],
	block10 : [u*2,u*2],
	block11 : [u*4,u*2],
	block12 : [u*6,u*2],
	block13 : [u*8,u*2],
	block14 : [u*10,u*2],
	block15 : [u*12,u*2],
	block16 : [u*14,u*2],

	// Fila 3
	block17 : [0,u*4],
	block18 : [u*2,u*4],
	block19 : [u*4,u*4],
	block20 : [u*6,u*4],
	block21 : [u*8,u*4],
	block22 : [u*10,u*4],
	block23 : [u*12,u*4],
	block24 : [u*14,u*4],

	// Fila 4
	block25 : [0,u*6],
	block26 : [u*2,u*6],
	block27 : [u*4,u*6],
	block28 : [u*6,u*6],
	block29 : [u*8,u*6],
	block30 : [u*10,u*6],
	block31 : [u*12,u*6],
	block32 : [u*14,u*6],

	// Fila 5
	block33 : [0,u*8],
	block34 : [u*2,u*8],
	block35 : [u*4,u*8],
	block36 : [u*6,u*8],
	block37 : [u*8,u*8],
	block38 : [u*10,u*8],
	block39 : [u*12,u*8],
	block40 : [u*14,u*8],
}
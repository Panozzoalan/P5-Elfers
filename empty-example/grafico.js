var lista = [50,25,12,8,5];
var suma = 0;
var escala = 0;

function setup() {
	var canvas = createCanvas(800,600);
	canvas.parent('display');

	for (var i = lista.length - 1; i >= 0; i--) {
		suma = suma + lista[i];
		if (suma == 100){

			var longitud = 0;
			var anteriorLongitud = 0;

			for (var i = lista.length - 1; i >= 0; i--) {
				longitud = map(lista[i],0,100,0,TWO_PI);

				fill(escala);
				arc(100,100,80,80,anteriorLongitud,anteriorLongitud+longitud);

				console.log(anteriorLongitud);
				console.log(anteriorLongitud+longitud);

				anteriorLongitud = anteriorLongitud+longitud;
				escala = escala + 50;
			}
		}
	}
}

function mapear(lista){
	for (var i = lista.length - 1; i >= 0; i--) {
		lista[i] = map(lista[i],0,max(lista),0,100);
	}
}
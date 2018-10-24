function follow(x1,y1,speed,x2,y2){
	var x = 0;
	var y = 0;

	// Seguimiento
	if (x1 > x2){
		// Sector II y III
		x = x1 - x2;
		if (y1 < y2){
			// Sector II //
			y = y2 - y1;
			if(x < y){
				// Sector II-1 // // // // // // // // // // 
				num = map(x, 0, y, 0, speed);
				y1 = y1 + speed;
				x1 = x1 - num;
			} else if (x > y){
				// Sector II-2 // // // // // // // // // // 
				num = map(y, 0, x, 0, speed);
				x1 = x1 - speed;
				y1 = y1 + num;
			}
		} else if (y1 > y2) {
			// Sector III
			y = y1 - y2;
			if(x < y){
				// Sector III-1 // // // // // // // // // // 
				num = map(x, 0, y, 0, speed);
				y1 = y1 - speed;
				x1 = x1 - num;
			} else if (x > y){
				// Sector III-2 // // // // // // // // // // 
				num = map(y, 0, x, 0, speed);
				x1 = x1 - speed;
				y1 = y1 - num;
			}
		}
	} else if (x1 < x2) {
		x = x2 - x1;
		if (y1 > y2) {
			// Sector IV 
			y = y1 - y2;
			if(x < y){
				// Sector IV-1 // // // // // // // // // // 
				num = map(x, 0, y, 0, speed);
				y1 = y1 - speed;
				x1 = x1 + num;
			} else if (x > y){
				// Sector IV-2 // // // // // // // // // // 
				num = map(y, 0, x, 0, speed);
				x1 = x1 + speed;
				y1 = y1 - num;
			}
		} else if (y1 < y2){
			// Sector I
			y = y2 - y1;
			if(x > y){
				// Sector I-1 // // // // // // // // // // 
				num = map(y, 0, x, 0, speed);
				x1 = x1 + speed;
				y1 = y1 + num;
			} else if (x < y){
				// Sector I-2 // // // // // // // // // // 
				num = map(x, 0, y, 0, speed);
				y1 = y1 + speed;
				x1 = x1 + num;
			}
		}
	}
}
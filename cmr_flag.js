a.width = a.height = 640;
var flagMode = 0;
var backgroundMode = 'black';

function brightenColorTone(color, amount) {
	return ('00' + Math.min(255, Math.max(0, Math.floor((parseInt(color, 16) * (1 + amount / 100) + (amount / 10))))).toString(16)).slice(-2);
}

function adjust(color, amount) {
	var s = '#';
	for (var i = 0; i < 3; ++i) {
		s += brightenColorTone(color.slice(i * 2 + 1, i * 2 + 3), amount);
	}
	return s;
}

colorSet = [
	'#ff0000', // Red
	'#0055a4', // France blue
	'#ffffff', // France white
	'#ef4135', // France red
	'#222222', // Black
	'#ffcc00', // Mustard yellow
]

function flagColor(x, y) {
	var index = -1;
	switch (flagMode) {
		case 0:
			if (x === 8 || x === 9 || y === 5 || y === 6) {
				index = 0;
			} else {
				index = 2;
			}
			break;
		case 1:
			if (x < 6) {
				index = 1;
			} else if (x < 12) {
				index = 2;
			} else {
				index = 3;
			}
			break;
		case 2:
			if (y < 4) {
				index = 4;
			} else if (y < 8) {
				index = 0;
			} else {
				index = 5;
			}
			break;
	}
	return colorSet[index];
}

(function Tick(e) {
	c.fillStyle = backgroundMode;
	c.fillRect(0, 0, a.width, a.height * 2 / 3);
	c.lineWidth = 24;
	for (var y = 0; y < 12; ++y) {
		for (var x = 0; x < 18; ++x) {
			var color = flagColor(x, y);
			var xOffset = Math.sin(x / 3 + e / 300);
			var yOffset = Math.sin(y / 5 + e / 200);
			color = adjust(color, Math.floor((-xOffset - yOffset) * 10));
			c.strokeStyle = color;
			c.beginPath();
			c.rect(x * 35 + 24 + xOffset * 5, y * 35 + 24 + yOffset * 3, 0, 0);
			c.stroke();
		}
	}
	requestAnimationFrame(Tick);
})(0);

document.body.onkeyup = function(e) {
	if (e.keyCode == 32) {
		flagMode = (flagMode + 1) % 3;
	} else if (e.keyCode == 66) {
		backgroundMode = (backgroundMode === 'black' ? 'white' : 'black');
	}
}
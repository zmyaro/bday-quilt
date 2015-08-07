'use strict';

var SQUARE_SIZE = 128,
	SQUARES_PER_ROW = 4;

function generateQuilt() {
	var ctx = document.getElementById('canvas').getContext('2d'),
		colorMode = document.getElementById('colorMode').value,
		dates = document.getElementsByClassName('dateInput');
	
	// Quit if there are no valid dates.
	if (!localStorage[APP_PREFIX + 'dates']) {
		alert('Please enter at least one valid date.');
		return;
	}
	
	ctx.canvas.width = SQUARE_SIZE * SQUARES_PER_ROW;
	ctx.canvas.height = SQUARE_SIZE * Math.ceil(dates.length / SQUARES_PER_ROW);
	
	// Convert dates to an Array.
	dates = Array.prototype.slice.call(dates);
	
	dates.forEach(function (date, i) {
		if (!date.value) {
			return;
		}
		var x = (i % SQUARES_PER_ROW) * SQUARE_SIZE,
			y = Math.floor(i / SQUARES_PER_ROW) * SQUARE_SIZE;
		ctx.fillStyle = convertDateToColor(date.value, colorMode);
		ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
	});

	window.open(ctx.canvas.toDataURL(), '_blank');
}

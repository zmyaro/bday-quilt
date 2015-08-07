'use strict';

var dateParseRegex = /[0-9]*([0-9]{2})-([0-9]{2})-([0-9]{2})/;

window.onload = function () {
	// Set up input event listeners.
	document.getElementById('generateBtn').onclick = generateQuilt;
	document.getElementById('addBdayBtn').onclick = addBday;
	document.getElementById('colorMode').onchange = handleColorModeChange;
	
	// Load date saved in localStorage.
	loadStoredData();
};

/**
 * Add a birthday when the add button is clicked.
 */
function addBday() {
	var newListItem = document.createElement('li'),
		newColorPreview = document.createElement('div'),
		newDatePicker = document.createElement('input'),
		newDeleteBtn = document.createElement('button');
	
	newColorPreview.className = 'colorPreview';
	newListItem.appendChild(newColorPreview);
	
	newDatePicker.className = 'dateInput';
	newDatePicker.type = 'date';
	newDatePicker.required = true;
	newDatePicker.placeholder = 'YYYY-MM-DD';
	newDatePicker.oninput = handleDateChange;
	newListItem.appendChild(newDatePicker);
	
	newDeleteBtn.innerHTML = '&times';
	newDeleteBtn.onclick = deleteBday;
	newListItem.appendChild(newDeleteBtn);
	
	document.getElementById('bdayList').appendChild(newListItem);
}

/**
 * Remove the birthday associated with the clicked close button.
 */
function deleteBday() {
	document.getElementById('bdayList').removeChild(this.parentElement);
	updateStoredDates();
}

function handleColorModeChange() {
	// Save the selected mode to localStorage.
	localStorage[APP_PREFIX + 'colorMode'] = this.value;
	updateColors();
}

function handleDateChange() {
	updateStoredDates();
	updateColors();
}

/**
 * Update the color previews
 */
function updateColors() {
	var colorMode = document.getElementById('colorMode').value,
		bdayItems = document.getElementById('bdayList').getElementsByTagName('li');
	
	// Convert bdayItems to an Array.
	bdayItems = Array.prototype.slice.call(bdayItems);
	
	bdayItems.forEach(function (item) {
		var date = item.getElementsByClassName('dateInput')[0].value,
			preview = item.getElementsByClassName('colorPreview')[0];

		// If there is no valid date, skip that item.
		if (!date) {
			return;
		}
		preview.style.backgroundColor = convertDateToColor(date, colorMode);
	});
}

/**
 * Convert a date string to a hex color.
 * @param {String} date - The date as a YYYY-MM-DD string
 * @param {String} colorMode - The method of converting the string to a color
 * @returns {String} The hex color code
 */
function convertDateToColor(date, colorMode) {
	date = dateParseRegex.exec(date);
	switch (colorMode) {
		case 'ymdDec':
			return '#' + make2Digits(date[1]) +
				make2Digits(date[2]) +
				make2Digits(date[3]);
			break;
		case 'ymdHex':
			return '#' + make2Digits(parseInt(date[1]).toString(16)) +
				make2Digits(parseInt(date[2]).toString(16)) +
				make2Digits(parseInt(date[2]).toString(16));
			break;
		case 'dmyDec':
			return '#' + make2Digits(date[3]) +
				make2Digits(date[2]) +
				make2Digits(date[1]);
			break;
		case 'dmyHex':
			return '#' + make2Digits(parseInt(date[3]).toString(16)) +
				make2Digits(parseInt(date[2]).toString(16)) +
				make2Digits(parseInt(date[1]).toString(16));
			break;
		case 'mdyDec':
			return '#' + make2Digits(date[2]) +
				make2Digits(date[1]) +
				make2Digits(date[3]);
			break;
		case 'mdyHex':
			return '#' + make2Digits(parseInt(date[2]).toString(16)) +
				make2Digits(parseInt(date[1]).toString(16)) +
				make2Digits(parseInt(date[3]).toString(16));
			break;
	}
}

/**
 * Prepend a zero on any one-digit number.
 * @param {Number|String} num - The number to make two digits
 * @returns {String} The number as two digits
 */
function make2Digits(num) {
	if (('' + num).length < 2) {
		return '0' + num;
	}
	return num;
}

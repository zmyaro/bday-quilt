'use strict';

var dateParseRegex = /[0-9]*([0-9]{2})-([0-9]{2})-([0-9]{2})/;

window.onload = function () {
	// Set up input event listeners.
	document.getElementById('generateBtn').onclick = generateQuilt;
	document.getElementById('addBdayBtn').onclick = addBday;
	document.getElementById('colorMode').onchange = handleColorModeChange;
	
	// Shorten the app bar title in narrow windows.
	window.onresize = function () {
		if (window.innerWidth < 324) {
			document.getElementById('title').innerHTML = 'B-Day Quilt Maker';
		} else {
			document.getElementById('title').innerHTML = 'Birthday Quilt Maker';
		}
	};
	window.onresize();
	
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
		console.log(convertDateToColor(date, colorMode));
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
		case 'yymmddDec':
			return '#' +
				pad(date[1], 2) +
				pad(date[2], 2) +
				pad(date[3], 2);
			break;
		case 'yyyymdHex':
			return '#' + decSumToHex([date[1], date[2], date[3]], false);
			break;
		case 'yyyymmddHex':
			return '#' + decSumToHex([date[1], date[2], date[3]], true);
			break;
		case 'ddmmyyDec':
			return '#' +
				pad(date[3], 2) +
				pad(date[2], 2) +
				pad(date[1], 2);
			break;
		case 'dmyyyyHex':
			return '#' + decSumToHex([date[3], date[2], date[1]], false);
			break;
		case 'ddmmyyyyHex':
			return '#' + decSumToHex([date[3], date[2], date[1]], true);
			break;
		case 'mmddyyDec':
			return '#' +
				pad(date[2], 2) +
				pad(date[3], 2) +
				pad(date[1], 2);
			break;
		case 'mdyyyyHex':
			return '#' + decSumToHex([date[2], date[3], date[1]], false);
			break;
		case 'mmddyyyyHex':
			return '#' + decSumToHex([date[2], date[3], date[1]], true);
			break;
	}
}

/**
 * Prepend zeros on any number of insufficient length.
 * @param {Number|String} num - The number to make longer
 * @param {Number} len - The desired length
 * @returns {String} The number at the desired length
 */
function pad(num, len) {
	var numLen = ('' + num).length;
	if (numLen < len) {
		return Array(len - numLen + 1).join('0') + num;
	}
	return num;
}

/**
 * Adds decimal numbers and returns the sum as a six-digit hexadecimal number.
 * @param {Array<Number>} nums - The numbers to sum
 * @param {Boolean} padDigits - Whether to pad the numbers to two digits
 * @returns {String} The sum in hexadecimal
 */
function decSumToHex(nums, padDigits) {
	if (padDigits) {
		return pad(parseInt('' +
			pad(nums[0], 2) +
			pad(nums[1], 2) +
			pad(nums[2], 2)).toString(16), 6);
	} else {
		return pad(parseInt('' +
			parseInt(nums[0]) +
			parseInt(nums[1]) +
			parseInt(nums[2])).toString(16), 6);
	}
}

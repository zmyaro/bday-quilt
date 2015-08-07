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
console.log(this.value);
	updateStoredDates();
	updateColors();
}

/**
 * Update the color previews
 */
function updateColors() {
	var mode = document.getElementById('colorMode').value,
		bdayItems = document.getElementById('bdayList').getElementsByTagName('li');
	
	// Convert bdayItems to an Array.
	bdayItems = Array.prototype.slice.call(bdayItems);
	
	bdayItems.forEach(function (item) {
		var date = dateParseRegex.exec(item.getElementsByClassName('dateInput')[0].value),
			preview = item.getElementsByClassName('colorPreview')[0];

		// If there is no valid date, skip that item.
		if (!date) {
			return;
		}
		switch (mode) {
			case 'ymdDec':
				preview.style.backgroundColor =
					'#' + date[1] +
					date[2] +
					date[3];
				break;
			case 'ymdHex':
				preview.style.backgroundColor =
					'#' + parseInt(date[1]).toString(16) +
					parseInt(date[2]).toString(16) +
					parseInt(date[2]).toString(16);
				break;
			case 'dmyDec':
				preview.style.backgroundColor =
					'#' + date[3] +
					date[2] +
					date[1];
				break;
			case 'dmyHex':
				preview.style.backgroundColor =
					'#' + parseInt(date[3]).toString(16) +
					parseInt(date[2]).toString(16) +
					parseInt(date[1]).toString(16);
				break;
			case 'mdyDec':
				preview.style.backgroundColor =
					'#' + date[2] +
					date[1] +
					date[3];
				break;
			case 'mdyHex':
				preview.style.backgroundColor =
					'#' + parseInt(date[2]).toString(16) +
					parseInt(date[1]).toString(16) +
					parseInt(date[3]).toString(16);
				break;
		}
	});
}

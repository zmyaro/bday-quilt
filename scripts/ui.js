window.onload = function () {
	// Set up input event listeners.
	document.getElementById('generateBtn').onclick = generateQuilt;
	document.getElementById('addBdayBtn').onclick = addBday;
	document.getElementById('colorMode').onchange = updateColors;
	
	// Add one birthday entry to start.
	addBday();
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
}

/**
 * Update the color previews when the color mode is changed.
 */
function updateColors() {
	var mode = this.value,
		bdayItems = document.getElementById('bdayList').getElementsByTagName('li');
	
	// Convert bdayItems to an Array.
	bdayItems = Array.prototype.slice.call(bdayItems);
	
	bdayItems.forEach(function (item) {
		// TODO: Update the color previews
	});
}

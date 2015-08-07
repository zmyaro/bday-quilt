'use strict';

var APP_PREFIX = 'bdayQuilt-';

/**
 * Load data saved in localStorage.
 */
function loadStoredData() {
	if (localStorage[APP_PREFIX + 'colorMode']) {
		document.getElementById('colorMode').value =
			localStorage[APP_PREFIX + 'colorMode'];
	}
	if (localStorage[APP_PREFIX + 'dates']) {
		var dates = localStorage[APP_PREFIX + 'dates'].split(','),
			list = document.getElementById('bdayList');
		dates.forEach(function (date, i) {
			addBday();
			list.getElementsByClassName('dateInput')[i].value = date;
		});
	} else {
		// If there are no saved birthdays, add one entry to start.
		addBday();
	}
	updateColors();
}

/**
 * Store the birthdays as a comma-separated list in localStorage.
 */
function updateStoredDates() {
	var dates = '',
		bdayItems = document.getElementById('bdayList').getElementsByClassName('dateInput');
	
	// Convert bdayItems to an Array.
	bdayItems = Array.prototype.slice.call(bdayItems);
	
	bdayItems.forEach(function (item) {
		if (!item.value) {
			return;
		}
		dates += item.value + ',';
	});

	// Remove the last comma.
	dates = dates.substring(0, dates.length - 1);
	// Save the list to localStorage.
	localStorage[APP_PREFIX + 'dates'] = dates;
}

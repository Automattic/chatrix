// Enable pages checkboxes when the show_on radio button is set to "specific".
window.addEventListener('load', function () {
	const container = document.querySelector("#chatrix-settings");
	const showOnRadioButtons = container.querySelectorAll('input[name="chatrix_settings[show_on]"]');

	showOnRadioButtons.forEach(function (radioButton) {
		radioButton.addEventListener('click', function (event) {
			let enable = event.target && event.target.matches('input[value="specific"]');
			let checkboxes = container.querySelectorAll('input[name^="chatrix_settings[pages"]');
			checkboxes.forEach(function (checkbox) {
				checkbox.disabled = !enable;
			});
		});
	});
});

// Trigger event listener on page load.
window.addEventListener('load', function () {
	const container = document.querySelector("#chatrix-settings");
	const showOnRadioButtons = container.querySelectorAll('input[name="chatrix_settings[show_on]"]');
	showOnRadioButtons.forEach(function (radioButton) {
		if (radioButton.checked) {
			radioButton.click();
		}
	});
}, false);

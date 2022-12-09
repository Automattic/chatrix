(function() {
	window.addEventListener('DOMContentLoaded', () => {
		const elements = document.getElementsByClassName("automattic-chatrix-popup");
		Array.from(elements).forEach((element) => {
			const dataset = element.dataset;
			if (!dataset.attributes) {
				throw "No attributes field found on chatrix div.";
			}

			const props = JSON.parse(decodeURIComponent(dataset.attributes));
			Chatrix.renderPopup(element, props);
		});
	});
})();

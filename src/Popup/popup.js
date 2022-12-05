(function() {
	window.addEventListener('DOMContentLoaded', () => {
		const config = window.ChatrixPopupConfig;
		if (!config) {
			throw "ChatrixPopupConfig is not defined";
		}

		const container = document.createElement("div");
		container.id = "chatrix-popup-container";
		document.body.appendChild(container);

		Chatrix.renderPopup(container.id, {
			defaultHomeserver: config.defaultHomeserver,
			roomId: config.roomId,
		});
	});
})();

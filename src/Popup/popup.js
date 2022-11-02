(function() {
	window.onload = () => {
		const config = window.automattic_chatrix_popup_config;
		if (config) {
			const container = document.createElement("div");
			container.id = "automattic-chatrix-container";
			document.body.appendChild(container);

			AutomatticChatrixPopup.loadPopup(
				container.id,
				config.rootUrl,
				config.iframeParams
			);
		}
	};
})();

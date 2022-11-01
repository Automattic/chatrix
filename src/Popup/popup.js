(function() {
	window.onload = () => {
		const config = window.automattic_chatrix_popup_config;
		if (config) {
			AutomatticChatrixPopup.loadStartButton(
				"automattic-chatrix-container",
				config.rootUrl,
				config.iframeParams
			);
		}
	};
})();

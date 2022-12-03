(function() {
	window.onload = () => {
		const config = window.automattic_chatrix_popup_config;
		if (config) {
			const container = document.createElement("div");
			container.id = "automattic-chatrix-container";
			document.body.appendChild(container);

			AutomatticChatrixPopup.render(container.id, {
				hostRoot: config.rootUrl,
				defaultHomeserver: config.defaultHomeserver,
				roomId: config.roomId,
			});
		}
	};
})();

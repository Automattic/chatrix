// Not used in the editor.
function automattic_chatrix_make_iframe(block_attributes) {
	const placeholderId = "#wp-block-automattic-chatrix-iframe";
	const placeholder = document.querySelector(placeholderId);
	if (!placeholder) {
		throw new Error(`Iframe placeholder for chatrix block was not found: ${placeholderId}`);
	}

	const iframe = document.createElement('iframe');
	iframe.src = automattic_chatrix_iframe_url(block_attributes);

	placeholder.parentNode.replaceChild(iframe, placeholder);
}

// Used in both the editor and the site.
function automattic_chatrix_iframe_url(block_attributes) {
	const config = window.chatrix_block_config;
	if (!config) {
		throw new Error("Failed to initialize Chatrix block: window.chatrix_block_config is not defined");
	}

	const queryParams = new URLSearchParams(window.location.search);
	const iframeQueryParams = {
		defaultHomeserver: block_attributes.defaultHomeserver,
	};

	if (queryParams.has("loginToken")) {
		iframeQueryParams.loginToken = queryParams.get("loginToken");
	}

	const url = new URL(config.iframeUrl);
	for (let key in iframeQueryParams) {
		url.searchParams.append(key, iframeQueryParams[key]);
	}

	return url.toString();
}

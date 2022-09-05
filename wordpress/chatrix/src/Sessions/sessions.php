<?php

namespace Automattic\Chatrix\Sessions;

function init() {
	// Log out user from Chatrix on non-logged in page load.
	foreach ( array( 'wp_footer', 'login_footer' ) as $footer_hook ) {
		add_action(
			$footer_hook,
			function () {
				if ( ! is_user_logged_in() ) {
					echo_script();
				}
			}
		);
	}
}

function echo_script() {
	?>
	<script type="text/javascript">
		async function invalidateChatrixSession(session) {
			await fetch(session.homeserver + '/_matrix/client/v3/logout', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + session.accessToken,
				},
			});
		}

		(function () {
			for (let i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
				if (!key.startsWith(LOCAL_STORAGE_KEY_PREFIX)) {
					continue;
				}
				this.invalidateChatrixSession(
					JSON.parse(localStorage.getItem(key))[0]
				);
				localStorage.removeItem(key);
			}
		})();
	</script>
	<?php
}

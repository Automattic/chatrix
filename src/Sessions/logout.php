<?php

namespace Automattic\Chatrix\Sessions;

function init_logout() {
	// Log out user from Chatrix on non-logged in page load.
	delete_sessions();
}

function delete_sessions() {
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
		async function chatrixLogoutSession(session) {
			return fetch(session.homeserver + '/_matrix/client/v3/logout', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + session.accessToken,
				},
			});
		}

		(function () {
			for (let i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
				if (!key.startsWith('chatrix')) {
					continue;
				}
				let data = localStorage.getItem(key);
				if (!data) {
					continue;
				}
				let parsed = JSON.parse(data);
				if (!parsed || parsed.length < 1) {
					continue;
				}

				let session = parsed[0];
				this.chatrixLogoutSession(session).then(() => {
					localStorage.removeItem(key);
				}).catch((error) => {
					console.log(`Failed to logout chatrix session. deviceId: ${session.deviceId}`, error);
				});
			}
		})();
	</script>
	<?php
}

<?php

namespace Automattic\Chatrix\Sessions;

function init( string $local_storage_key_prefix ) {
	// Log out user from Chatrix on non-logged in page load.
	delete_sessions( $local_storage_key_prefix );
}

function delete_sessions( string $local_storage_key_prefix ) {
	foreach ( array( 'wp_footer', 'login_footer' ) as $footer_hook ) {
		add_action(
			$footer_hook,
			function () use ( $local_storage_key_prefix ) {
				if ( ! is_user_logged_in() ) {
					echo_script( $local_storage_key_prefix );
				}
			}
		);
	}
}

function echo_script( string $local_storage_key_prefix ) {
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
				if (!key.startsWith('<?php echo esc_js( $local_storage_key_prefix ); ?>')) {
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

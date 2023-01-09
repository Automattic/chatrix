<?php

namespace Automattic\Chatrix\Sessions;

use const Automattic\Chatrix\LOGOUT_COOKIE_NAME;
use const Automattic\Chatrix\SCRIPT_HANDLE_LOGOUT;

function init_logout() {
	// Set a cookie when user logs out.
	add_action(
		'wp_logout',
		function () {
			// Expire in 10 minutes.
			$expiration = time() + ( 10 * 60 );
			setcookie( LOGOUT_COOKIE_NAME, 'true', $expiration, COOKIEPATH, COOKIE_DOMAIN );

			// Enqueue the script that will perform logout on the client.
			wp_enqueue_script( SCRIPT_HANDLE_LOGOUT );
		}
	);
}

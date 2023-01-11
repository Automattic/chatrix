<?php

namespace Automattic\Chatrix\Sessions;

use const Automattic\Chatrix\LOGOUT_COOKIE_NAME;

function init_logout() {
	// Set a cookie when user logs out.
	add_action(
		'wp_logout',
		function () {
			// Expire in 10 minutes.
			$expiration = time() + ( 10 * 60 );
			setcookie( LOGOUT_COOKIE_NAME, 'true', $expiration, COOKIEPATH, COOKIE_DOMAIN );
		}
	);
}

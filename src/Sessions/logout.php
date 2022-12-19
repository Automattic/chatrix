<?php

namespace Automattic\Chatrix\Sessions;

function init_logout() {
	// Set a cookie when user logs out.
	add_action(
		'wp_logout',
		function () {
			// Expire in 10 minutes.
			$expiration = time() + ( 10 * 60 );
			setcookie( 'chatrix-logout', 'true', $expiration, COOKIEPATH, COOKIE_DOMAIN );
		}
	);
}

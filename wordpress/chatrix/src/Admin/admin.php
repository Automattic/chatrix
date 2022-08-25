<?php

namespace Automattic\Chatrix\Admin;

function main() {
	// TODO: Remove following line once new settings page is fully implemented.
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\Settings\settingsInJson' );
}

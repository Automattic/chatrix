<?php

namespace Automattic\Chatrix\Admin;

function main() {
	add_action( 'admin_menu', 'Automattic\Chatrix\Admin\Settings\main' );

	// TODO: Remove following line once new settings page is fully implemented.
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\Settings\settings_in_json' );
}

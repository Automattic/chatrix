<?php

namespace Automattic\Chatrix\Admin;

function main() {
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\Settings\init' );
	add_action( 'admin_menu', 'Automattic\Chatrix\Admin\Settings\menu' );
}

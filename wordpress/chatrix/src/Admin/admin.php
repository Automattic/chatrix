<?php

namespace Automattic\Chatrix\Admin;

function main() {
	add_action( 'admin_enqueue_scripts', 'Automattic\Chatrix\Admin\Settings\enqueue' );
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\Settings\init' );
	add_action( 'admin_menu', 'Automattic\Chatrix\Admin\Settings\menu' );
}

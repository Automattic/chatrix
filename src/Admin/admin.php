<?php

namespace Automattic\Chatrix\Admin;

function main() {
	add_action( 'admin_menu', 'Automattic\Chatrix\Admin\Settings\menu' );
	init_settings();
}

function init_settings() {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
		return;
	}

	$uri             = basename( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) );
	$is_options_page = str_starts_with( $uri, 'options-general.php?page=chatrix' ) || 'options.php' === $uri;

	if ( ! $is_options_page ) {
		return;
	}

	add_action( 'admin_enqueue_scripts', 'Automattic\Chatrix\Admin\Settings\enqueue' );
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\Settings\init' );
}

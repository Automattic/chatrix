<?php

namespace Automattic\Chatrix;

use function Automattic\Chatrix\Block\register as register_block;
use function Automattic\Chatrix\Popup\register as register_popup;
use function Automattic\Chatrix\Sessions\init as init_frontend_session_management;

const LOCAL_STORAGE_KEY_PREFIX = 'chatrix';
const SCRIPT_HANDLE_CONFIG     = 'chatrix-config';
const SCRIPT_HANDLE_APP        = 'chatrix-app';
const CONFIG_VARIABLE          = 'ChatrixConfig';

function main() {
	init_frontend_session_management( LOCAL_STORAGE_KEY_PREFIX );
	register_scripts();
	register_block();
	register_popup();
}

function register_scripts() {
	add_action(
		'init',
		function () {
			$json_data = wp_json_encode(
				array(
					'rootUrl' => root_url() . '/iframe/',
				)
			);

			// Enqueue script for global configuration.
			wp_register_script( SCRIPT_HANDLE_CONFIG, '', array(), automattic_chatrix_version(), true );
			wp_enqueue_script( SCRIPT_HANDLE_CONFIG );
			wp_add_inline_script( SCRIPT_HANDLE_CONFIG, 'window.' . CONFIG_VARIABLE . " = $json_data;" );

			// Note we don't enqueue the script yet. It will be enqueue whenever SCRIPT_HANDLE_APP
			// is specified as a dependency of another script.
			wp_register_script(
				SCRIPT_HANDLE_APP,
				root_url() . '/app.iife.js',
				array( 'wp-element' ),
				automattic_chatrix_version(),
				true
			);
		}
	);
}

function root_url(): string {
	return plugins_url() . '/chatrix/build';
}

function get_local_storage_key( string $instance_id ): string {
	$current_user      = wp_get_current_user();
	$local_storage_key = LOCAL_STORAGE_KEY_PREFIX;

	if ( ! empty( $instance_id ) ) {
		$local_storage_key .= '_' . $instance_id;
	}

	if ( 0 !== $current_user->ID ) {
		$local_storage_key .= '_' . $current_user->user_login;
	}

	return $local_storage_key;
}

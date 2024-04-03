<?php

namespace Automattic\Chatrix;

use function Automattic\Chatrix\Block\register as register_block;
use function Automattic\Chatrix\Popup\register as register_popup;
use function Automattic\Chatrix\Sessions\init_logout;

const SCRIPT_HANDLE_CONFIG = 'chatrix-config';
const SCRIPT_HANDLE_APP    = 'chatrix-app';
const SCRIPT_HANDLE_LOGOUT = 'chatrix-logout';
const CONFIG_VARIABLE      = 'ChatrixConfig';
const LOGOUT_COOKIE_NAME   = 'chatrix-logout';

function main() {
	init_logout();
	register_scripts();
	register_block();
	register_popup();
}

function register_scripts() {
	add_action(
		'wp_enqueue_scripts',
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

			// Note we don't enqueue the SCRIPT_HANDLE_APP script yet. It will be enqueued whenever SCRIPT_HANDLE_APP
			// is specified as a dependency of another script.
			wp_register_script(
				SCRIPT_HANDLE_APP,
				root_url() . '/app.iife.js',
				array( 'wp-element' ),
				automattic_chatrix_version(),
				true
			);

			// filter 'chatrix_load_logout_script' exists to limit when logout script is loaded.
			// possible optimisation example:
			// add_filter( 'chatrix_load_logout_script', function() { return isset( $_COOKIE[ \Automattic\Chatrix\LOGOUT_COOKIE_NAME ] ); } );
			// to limit it when the logout cookie is set but can only do so when no page caching is involved for the page.
			if ( ! is_user_logged_in() && apply_filters( 'chatrix_load_logout_script', true ) ) {
				wp_register_script(
					SCRIPT_HANDLE_LOGOUT,
					root_url() . '/logout.iife.js',
					array(),
					automattic_chatrix_version(),
					false
				);

				wp_enqueue_script( SCRIPT_HANDLE_LOGOUT );
			}
		}
	);
}

function root_url(): string {
	return plugins_url( 'build', __DIR__ );
}

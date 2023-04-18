<?php

namespace Automattic\Chatrix\Popup;

use function Automattic\Chatrix\Admin\Settings\get as get_chatrix_settings;
use const Automattic\Chatrix\SCRIPT_HANDLE_APP;

function register() {
	register_default_instance();
	define_config();
	init_rest_api();
	init_javascript();
}

/**
 * Register the default instance of chatrix, using values from the plugin's settings.
 * If instances have already been declared, use those instead, in which case plugin settings are ignored.
 */
function register_default_instance() {
	add_filter(
		'chatrix_instances',
		function ( array $instances ) {
			if ( ! empty( $instances ) ) {
				return $instances;
			}

			$settings = get_chatrix_settings();
			if ( empty( $settings ) ) {
				return array();
			}

			return array(
				'default' => array(
					'homeserver' => $settings['homeserver'],
					'room_id'    => $settings['room'],
					'pages'      => 'all' === $settings['show_on'] ? 'all' : $settings['pages'],
				),
			);
		}
	);
}

/**
 * Define the configuration for the current page, if any.
 * If configuration has already been declared, use that instead.
 */
function define_config() {
	add_filter(
		'chatrix_config',
		function ( array $config ) {
			if ( ! empty( $config ) ) {
				return $config;
			}

			if ( ! is_page() && ! is_home() ) {
				return array();
			}

			global $post;

			$page_id   = $post->ID;
			$instances = apply_filters( 'chatrix_instances', array() );

			foreach ( $instances as $instance_id => $instance ) {
				$instance['instance_id'] = $instance_id;
				$instance_config         = array(
					'url'         => rest_url( "chatrix/config/$instance_id" ),
					'config'      => $instance,
					'instance_id' => $instance_id,
				);

				if ( 'all' === $instance['pages'] ) {
					return $instance_config;
				}

				if ( in_array( (string) $page_id, $instance['pages'], true ) ) {
					return $instance_config;
				}
			}

			return null;
		}
	);
}

/**
 * Declare rest routes for the config of each chatrix instance.
 */
function init_rest_api() {
	add_action(
		'rest_api_init',
		function () {
			$instances = apply_filters( 'chatrix_instances', array() );
			foreach ( $instances as $instance_id => $instance ) {
				register_rest_route(
					'chatrix',
					"config/$instance_id",
					array(
						'methods'             => 'GET',
						'permission_callback' => '__return_true',
						'callback'            => function () use ( $instance ) {
							unset( $instance['pages'] );

							return $instance;
						},
					)
				);
			}
		}
	);
}

function init_javascript() {
	add_action(
		'wp_enqueue_scripts',
		function () {
			$config = apply_filters( 'chatrix_config', array() );
			if ( empty( $config ) ) {
				return;
			}

			$handle    = 'chatrix-popup';
			$json_data = wp_json_encode(
				array(
					'instanceId'        => 'popup_' . $config['instance_id'],
					'defaultHomeserver' => $config['config']['homeserver'],
					'roomId'            => empty( $config['config']['room_id'] ) ? null : $config['config']['room_id'],
				)
			);

			wp_register_script(
				$handle,
				plugins_url( 'popup.js', __FILE__ ),
				array( SCRIPT_HANDLE_APP ),
				automattic_chatrix_version(),
				true
			);
			wp_add_inline_script( $handle, "window.ChatrixPopupConfig = $json_data", 'before' );
			wp_enqueue_script( $handle );
		}
	);
}

<?php

namespace Automattic\Chatrix\Popup;

use function Automattic\Chatrix\Admin\Settings\get as get_chatrix_settings;

function chatrix_config() {
	return apply_filters( 'chatrix_config', array() );
}

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
					'homeserver'    => $settings['homeserver'],
					'room_id'       => $settings['room'],
					'login_methods' => array( 'password', 'sso' ), // TODO: don't hardcode login methods.
					'pages'         => 'all' === $settings['show_on'] ? 'all' : $settings['pages'],
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
				$instance_config = array(
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
			$config = chatrix_config();
			if ( empty( $config ) ) {
				return;
			}

			$handle    = 'chatrix-popup-parent';
			$root_url  = root_url();
			$variables = array(
				'rootUrl'      => $root_url,
				'iframeParams' => array(
					'defaultHomeserver' => $config['config']['homeserver'],
					'roomId'            => empty( $config['config']['room_id'] ) ? null : $config['config']['room_id'],
				)
			);

			wp_register_script( $handle, $root_url . 'parent.iife.js', array(), automattic_chatrix_version(), false );
			wp_enqueue_script( $handle );
			wp_localize_script( $handle, 'automattic_chatrix_popup_config', $variables );
			wp_enqueue_script( 'chatrix-popup-js',  plugins_url( 'popup.js', __FILE__ ), array(), automattic_chatrix_version(), false);
		}
	);
}

function root_url(): string {
	return plugins_url() . '/chatrix/build/frontend/popup/';
}

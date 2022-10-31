<?php

namespace Automattic\Chatrix\Popup;

use function Automattic\Chatrix\Admin\Settings\get as get_chatrix_settings;

function register() {
	register_default_instance();
	define_config();
}

/**
 * Register the default instance of the chatrix, using values from the plugin's settings.
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

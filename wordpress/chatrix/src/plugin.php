<?php

namespace Automattic\Chatrix;

use function Automattic\Chatrix\Admin\Settings\get as get_chatrix_settings;
use function Automattic\Chatrix\Sessions\init as init_frontend_session_management;

const LOCAL_STORAGE_KEY_PREFIX = 'hydrogen_sessions_v1';

function asset_url( $asset_path ): string {
	return plugins_url( "../frontend/$asset_path", __FILE__ );
}

function chatrix_config() {
	return apply_filters( 'chatrix_config', false );
}

function main() {
	init_frontend_session_management( LOCAL_STORAGE_KEY_PREFIX );

	// Declare the default instance of chatrix.
	add_filter(
		'chatrix_instances',
		function () {
			$settings = get_chatrix_settings();
			if ( empty( $settings ) ) {
				return array();
			}

			return array(
				'default' => array(
					'homeserver'    => $settings['homeserver'],
					'room_id'       => $settings['room'],
					'login_methods' => array( 'password', 'sso' ), // TODO: don't hardcode login methods
					'pages'         => 'all' === $settings['show_on'] ? 'all' : $settings['pages'],
				),
			);
		},
		0
	);

	// Return the configuration for the current page, if any.
	add_filter(
		'chatrix_config',
		function () {
			if ( ! is_page() ) {
				return null;
			}

			global $post;

			$page_id   = $post->ID;
			$instances = apply_filters( 'chatrix_instances', false );

			foreach ( $instances as $instance_id => $instance ) {
				$config = array(
					'url'         => rest_url( "chatrix/config/$instance_id" ),
					'config'      => $instance,
					'instance_id' => $instance_id,
				);

				if ( 'all' === $instance['pages'] ) {
					return $config;
				}

				if ( in_array( (string) $page_id, $instance['pages'], true ) ) {
					return $config;
				}
			}

			return null;
		}
	);

	// Declare rest routes for the config of each chatrix instance.
	add_action(
		'rest_api_init',
		function () {
			$instances = apply_filters( 'chatrix_instances', false );
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

	// Chatrix accepts some configuration through properties on the window object.
	// Ideally we would use wp_localize_script() but it cannot write to the `window` object.
	// So instead we hook to wp_head and set the properties explicitly.
	add_action(
		'wp_head',
		function () {
			$config = chatrix_config();
			if ( $config ) {
				$current_user      = wp_get_current_user();
				$local_storage_key = LOCAL_STORAGE_KEY_PREFIX;

				if ( ! empty( $config['instance_id'] ) ) {
					$local_storage_key = $local_storage_key . '_' . $config['instance_id'];
				}

				if ( 0 !== $current_user->ID ) {
					$local_storage_key = $local_storage_key . '_' . $current_user->user_login;
				}
				?>
				<script type="text/javascript">
					window.CHATRIX_HTML_LOCATION = "<?php echo esc_url( asset_url( 'chatrix.html' ) ); ?>";
					window.CHATRIX_CONFIG_LOCATION = "<?php echo esc_url( $config['url'] ); ?>";
					window.CHATRIX_LOCAL_STORAGE_KEY = "<?php echo esc_js( $local_storage_key ); ?>";
				</script>
				<?php
			}
		}
	);

	add_action(
		'wp_enqueue_scripts',
		function () {
			if ( chatrix_config() ) {
				wp_enqueue_script( 'chatrix-parent-js', asset_url( 'assets/parent.js' ), array(), '1.0', true );
			}
		}
	);

	// Output the script tag in the format expected by chatrix.
	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $src ) {
			if ( 'chatrix-parent-js' === $handle ) {
				// This triggers the WordPress.WP.EnqueuedResources.NonEnqueuedScript phpcs rule.
				// However, we're not actually rendering anything here, we're pre-processing the already-enqueued script.
				// The fact that this code triggers phpcs is likely a bug in phpcs.
				// phpcs:ignore
				$tag = '<script id="chatrix-script" type="module" src="' . esc_url( $src ) . '"></script>';
			}

			return $tag;
		},
		10,
		3
	);
}

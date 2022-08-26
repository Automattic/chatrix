<?php

namespace Automattic\Chatrix;

const LOCAL_STORAGE_KEY_PREFIX = 'hydrogen_sessions_v1';

function asset_url( $asset_path ): string {
	return plugins_url( "../frontend/$asset_path", __FILE__ );
}

function chatrix_config() {
	return apply_filters( 'chatrix_configuration', false );
}

function main() {
	// Declare all instances of chatrix.
	add_filter(
		'chatrix_instances',
		function () {
			$instances = get_option( 'chatrix_instances' );

			return empty( $instances ) ? null : $instances;
		},
		0
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
						'methods'  => 'GET',
						'callback' => function () use ( $instances, $instance_id ) {
							return $instances[ $instance_id ];
						},
					)
				);
			}
		}
	);

	// Return the configuration for the current page, if any.
	add_filter(
		'chatrix_configuration',
		function () {
			$instances = apply_filters( 'chatrix_instances', false );
			$page_uri  = str_replace( home_url() . '/', '', get_permalink() );

			// The instance id is the $uri without the trailing '/'.
			$instance_id = rtrim( $page_uri, '/' );
			if ( ! $instances || ! array_key_exists( $instance_id, $instances ) ) {
				return null;
			}

			return array(
				'url'         => rest_url( "chatrix/config/$instance_id" ),
				'config'      => $instances[ $instance_id ],
				'instance_id' => $instance_id,
			);
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
				$current_user = wp_get_current_user();

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

	// Logs out user from Chatrix on non-logged in page load, if any session exists in localStorage.
	foreach ( array( 'wp_footer', 'login_footer' ) as $footer_hook ) {
		add_action(
			$footer_hook,
			function() {
				if ( ! is_user_logged_in() ) {
					?>
					<script type="text/javascript">
						async function invalidateChatrixSession(session) {
							await fetch(session.homeserver + '/_matrix/client/v3/logout', {
								method: 'POST',
								headers: {
									'Authorization': 'Bearer ' + session.accessToken,
								},
							});
						}
						(function() {
							for (let i=0; i<localStorage.length; i++) {
								let key = localStorage.key(i);
								if (!key.startsWith(LOCAL_STORAGE_KEY_PREFIX)) {
									continue;
								}
								this.invalidateChatrixSession(
									JSON.parse(localStorage.getItem(key))[0]
								);
								localStorage.removeItem(key);
							}
						})();
					</script>
					<?php
				}
			}
		);
	}

	// Enqueue the script only when chatrix_configuration filter is set.
	add_action(
		'wp_enqueue_scripts',
		function () {
			if ( chatrix_config() ) {
				wp_enqueue_script( 'chatrix-script', asset_url( 'assets/parent.js' ), array(), '1.0', true );
			}
		}
	);

	// Output the script tag in the format expected by chatrix.
	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $src ) {
			if ( 'chatrix-script' === $handle ) {
				// This triggers the WordPress.WP.EnqueuedResources.NonEnqueuedScript phpcs rule.
				// However, we're not actually rendering anything here, we're just assigning to a variable.
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

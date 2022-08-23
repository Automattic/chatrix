<?php

namespace Automattic\Chatrix;

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
			if ( ! array_key_exists( $instance_id, $instances ) ) {
				return null;
			}

			return array(
				'url'    => rest_url( "chatrix/config/$instance_id" ),
				'config' => $instances[ $instance_id ],
			);
		}
	);

	// Chatterbox accepts some configuration through properties on the window object.
	// Ideally we would use wp_localize_script() but it cannot write to the `window` object.
	// So instead we hook to wp_head and set the properties explicitly.
	add_action(
		'wp_head',
		function () {
			$config = chatrix_config();
			if ( $config ) {
				$current_user = wp_get_current_user();
				?>
				<script type="text/javascript">
					window.CHATTERBOX_HTML_LOCATION = "<?php echo esc_url( asset_url( 'chatterbox.html' ) ); ?>";
					window.CHATTERBOX_CONFIG_LOCATION = "<?php echo esc_url( $config['url'] ); ?>";
					<?php if ( 0 === $current_user->ID ) { ?>
						window.CHATTERBOX_BACKEND_USER_ID = null;
					<?php } else { ?>
						window.CHATTERBOX_BACKEND_USER_ID = "<?php echo esc_js( $current_user->user_login ); ?>";
					<?php } ?>
				</script>
				<?php
			}
		}
	);

	// Enqueue the script only when chatrix_configuration filter is set.
	add_action(
		'wp_enqueue_scripts',
		function () {
			if ( chatrix_config() ) {
				wp_enqueue_script( 'chatrix-script', asset_url( 'assets/parent.js' ), array(), '1.0', true );
			}
		}
	);

	// Output the script tag in the format expected by chatterbox.
	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $src ) {
			if ( 'chatrix-script' === $handle ) {
				// This triggers the WordPress.WP.EnqueuedResources.NonEnqueuedScript phpcs rule.
				// However, we're not actually rendering anything here, we're just assigning to a variable.
				// The fact that this code triggers phpcs is likely a bug in phpcs.
				// phpcs:ignore
				$tag = '<script id="chatterbox-script" type="module" src="' . esc_url( $src ) . '"></script>';
			}

			return $tag;
		},
		10,
		3
	);
}

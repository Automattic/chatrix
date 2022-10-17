<?php
/**
 * The URL parameters are received from our OpenID provider and include a nonce inside the JWT token.
 *
 * phpcs:disable WordPress.Security.NonceVerification.Recommended
 */

namespace Automattic\Chatrix\Block;

function register() {
	$block_path      = dirname( plugin_dir_path( __FILE__ ), 2 ) . '/build/block';
	$block_json_path = "$block_path/block.json";

	register_site_status_test( $block_json_path );

	if ( ! file_exists( $block_json_path ) ) {
		return;
	}

	$metadata = parse_block_json( $block_json_path );

	add_action(
		'init',
		function () use ( $block_json_path, $metadata ) {
			register_block_type(
				$block_json_path,
				array(
					'render_callback' => 'Automattic\Chatrix\Block\render',
					'attributes'      => $metadata['attributes'],
				)
			);
		}
	);
}

function render(): string {
	$login_token = null;
	if ( isset( $_GET['loginToken'] ) ) {
		$login_token = sanitize_text_field( wp_unslash( $_GET['loginToken'] ) );
	}

	$instances = apply_filters( 'chatrix_instances', array() );

	// TODO: Make it possible to use another instance.
	$instance_id = 'default';
	if ( ! isset( $instances[ $instance_id ] ) ) {
		return '';
	}

	$instance = $instances[ $instance_id ];

	$iframe_query_params = array(
		'defaultHomeserver' => rawurlencode( $instance['homeserver'] ),
		'loginToken'        => $login_token ? rawurlencode( $login_token ) : null,
	);

	$iframe_url = add_query_arg( $iframe_query_params, plugins_url() . '/chatrix/build/frontend/block/index.html' );

	ob_start();
	?>
	<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
		<iframe class="<?php echo esc_attr( 'wp-block-automattic-chatrix-iframe' ); ?>"
				title="<?php esc_attr_e( 'Chatrix Block', 'chatrix' ); ?>"
				src="<?php echo esc_url( $iframe_url ); ?>"
		></iframe>
	</div>
	<?php
	return ob_get_clean();
}

function parse_block_json( string $block_json_path ): array {
	// phpcs discourages file_get_contents for remote URLs, and recommends using wp_remote_get().
	// However, here we're dealing with a path to a file on disk, so we ignore phpcs's warning.
	// This is possibly a bug in phpcs, which seems to have code to check if the path is remote, but fails in this case.
	// For more info see https://github.com/WordPress/WordPress-Coding-Standards/issues/943.
	// phpcs:ignore
	$block_json_contents = file_get_contents( $block_json_path );

	return json_decode( $block_json_contents, true );
}

function register_site_status_test( string $block_json_path ) {
	if ( file_exists( $block_json_path ) ) {
		$label  = __( 'The block.json file exists', 'chatrix' );
		$status = 'good';
		$badge  = 'green';
	} else {
		$label  = __( 'The block.json file does not exist', 'chatrix' );
		$status = 'critical';
		$badge  = 'red';
	}

	add_filter(
		'site_status_tests',
		function ( array $tests ) use ( $label, $status, $badge ) {
			$tests['direct']['chatrix-block-json'] = array(
				'label' => __( 'The block.json file exists', 'chatrix' ),
				'test'  => function () use ( $label, $status, $badge ) {
					return array(
						'label'       => wp_kses_post( $label ),
						'status'      => $status,
						'badge'       => array(
							'label' => __( 'Chatrix', 'chatrix' ),
							'color' => $badge,
						),
						'description' =>
							'<p>' .
							__( 'If a block.json file is not found under wp-content/plugins/chatrix/build/block/block.json, the Gutenberg block will not be available.', 'chatrix' ) .
							'</p>',
						'test'        => 'chatrix-block-json',
					);
				},
			);

			return $tests;
		}
	);
}

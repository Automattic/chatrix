<?php

namespace Automattic\Chatrix\Block;

function register() {
	$block_path      = dirname( plugin_dir_path( __FILE__ ), 2 ) . '/build/block';
	$block_json_path = "$block_path/block.json";

	register_site_status_test( $block_json_path );

	if ( ! file_exists( $block_json_path ) ) {
		return;
	}

	init_javascript();

	add_action(
		'init',
		function () use ( $block_json_path ) {
			$metadata = parse_block_json( $block_json_path );
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

function render( array $attributes ): string {
	ob_start();
	$container_id = 'wp-block-automattic-chatrix-container';
	?>
	<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> id="<?php echo esc_attr( $container_id ); ?>">
		<?php // Iframe will be rendered here. ?>
	</div>
	<script>
		(function () {
			const containerId = "<?php echo esc_attr( $container_id ); ?>";
			const attributes = <?php echo wp_json_encode( $attributes ); ?>;
			AutomatticChatrixBlock.init(containerId, { attributes });
		})();
	</script>
	<?php
	return ob_get_clean();
}

function init_javascript() {
	$enqueue_script = function () {
		$handle    = 'chatrix-block-parent';
		$root_url  = root_url();
		$variables = array(
			'rootUrl' => $root_url,
		);

		wp_register_script( $handle, $root_url . 'parent.iife.js', array('wp-element'), automattic_chatrix_version(), false );
		wp_enqueue_script( $handle );
		wp_localize_script( $handle, 'automattic_chatrix_block_config', $variables );
	};

	add_action( 'wp_enqueue_scripts', $enqueue_script );
	add_action( 'admin_enqueue_scripts', $enqueue_script );
}

function root_url(): string {
	return plugins_url() . '/chatrix/build/frontend/block/';
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

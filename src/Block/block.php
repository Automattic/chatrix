<?php

namespace Automattic\Chatrix\Block;

function register() {
	$block_path      = dirname( plugin_dir_path( __FILE__ ), 2 ) . '/build/block';
	$block_json_path = "$block_path/block.json";

	register_site_status_test( $block_json_path );

	if ( ! file_exists( $block_json_path ) ) {
		return;
	}

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
	$json_data = wp_json_encode(
		array(
			'attributes' => $attributes,
		)
	);

	ob_start();
	?>
	<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> data-chatrix-block-config="<?php echo rawurlencode( $json_data ); ?>">
		<?php // The <Block> component will be rendered here. ?>
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

	$relative_path = str_replace( ABSPATH, '', $block_json_path );

	add_filter(
		'site_status_tests',
		function ( array $tests ) use ( $label, $status, $badge, $relative_path ) {
			$tests['direct']['chatrix-block-json'] = array(
				'label' => __( 'The block.json file exists', 'chatrix' ),
				'test'  => function () use ( $label, $status, $badge, $relative_path ) {
					return array(
						'label'       => wp_kses_post( $label ),
						'status'      => $status,
						'badge'       => array(
							'label' => __( 'Chatrix', 'chatrix' ),
							'color' => $badge,
						),
						'description' =>
							'<p>' .
							sprintf(
								/* translators: %1$s is the file name, %2$s is the file path */
								__( 'If a %1$s file is not found under %2$s, the Chatrix block will not be available.', 'chatrix' ),
								'<code>block.json</code>',
								'<code>' . $relative_path . '</code>'
							) .
							'</p>',
						'test'        => 'chatrix-block-json',
					);
				},
			);

			return $tests;
		}
	);
}

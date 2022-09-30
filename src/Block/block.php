<?php

namespace Automattic\Chatrix\Block;

function register() {
	$block_path = realpath( plugin_dir_path( __FILE__ ) . '../../build-block' );

	add_action(
		'init',
		function () use ( $block_path ) {
			register_block_type(
				"$block_path/block.json",
				array(
					'render_callback' => 'Automattic\Chatrix\Block\render',
				)
			);
		}
	);
}

function render() {
	ob_start();
	echo 'hello';

	return ob_get_clean();
}

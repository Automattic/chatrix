<?php
/**
 * Plugin Name: Chatrix
 * Description: Embed the Chatrix Matrix client into WordPress pages.
 * Author: Automattic
 * Author URI: https://automattic.com/
 * Plugin URI: https://github.com/Automattic/chatrix
 * Version: 1.0
 */

use function Automattic\Chatrix\Admin\main as adminMain;
use function Automattic\Chatrix\main;

if ( ! function_exists( 'Automattic\Chatrix\main' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

if ( is_admin() ) {
	// Link to the plugin settings from the plugins page.
	add_filter(
		'plugin_action_links_' . plugin_basename( __FILE__ ),
		function ( $links ) {
			$links[] = '<a href="' . admin_url( 'options-general.php?page=chatrix' ) . '">' . __( 'Settings' ) . '</a>';

			return $links;
		}
	);

	adminMain();
}

// Register Gutenberg block.
add_action(
	'init',
	function () {
		$block_directory = plugin_dir_path( __FILE__ ) . 'build-block';
		register_block_type(
			"$block_directory/block.json",
			array(
				'render_callback' => function () use ( $block_directory ) {
					ob_start();
					require "$block_directory/template.php";

					return ob_get_clean();
				},
			)
		);
	}
);

main();

<?php
/**
 * Plugin Name: Chatrix
 * Description: Embed the Chatrix Matrix client into WordPress pages.
 * Author: Automattic
 * Author URI: https://automattic.com/
 * Plugin URI: https://github.com/Automattic/chatrix
 * Version: 0.2.0
 */

const AUTOMATTIC_CHATRIX_VERSION = '0.2.0';

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

main();

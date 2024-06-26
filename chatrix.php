<?php
/**
 * Plugin Name: Chatrix
 * Description: Embed the Chatrix Matrix client into WordPress pages.
 * Author: WordPress.Org Community
 * Author URI: https://wordpress.org/
 * Plugin URI: https://github.com/Automattic/chatrix
 * Version: 0.9.1
 */

use function Automattic\Chatrix\Admin\main as adminMain;
use function Automattic\Chatrix\main;

if ( ! function_exists( 'Automattic\Chatrix\main' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

function automattic_chatrix_version(): string {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG === true ) {
		// So that assets aren't cached in development environments.
		return strval( time() );
	}

	// Do not edit this line, it's automatically set by bin/prepare-release.sh.
	$version = '0.9.1';

	return $version;
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

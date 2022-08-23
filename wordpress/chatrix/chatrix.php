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
	adminMain();
}

main();

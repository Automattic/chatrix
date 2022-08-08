<?php

/**
 * Plugin Name:       Chatrix - Matrix embedded client for WordPress
 * Plugin URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 * Description:       Embeds the matrix client on any WordPress page with a configured room on per page level
 * Version:           0.1
 * Author:            Orbit Team
 * Author URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 */

if ( is_admin() ) {
	include( plugin_dir_path( __FILE__ ) . 'admin.php' );
}

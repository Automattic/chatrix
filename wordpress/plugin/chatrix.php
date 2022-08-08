<?php
/**
 * Plugin Name: Chatrix
 * Description: Embed the Chatrix Matrix client into WordPress pages.
 * Author: Automattic
 * Author URI: https://automattic.com/
 * Plugin URI: https://github.com/Automattic/chatrix
 * Version: 1.0
 */

namespace Chatrix;

add_filter( "chatrix_configuration", function () {
	return array(
		"homeserver"              => "https://orbit-sandbox.ems.host",
		"login_methods"           => array( "sso" ),
		"welcome_message_heading" => "Welcome to chatrix!",
		"welcome_message_text"    => "To start chatting, log in with one of the options below.",
		"auto_join_room"          => "!OTrhRALmywAzyMUeaj:orbit-sandbox.ems.host",
	);
} );

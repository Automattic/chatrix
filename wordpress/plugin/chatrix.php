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

function chatrix_config() {
	return apply_filters( 'chatrix_configuration', false );
}

add_filter( "chatrix_configuration", function () {
	return array(
		"url"    => rest_url( 'chatrix/config' ),
		"config" => array(
			"homeserver"              => "https://orbit-sandbox.ems.host",
			"login_methods"           => array( "sso" ),
			"welcome_message_heading" => "Welcome to chatrix!",
			"welcome_message_text"    => "To start chatting, log in with one of the options below.",
			"auto_join_room"          => "!OTrhRALmywAzyMUeaj:orbit-sandbox.ems.host",
		)
	);
} );

add_action( 'rest_api_init', function () {
	if ( $config = chatrix_config() ) {
		register_rest_route( 'chatrix', 'config', array(
			'methods'  => 'GET',
			'callback' => function () use ( $config ) {
				return $config["config"];
			}
		) );
	}
} );

// We need to set window.CHATTERBOX_CONFIG_LOCATION.
// However, we can't use wp_localize_script() since it cannot write to the `window` object.
// So to work around this, we instead hook to wp_head and set it explicitly.
add_action( 'wp_head', function () {
	if ( $config = chatrix_config() ) {
		?>
        <script type="text/javascript">
            window.CHATTERBOX_CONFIG_LOCATION = "<?php echo $config["url"] ?>";
        </script>
		<?php
	}
} );

// Enqueue the script only when chatrix_configuration filter is set.
add_action( 'wp_enqueue_scripts', function () {
	if ( chatrix_config() ) {
		$url = "http://localhost:3000/src/parent/parent.ts";
		wp_enqueue_script( 'chatrix-script', $url, array(), null, true );
	}
} );

// Output the script tag in the format expected by chatterbox.
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
	if ( $handle === "chatrix-script" ) {
		$tag = '<script id="chatterbox-script" type="module" src="' . esc_url( $src ) . '"></script>';
	}

	return $tag;
}, 10, 3 );

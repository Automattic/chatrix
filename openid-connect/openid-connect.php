<?php
/**
 * Plugin Name: OpenID Connect Server
 * Version: 0.1
 */
namespace OpenIDConnectServer;
use OAuth2;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/class-rest.php';
require_once __DIR__ . '/class-oauth2-storage.php';

add_action( 'plugins_loaded', function() {
	$config = array(
		'use_openid_connect' => true,
		'issuer' => 'https://labs.ashfame.com/wp/',
	);

	$server = new OAuth2\Server( new OAuth2_Storage(), $config );

	$server->addStorage(
		new OAuth2\Storage\Memory(
			array(
				'keys' => array(
					'private_key' => file_get_contents( __DIR__ . '/oidc.key' ), // generate using: openssl genrsa -out oidc.key 4096
					'public_key'  => file_get_contents( __DIR__ . '/public.key' ), // generate using: openssl rsa -in oidc.key -pubout -out public.key
				)
			)
		),
		'public_key'
	);

    new Rest( $server );
} );



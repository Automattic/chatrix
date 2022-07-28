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

add_action( 'template_redirect', function() {
	if ( $_SERVER['REQUEST_URI'] !== '/.well-known/jwks.json' ) {
		return;
	}
	header( 'Content-type: application/json' );

	$options = array(
		'use' => 'sig',
		'alg' => 'RS256',
	);

	$keyFactory = new \Strobotti\JWK\KeyFactory();
	echo $keyFactory->createFromPem( file_get_contents( __DIR__ . '/public.key' ), $options );
	exit;
} );

add_action( 'template_redirect', function() {
	if ( $_SERVER['REQUEST_URI'] !== '/.well-known/openid-configuration' ) {
		return;
	}
	header( 'Content-type: application/json' );
	echo json_encode( array(
		'issuer' => home_url(),
		'authorization_endpoint' => rest_url( 'openid-connect/authorize' ),
		'token_endpoint' => rest_url( 'openid-connect/token' ),
		'userinfo_endpoint' => rest_url( 'openid-connect/userinfo' ),
		'jwks_uri' => home_url( '/.well-known/jwks.json' ),
		'scopes_supported' => array( 'openid', 'profile' ),
	) );
	exit;
} );

add_action( 'template_redirect', function() {
	if ( 0 !== strpos( $_SERVER['REQUEST_URI'], '/openid-connect/authenticate' ) ) {
		return;
	}
	$request = OAuth2\Request::createFromGlobals();

	?>
	<html><body>
		<h1>OpenID Connect</h1>
		<form method="post" action="<?php echo esc_url( rest_url( Rest::NAMESPACE . '/authorize' ) ); ?>">
			<?php wp_nonce_field( 'wp_rest' ); /* The nonce will give the REST call the userdata. */ ?>
			<?php foreach ( $request->getAllQueryParameters() as $key => $value ) : ?>
				<input type="hidden" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>" />
			<?php endforeach; ?>
			<label>Authorize Matrix?</label><br />
			<input type="submit" name="authorize" value="Authorize" />
			<a href="<?php echo esc_url( home_url() ); ?>" target="_top">Go back</a>
		</form>
	</body></html>
	<?php
	exit;
} );

add_action( 'plugins_loaded', function() {
	$config = array(
		'use_jwt_access_tokens' => true,
		'use_openid_connect' => true,
		'issuer' => home_url(),
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



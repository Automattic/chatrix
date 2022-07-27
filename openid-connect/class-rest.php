<?php
namespace OpenIDConnectServer;
use OAuth2;

class Rest {
	private $server;
	public function __construct( $server ) {
		$this->server = $server;
		add_action( 'rest_api_init', array( $this, 'add_rest_routes' ) );
	}

	public function add_rest_routes() {
		// register_rest_route(
		// 	'openid-connect',
		// 	'token',
		// 	array(
		// 		'methods'             => 'POST',
		// 		'callback'            => array( $this, 'token' ),
		// 		'permission_callback' => '__return_true',
		// 	)
		// );
		register_rest_route(
			'openid-connect',
			'authorize',
			array(
				'methods'             => 'GET,POST',
				'callback'            => array( $this, 'authorize' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public function authorize() {
		$request = OAuth2\Request::createFromGlobals();
		$response = new OAuth2\Response();

		if ( ! $this->server->validateAuthorizeRequest( $request, $response ) ) {
			$response->send();
			exit;
		}

		if (empty($_POST)) {
			header('Content-type: text/html');
			echo '
			<form method="post">
			<label>Authorize Chatrix?</label><br />
			<input type="submit" name="authorized" value="yes">
			<input type="submit" name="authorized" value="no">
			</form>';
			exit;
		}

		// print the authorization code if the user has authorized your client
		$is_authorized = ($_POST['authorized'] === 'yes'); // @TODO Add a nonce check

		$this->server->handleAuthorizeRequest($request, $response, $is_authorized);

		// // parse the returned URL to get the authorization code
		// $parts = parse_url($response->getHttpHeader('Location'));
		// parse_str($parts['query'], $query);

		// // pull the code from storage and verify an "id_token" was added
		// $code = $this->server->getStorage('authorization_code')
		// ->getAuthorizationCode($query['code']);

		$response->send();
		exit;
	}
}

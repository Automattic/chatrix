<?php

/**
 * Plugin Name:       DotOrg OAuth
 * Plugin URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 * Description:       Barebones OAuth server for Chatrix (embdedded matrix client)
 * Version:           0.1
 * Author:            Orbit Team
 * Author URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 */

class A8C_DotOrg_OAuth {
	private $server;

	public function __construct() {
		add_action( 'wp_ajax_dotorg_oauth', array( $this, 'ajax_handler' ) );
		add_action( 'wp_ajax_nopriv_dotorg_oauth', array( $this, 'ajax_handler' ) );
	}

	public function ajax_handler() {
		if ( ! is_user_logged_in() ) {
			auth_redirect();
		}

		$this->ensure_db_schema();
		$this->bootstrap_server();
		$this->summon_controller();
	}

	// @TODO implement db migration logic
	public function ensure_db_schema() {
		$sql = <<<DBSCHEMA
		CREATE TABLE oauth_clients (
			client_id             VARCHAR(80)   NOT NULL,
			client_secret         VARCHAR(80),
			redirect_uri          VARCHAR(2000),
			grant_types           VARCHAR(80),
			scope                 VARCHAR(4000),
			user_id               VARCHAR(80),
			PRIMARY KEY (client_id)
		  );

		  CREATE TABLE oauth_access_tokens (
			access_token         VARCHAR(40)    NOT NULL,
			client_id            VARCHAR(80)    NOT NULL,
			user_id              VARCHAR(80),
			expires              TIMESTAMP      NOT NULL,
			scope                VARCHAR(4000),
			PRIMARY KEY (access_token)
		  );

		  CREATE TABLE oauth_authorization_codes (
			authorization_code  VARCHAR(40)     NOT NULL,
			client_id           VARCHAR(80)     NOT NULL,
			user_id             VARCHAR(80),
			redirect_uri        VARCHAR(2000),
			expires             TIMESTAMP       NOT NULL,
			scope               VARCHAR(4000),
			id_token            VARCHAR(1000),
			PRIMARY KEY (authorization_code)
		  );

		  CREATE TABLE oauth_refresh_tokens (
			refresh_token       VARCHAR(40)     NOT NULL,
			client_id           VARCHAR(80)     NOT NULL,
			user_id             VARCHAR(80),
			expires             TIMESTAMP       NOT NULL,
			scope               VARCHAR(4000),
			PRIMARY KEY (refresh_token)
		  );

		  CREATE TABLE oauth_users (
			username            VARCHAR(80),
			password            VARCHAR(80),
			first_name          VARCHAR(80),
			last_name           VARCHAR(80),
			email               VARCHAR(80),
			email_verified      BOOLEAN,
			scope               VARCHAR(4000),
			PRIMARY KEY (username)
		  );

		  CREATE TABLE oauth_scopes (
			scope               VARCHAR(80)     NOT NULL,
			is_default          BOOLEAN,
			PRIMARY KEY (scope)
		  );

		  CREATE TABLE oauth_jwt (
			client_id           VARCHAR(80)     NOT NULL,
			subject             VARCHAR(80),
			public_key          VARCHAR(2000)   NOT NULL
		  );
		DBSCHEMA;
	}

	public function bootstrap_server() {
		$dsn      = 'mysql:dbname=dotorg_oauth;host=localhost';
		$username = DB_USER;
		$password = DB_PASSWORD;

		// error reporting (this is a demo, after all!)
		ini_set('display_errors',1);error_reporting(E_ALL);

		// Autoloading (composer is preferred, but for this example let's just do this)
		require_once('oauth2-server/src/OAuth2/Autoloader.php');
		OAuth2\Autoloader::register();

		// $dsn is the Data Source Name for your database, for exmaple "mysql:dbname=my_oauth2_db;host=localhost"
		$storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));

		// Pass a storage object or array of storage objects to the OAuth2 server class
		$this->server = new OAuth2\Server($storage);

		// Add the "Client Credentials" grant type (it is the simplest of the grant types)
		$this->server->addGrantType(new OAuth2\GrantType\ClientCredentials($storage));

		// Add the "Authorization Code" grant type (this is where the oauth magic happens)
		$this->server->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
	}

	public function summon_controller() {
		switch ( $_REQUEST[ 'controller' ] ) {
			case 'authorize':
				$this->authorize_controller();
				break;
			case 'token':
				$this->token_controller();
				break;
			case 'resource':
				$this->resource_controller();
				break;
			default:
				wp_die( 'Lost?' );
		}
	}

	public function authorize_controller() {
		$request = OAuth2\Request::createFromGlobals();
		$response = new OAuth2\Response();

		// validate the authorize request
		if (!$this->server->validateAuthorizeRequest($request, $response)) {
			$response->send();
			die;
		}
		// display an authorization form
		if (empty($_POST)) {
		  exit('
		<form method="post">
		  <label>Authorize Chatrix?</label><br />
		  <input type="submit" name="authorized" value="yes">
		  <input type="submit" name="authorized" value="no">
		</form>');
		}

		// print the authorization code if the user has authorized your client
		$is_authorized = ($_POST['authorized'] === 'yes'); // @TODO Add a nonce check
		$this->server->handleAuthorizeRequest($request, $response, $is_authorized);
		if ($is_authorized) {
		  // this is only here so that you get to see your code in the cURL request. Otherwise, we'd redirect back to the client
		  $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=')+5, 40);
		  exit("SUCCESS! Authorization Code: $code");
		}
		$response->send();
	}

	public function token_controller() {
		// Handle a request for an OAuth2.0 Access Token and send the response to the client
		$this->server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
	}

	public function resource_controller() {
		// Handle a request to a resource and authenticate the access token
		if ( ! $this->server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
			$this->server->getResponse()->send();
			die;
		}
		echo json_encode(array('success' => true, 'message' => 'You accessed my APIs!'));
	}
}

new A8C_DotOrg_OAuth();

<?php
namespace OpenIDConnectServer;
use OAuth2;

class OAuth2_Storage implements OAuth2\Storage\ClientInterface, OAuth2\OpenID\Storage\AuthorizationCodeInterface, OAuth2\OpenID\Storage\UserClaimsInterface {
	private $debug_output = false;
	/**
	 * Fetch authorization code data (probably the most common grant type).
	 *
	 * Retrieve the stored data for the given authorization code.
	 *
	 * Required for OAuth2::GRANT_TYPE_AUTH_CODE.
	 *
	 * @param $code
	 * Authorization code to be check with.
	 *
	 * @return
	 * An associative array as below, and NULL if the code is invalid
	 * @code
	 * return array(
	 *     "client_id"    => CLIENT_ID,      // REQUIRED Stored client identifier
	 *     "user_id"      => USER_ID,        // REQUIRED Stored user identifier
	 *     "expires"      => EXPIRES,        // REQUIRED Stored expiration in unix timestamp
	 *     "redirect_uri" => REDIRECT_URI,   // REQUIRED Stored redirect URI
	 *     "scope"        => SCOPE,          // OPTIONAL Stored scope values in space-separated string
	 * );
	 * @endcode
	 *
	 * @see http://tools.ietf.org/html/rfc6749#section-4.1
	 *
	 * @ingroup oauth2_section_4
	 */
	public function getAuthorizationCode( $code ) {
		if ( $this->debug_output ) {
			echo 'getAuthorizationCode'; var_dump( compact( 'code' ) );
		}
		return array(
			    "client_id"    => 'oYgRVPEzqRAzXGOyABKuWjOXeKGoTbIo',      // REQUIRED Stored client identifier
			    "user_id"      => 'USER_ID',        // REQUIRED Stored user identifier
			    "expires"      => 'EXPIRES',        // REQUIRED Stored expiration in unix timestamp
			    "redirect_uri" => 'https://orbit-sandbox.ems.host/_synapse/client/oidc/callback',   // REQUIRED Stored redirect URI
			    "scope"        => 'openid profile',          // OPTIONAL Stored scope values in space-separated string
			);
	}

	/**
	 * Take the provided authorization code values and store them somewhere.
	 *
	 * This function should be the storage counterpart to getAuthCode().
	 *
	 * If storage fails for some reason, we're not currently checking for
	 * any sort of success/failure, so you should bail out of the script
	 * and provide a descriptive fail message.
	 *
	 * Required for OAuth2::GRANT_TYPE_AUTH_CODE.
	 *
	 * @param string $code         - authorization code to be stored.
	 * @param mixed $client_id     - client identifier to be stored.
	 * @param mixed $user_id       - user identifier to be stored.
	 * @param string $redirect_uri - redirect URI(s) to be stored in a space-separated string.
	 * @param int    $expires      - expiration to be stored as a Unix timestamp.
	 * @param string $scope        - OPTIONAL scopes to be stored in space-separated string.
	 * @param string $id_token     - OPTIONAL the OpenID Connect id_token.
	 *
	 * @ingroup oauth2_section_4
	 */
	public function setAuthorizationCode( $code, $client_id, $user_id, $redirect_uri, $expires, $scope = null, $id_token = null ) {
		if ( $this->debug_output ) {
			echo 'setAuthorizationCode'; var_dump( compact( 'code', 'client_id', 'user_id', 'redirect_uri', 'expires', 'scope', 'id_token' ) );
		}
	}

	/**
	 * once an Authorization Code is used, it must be expired
	 *
	 * @see http://tools.ietf.org/html/rfc6749#section-4.1.2
	 *
	 *    The client MUST NOT use the authorization code
	 *    more than once.  If an authorization code is used more than
	 *    once, the authorization server MUST deny the request and SHOULD
	 *    revoke (when possible) all tokens previously issued based on
	 *    that authorization code
	 *
	 */
	public function expireAuthorizationCode( $code ) {
		if ( $this->debug_output ) {
			echo 'expireAuthorizationCode'; var_dump( compact( 'code' ) );
		}

	}

	/**
	 * Get client details corresponding client_id.
	 *
	 * OAuth says we should store request URIs for each registered client.
	 * Implement this function to grab the stored URI for a given client id.
	 *
	 * @param $client_id
	 * Client identifier to be check with.
	 *
	 * @return array
	 *               Client details. The only mandatory key in the array is "redirect_uri".
	 *               This function MUST return FALSE if the given client does not exist or is
	 *               invalid. "redirect_uri" can be space-delimited to allow for multiple valid uris.
	 *               <code>
	 *               return array(
	 *               "redirect_uri" => REDIRECT_URI,      // REQUIRED redirect_uri registered for the client
	 *               "client_id"    => CLIENT_ID,         // OPTIONAL the client id
	 *               "grant_types"  => GRANT_TYPES,       // OPTIONAL an array of restricted grant types
	 *               "user_id"      => USER_ID,           // OPTIONAL the user identifier associated with this client
	 *               "scope"        => SCOPE,             // OPTIONAL the scopes allowed for this client
	 *               );
	 *               </code>
	 *
	 * @ingroup oauth2_section_4
	 */
	public function getClientDetails( $client_id ) {
		if ( $this->debug_output ) {
			echo 'getClientDetails'; var_dump( compact( 'client_id' ) );
		}

		switch ( $client_id ) {
			case 'oYgRVPEzqRAzXGOyABKuWjOXeKGoTbIo':
				return array(
					'redirect_uri' => 'https://orbit-sandbox.ems.host/_synapse/client/oidc/callback',
					'scope' => 'openid profile'
				);
		}

		return false;
	}

	/**
	 * Get the scope associated with this client
	 *
	 * @return
	 * STRING the space-delineated scope list for the specified client_id
	 */
	public function getClientScope( $client_id ) {
		if ( $this->debug_output ) {
			echo 'getClientScope'; var_dump( compact( 'client_id' ) );
		}
		switch ( $client_id ) {
			case 'oYgRVPEzqRAzXGOyABKuWjOXeKGoTbIo':
				return 'openid profile';
		}

		return '';
	}

	/**
	 * Check restricted grant types of corresponding client identifier.
	 *
	 * If you want to restrict clients to certain grant types, override this
	 * function.
	 *
	 * @param $client_id
	 * Client identifier to be check with.
	 * @param $grant_type
	 * Grant type to be check with
	 *
	 * @return
	 * TRUE if the grant type is supported by this client identifier, and
	 * FALSE if it isn't.
	 *
	 * @ingroup oauth2_section_4
	 */
	public function checkRestrictedGrantType( $client_id, $grant_type ) {
		if ( $this->debug_output ) {
			echo 'checkRestrictedGrantType'; var_dump( compact( 'client_id', 'grant_type' ) );
		}
		return true;
	}


	/**
	 * Return claims about the provided user id.
	 *
	 * Groups of claims are returned based on the requested scopes. No group
	 * is required, and no claim is required.
	 *
	 * @param mixed  $user_id - The id of the user for which claims should be returned.
	 * @param string $scope   - The requested scope.
	 * Scopes with matching claims: profile, email, address, phone.
	 *
	 * @return array - An array in the claim => value format.
	 *
	 * @see http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims
	 */
	public function getUserClaims( $user_id, $scope ) {
		if ( $this->debug_output ) {
			echo 'getUserClaims'; var_dump( compact( 'user_id', 'scope' ) );
		}
		return array();
	}
}

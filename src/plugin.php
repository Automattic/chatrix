<?php

namespace Automattic\Chatrix;

use function Automattic\Chatrix\Block\register as register_block;
use function Automattic\Chatrix\Popup\register as register_popup;
use function Automattic\Chatrix\Sessions\init as init_frontend_session_management;

const LOCAL_STORAGE_KEY_PREFIX = 'chatrix';

function main() {
	init_frontend_session_management( LOCAL_STORAGE_KEY_PREFIX );
	register_block();
	register_popup();
}

function get_local_storage_key( string $instance_id ): string {
	$current_user      = wp_get_current_user();
	$local_storage_key = LOCAL_STORAGE_KEY_PREFIX;

	if ( ! empty( $instance_id ) ) {
		$local_storage_key .= '_' . $instance_id;
	}

	if ( 0 !== $current_user->ID ) {
		$local_storage_key .= '_' . $current_user->user_login;
	}

	return $local_storage_key;
}

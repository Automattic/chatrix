<?php

namespace Automattic\Chatrix\Admin;

function main() {
	add_action( 'admin_init', 'Automattic\Chatrix\Admin\settings' );
}

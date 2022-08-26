<?php

namespace Automattic\Chatrix\Admin\Settings;

use function Automattic\Chatrix\Admin\admin_asset_url;

function scripts() {
	wp_enqueue_style(
		'chatrix-style',
		admin_asset_url( 'settings.css' ),
		array(),
		'1.0'
	);

	wp_enqueue_script(
		'chatrix-settings-js',
		admin_asset_url( 'settings.js' ),
		array(
			'wp-element',
			'wp-i18n',
		),
		'1.0',
		true
	);
}

function main() {
	add_options_page(
		'Chatrix',
		'Chatrix',
		'manage_options',
		'chatrix',
		function () {
			?>
			<div id="chatrix-settings">
			</div>
			<?php
		}
	);
}

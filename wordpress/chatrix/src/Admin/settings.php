<?php

namespace Automattic\Chatrix\Admin\Settings;

function scripts() {
	wp_enqueue_script(
		'chatrix-settings-js',
		plugins_url( 'settings.js', __FILE__ ),
		array(
			'wp-element',
			'wp-i18n'
		),
		'1.0'
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
			<div id="chatrix-settings-page">
			</div>
			<?php
		}
	);
}

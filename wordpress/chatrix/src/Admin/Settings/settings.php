<?php

namespace Automattic\Chatrix\Admin\Settings;

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

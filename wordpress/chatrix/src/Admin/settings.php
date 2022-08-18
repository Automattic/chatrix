<?php
// phpcs:ignoreFile

namespace Automattic\Chatrix\Admin;

function settings() {
	register_setting(
		'discussion',
		'chatrix_instances',
		array(
			'type'              => 'array',
			'default'           => null,
			'sanitize_callback' => function ( $value ) {
				return $value;
			},
		)
	);

	// Add a section under Settings -> Discussion.
	add_settings_section(
		'chatrix_section',
		'Chatrix',
		function () {
			?>
			<p>Configure the Chatrix Matrix client.</p>
			<?php
		},
		'discussion'
	);

	// Add a field to chatrix_section.
	add_settings_field(
		'chatrix_instances',
		'Instances',
		function () {
			$instances  = get_option( 'chatrix_instances', array() );
			$serialized = $instances ? json_encode( $instances ) : null;
			?>
			<fieldset>
				<legend class="screen-reader-text"><span>Instances</span></legend>
				<p>
					<label for="chatrix_instances">
						You can display different instances of Chatrix on different pages.<br/>
						Provide the configuration of each instance here.<br/>
						Chatrix will be displayed if the URI of the page's permalink (without the trailing /) matches
						the instance's name.<br/>
						For example, the <code>about</code> instance will be displayed in the page with URI <code>/about/</code>.
					</label>
				</p>
				<p>
					Example:
					<code style="display: block; white-space: pre-wrap;">
						<?php // @formatter:off ?>

{
	'about': {
		'homeserver': 'https://matrix.org',
		'auto_join_room': '!foo:matrix.org',
	},
	'contact': {
		'homeserver': 'https://matrix.org',
		'auto_join_room': '!bar:matrix.org',
	}
}
						<?php // @formatter:on ?>
					</code>
				</p>
				<p><textarea name="chatrix_instances" rows="10" id="chatrix_instances"
				             class="large-text code"><?php echo $serialized; ?></textarea></p>
			</fieldset>
			<?php
		},
		'discussion',
		'chatrix_section'
	);
}

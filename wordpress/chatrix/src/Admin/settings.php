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
				$value = sanitize_textarea_field( $value );
				$value = htmlspecialchars_decode( $value );
				if ( empty( $value ) ) {
					return $value;
				}

				$instances = json_decode( $value, true );
				if ( json_last_error() ) {
					add_settings_error( 'chatrix_instances', 'chatrix_instances', 'Chatrix instances configuration must be a valid JSON document.' );
				}

				// TODO: Validate each instance is a valid chatrix config.json.

				return $instances;
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
			$instances  = get_option( 'chatrix_instances' );
			$serialized = $instances ? json_encode( $instances, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ) : null;
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
	"about": {
		"homeserver": "https://matrix.org",
		"auto_join_room": "!foo:matrix.org"
	},
	"contact": {
		"homeserver": "https://matrix.org",
		"auto_join_room": "!bar:matrix.org"
	}
}

						<?php // @formatter:on ?>
					</code>
				</p>
				<p><textarea name="chatrix_instances" rows="10" id="chatrix_instances"
				             class="large-text code"><?php echo htmlspecialchars( $serialized ); ?></textarea></p>
			</fieldset>
			<?php
		},
		'discussion',
		'chatrix_section'
	);
}

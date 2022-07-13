<?php

/**
 * Plugin Name:       Chatterbox - Matrix embedded client for WordPress
 * Plugin URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 * Description:       Embeds the matrix client on any WordPress page with a configured room on per page level
 * Version:           0.1
 * Author:            Orbit Team
 * Author URI:        https://chat.a8c.com/permalink/#/room/#orbit:automattic.com
 */

/**
 * Settings API
 */
function a8c_orbit_chatterbox_settings() {
    register_setting( 'discussion', 'a8c_orbit_chatterbox_settings', array(
		'type' => 'string',
		'sanitize_callback' => 'sanitize_text_field',
		'default' => NULL,
	) );

	// register a new section on the "discussion" page
    add_settings_section(
        'a8c_orbit_chatterbox_section',
        'Chatterbox Configuration',
		function(){
			?>
			<p>Configure what matrix room to embed on what page</p>
			<?php
		},
        'discussion'
    );

    // register a new field in the "a8c_orbit_chatterbox_section" section, on the "discussion" page
    add_settings_field(
        'matrix-room-default',
        'Matrix room (Default)',
		function() {
			$setting = get_option('a8c_orbit_chatterbox_settings');
			?>
			<input type="text" name="a8c_orbit_chatterbox_settings" value="<?php echo isset( $setting ) ? esc_attr( $setting ) : ''; ?>" class="regular-text">
			<?php
		},
        'discussion',
        'a8c_orbit_chatterbox_section'
    );
}
add_action( 'admin_init', 'a8c_orbit_chatterbox_settings' );

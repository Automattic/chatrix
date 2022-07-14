<?php

/**
 * Settings API
 */
function a8c_orbit_chatrix_settings() {
    register_setting( 'discussion', 'a8c_orbit_chatrix_settings', array(
		'type' => 'array',
		'sanitize_callback' => function( $value ) {
			$value['default_matrix_room'] = sanitize_text_field( $value['default_matrix_room'] );
			foreach ( $value['overrides'] as $index => $override ) {
				$value['overrides'][$index]['room'] = sanitize_text_field( $override['room'] );
				$value['overrides'][$index]['pages'] = array_filter( array_map( 'absint', $override['pages'] ) );
			}
			return $value;
		},
		'default' => NULL,
	) );

	// register a new section on the "discussion" page
    add_settings_section(
        'a8c_orbit_chatrix_section',
        'Chatrix Configuration',
		function(){
			?>
			<p>Configure what matrix room to embed on what page</p>
			<?php
		},
        'discussion'
    );

    // register a new field in the "a8c_orbit_chatrix_section" section, on the "discussion" page
    add_settings_field(
        'default-matrix-room',
        'Default Matrix room',
		function() {
			$settings = get_option( 'a8c_orbit_chatrix_settings' );

			// cleanup, since we are hacking Settings API to work for ourselves in a certain way
			$modified = false;
			foreach ( $settings['overrides'] as $key => $override ) {
				if ( empty( trim( $override['room'] ) ) || empty( $override['pages'] ) ) {
					unset( $settings['overrides'][$key] );
					$modified = true;
				}
			}
			if ( $modified ) {
				update_option( 'a8c_orbit_chatrix_settings', $settings );
			}

			?>
			<input type="text" name="a8c_orbit_chatrix_settings[default_matrix_room]" value="<?php echo isset( $settings['default_matrix_room'] ) ? esc_attr( $settings['default_matrix_room'] ) : ''; ?>" class="regular-text">
			<p class="description">Enter default matrix room to embed on all pages on your website.</p>
			<p class="description">If you only want to embed Matrix chat room on certain pages, leave this field empty and only fill out overrides below.</p>
			<h3>Overrides</h3>
			<?php $key = 0; ?>
			<?php foreach ( $settings['overrides'] as $key => $override ) { ?>
				<div class="a8c-orbit-chatrix-overrides">
					<p class="description">Embed this room
						<input type="text" name="a8c_orbit_chatrix_settings[overrides][<?php echo $key ?>][room]" value="<?php echo isset( $override['room'] ) ? esc_attr( $override['room'] ) : ''; ?>" class="regular-text">
						on these pages:

						<select multiple name="a8c_orbit_chatrix_settings[overrides][<?php echo $key ?>][pages][]">
						<?php foreach ( get_pages() as $page ) { ?>
								<option value="<?php echo $page->ID ?>" <?php echo in_array( $page->ID, $override['pages'] ) ? 'selected' : ''; ?>><?php echo $page->post_title ?></option>
							<?php } ?>
						</select>
					</p>
				</div>
				<br />
			<?php } ?>
			<?php
			// Show additional set of fields to add new entry for overrides
			$key++;
			?>
			<div class="a8c-orbit-chatrix-overrides">
				<p class="description">Embed this room
					<input type="text" name="a8c_orbit_chatrix_settings[overrides][<?php echo $key ?>][room]" value="" class="regular-text">
					on these pages:

					<select multiple name="a8c_orbit_chatrix_settings[overrides][<?php echo $key ?>][pages][]">
						<?php foreach ( get_pages() as $page ) { ?>
							<option value="<?php echo $page->ID ?>"><?php echo $page->post_title ?></option>
						<?php } ?>
					</select>
				</p>
			</div>
			<?php
		},
        'discussion',
        'a8c_orbit_chatrix_section'
    );
}
add_action( 'admin_init', 'a8c_orbit_chatrix_settings' );

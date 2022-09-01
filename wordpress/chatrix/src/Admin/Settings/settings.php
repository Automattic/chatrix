<?php

namespace Automattic\Chatrix\Admin\Settings;

const DEFAULT_VALUES     = array(
	'homeserver' => 'https://example.com',
	'room'       => '!room-id:example.com',
);
const SETTINGS_PAGE_SLUG = 'chatrix';
const OPTION_GROUP       = 'chatrix';
const OPTION_NAME        = 'chatrix_settings';

function init() {
	// All settings are stored under a single associative array.
	register_setting(
		OPTION_GROUP,
		OPTION_NAME,
		array(
			'type'              => 'array',
			'default'           => DEFAULT_VALUES,
			'sanitize_callback' => 'Automattic\Chatrix\Admin\Settings\sanitize',
		)
	);

	// If field is not set, use default value instead.
	$settings = array_merge( DEFAULT_VALUES, get_option( OPTION_NAME ) );

	room_section( $settings );
}

function room_section( $settings ) {
	$section_slug = 'chatrix_room';
	add_settings_section(
		$section_slug,
		'Room',
		function () {
			?>
			<p><?php esc_html_e( 'Configure the Matrix room.', 'chatrix' ); ?></p>
			<?php
		},
		SETTINGS_PAGE_SLUG
	);

	add_text_field( $section_slug, 'homeserver', 'Homeserver', $settings );
	add_text_field( $section_slug, 'room', 'Room', $settings );
}

function sanitize_value( $field_name, $value ): string {
	if ( 'homeserver' === $field_name ) {
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_error( 'homeserver-empty', __( 'Homeserver must not be empty.', 'chatrix' ) );
		}

		if ( ! wp_http_validate_url( $value ) ) {
			// translators: %s is the value the user entered.
			add_error( 'homeserver-invalid', sprintf( __( '<tt>%s</tt> is not a valid homeserver URL.' ), $value ) );
		}
	}

	if ( 'room' === $field_name ) {
		$value = sanitize_text_field( $value );
		if ( empty( $value ) ) {
			add_error( 'room-empty', __( 'Room must not be empty.', 'chatrix' ) );
		}

		if ( ! str_starts_with( $value, '!' ) ) {
			// translators: %s is the value the user entered.
			add_error( 'room-missing-exclamation', sprintf( __( '<tt>%s</tt> is not a valid room address.', 'chatrix' ), $value ) . ' ' . __( 'It must start with an exclamation mark, e.g. <tt>!room-id:example.com</tt>', 'chatrix' ) );
		}

		if ( ! str_contains( $value, ':' ) ) {
			add_error( 'room-missing-colon', sprintf( __( '<tt>%s</tt> is not a valid room address.', 'chatrix' ), $value ) . ' ' . __( 'It must end with an <tt>:</tt> followed by the homeserver domain, e.g. <tt>!room-id:example.com</tt>', 'chatrix' ) );
		}
	}

	return $value;
}

function add_text_field( string $section_slug, string $name, string $label, array $settings ) {
	add_settings_field(
		"{$section_slug}_$name",
		$label,
		function ( $args ) {
			printf(
				'<input name="%1$s[%2$s]" id="%3$s" type="text" value="%4$s" class="regular-text" />',
				esc_attr( $args['option_name'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['label_for'] ),
				esc_attr( $args['value'] ),
			);
		},
		SETTINGS_PAGE_SLUG,
		$section_slug,
		array(
			'label_for'   => OPTION_NAME . '_' . $name,
			'name'        => $name,
			'value'       => esc_attr( $settings[ $name ] ),
			'option_name' => OPTION_NAME,
		)
	);
}

function menu() {
	add_options_page(
		'Chatrix',
		'Chatrix',
		'manage_options',
		SETTINGS_PAGE_SLUG,
		function () {
			?>
			<div id="chatrix-settings" class="wrap">
				<h1><?php esc_html_e( 'Chatrix Settings', 'chatrix' ); ?></h1>
				<form action="options.php" method="POST">
					<?php
					settings_fields( OPTION_GROUP );
					do_settings_sections( SETTINGS_PAGE_SLUG );
					submit_button();
					?>
				</form>
			</div>
			<?php
		}
	);
}

function sanitize( $values ): array {
	if ( ! is_array( $values ) ) {
		return DEFAULT_VALUES;
	}

	$sanitized = array();
	foreach ( DEFAULT_VALUES as $key => $default_value ) {
		$sanitized[ $key ] = sanitize_value( $key, $values[ $key ] );
	}

	return $sanitized;
}

function add_error( $code, $message ) {
	add_settings_error( OPTION_GROUP, "chatrix-$code", $message );
}

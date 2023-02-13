<?php

namespace Automattic\Chatrix\Admin\Settings;

const DEFAULT_VALUES     = array(
	'homeserver' => 'https://example.com',
	'room'       => '!room-id:example.com',
	'show_on'    => 'all',
	'pages'      => array(),
);
const SETTINGS_PAGE_SLUG = 'chatrix';
const OPTION_GROUP       = 'chatrix';
const OPTION_NAME        = 'chatrix_settings';

function get() {
	return get_option( OPTION_NAME );
}

function enqueue() {
	wp_enqueue_script( 'chatrix-settings-js', plugins_url( 'settings.js', __FILE__ ), array(), automattic_chatrix_version(), true );
}

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
	pages_section( $settings );
}

function room_section( array $settings ) {
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

	add_text_field( $section_slug, 'homeserver', $settings['homeserver'], __( 'Homeserver', 'chatrix' ) );
	add_text_field( $section_slug, 'room', $settings['room'], __( 'Room', 'chatrix' ) );
}

function pages_section( array $settings ) {
	$section_slug = 'chatrix_pages';
	add_settings_section(
		$section_slug,
		'Pages',
		function () {
			?>
			<p>Configure in which pages to show Chatrix.</p>
			<?php
		},
		SETTINGS_PAGE_SLUG
	);

	add_radio_field( $section_slug, 'show_on', 'all', __( 'Show on', 'chatrix' ), __( 'All pages', 'chatrix' ), $settings['show_on'] );
	add_radio_field( $section_slug, 'show_on', 'specific', '', __( 'Specific pages', 'chatrix' ), $settings['show_on'] );

	foreach ( get_pages() as $page ) {
		$id      = $page->ID;
		$checked = in_array( (string) $id, $settings['pages'] ?? array(), true );
		add_checkbox_field( $section_slug, 'pages', $id, '', $page->post_title, $checked );
	}
}

function sanitize_value( $field_name, $value, $original_value ) {
	if ( 'homeserver' === $field_name ) {
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_error( 'homeserver-empty', __( 'Homeserver must not be empty.', 'chatrix' ) );
			$value = $original_value;
		}

		// set a default scheme if none is supplied, otherwise esc_url_raw() doesn't like it.
		$scheme_added = false;
		if ( is_null( wp_parse_url( $value, PHP_URL_SCHEME ) ) ) {
			$value        = 'https://' . $value;
			$scheme_added = true;
		}

		if ( sanitize_url( $value ) !== $value ) {
			// translators: %s is the value the user entered.
			add_error( 'homeserver-invalid', sprintf( __( '<tt>%s</tt> is not a valid homeserver URL.' ), $original_value ) );
			$value = $original_value;
		}

		if ( $scheme_added ) {
			$value = substr( $value, 8 );
		}
	}

	if ( 'room' === $field_name ) {
		$value = sanitize_text_field( $value );
		if ( ! empty( $value ) ) {
			if ( ! str_starts_with( $value, '!' ) && ! str_starts_with( $value, '#' ) ) {
				// translators: %s is the value the user entered.
				add_error( 'room-missing-exclamation', sprintf( __( '<tt>%s</tt> is not a valid room address.', 'chatrix' ), $value ) . ' ' . __( 'It must start with an ! or #, e.g. <tt>!room-id:example.com</tt> or <tt>#room-alias:example.com</tt>', 'chatrix' ) );
				$value = $original_value;
			}

			if ( ! str_contains( $value, ':' ) ) {
				// translators: %s is the value the user entered.
				add_error( 'room-missing-colon', sprintf( __( '<tt>%s</tt> is not a valid room address.', 'chatrix' ), $value ) . ' ' . __( 'It must end with an <tt>:</tt> followed by the homeserver domain, e.g. <tt>!room-id:example.com</tt>', 'chatrix' ) );
				$value = $original_value;
			}
		}
	}

	if ( 'show_on' === $field_name ) {
		$value = sanitize_text_field( $value );
		if ( ! in_array( $value, array( 'all', 'specific' ), true ) ) {
			// translators: %s is the value the user entered.
			add_error( 'show-on-invalid', __( 'Invalid show-on selection', 'chatrix' ) );
			$value = $original_value;
		}
	}

	if ( 'pages' === $field_name ) {
		$value = array_values( $value );
	}

	return $value;
}

function add_text_field( string $section_slug, string $name, string $value, string $label ) {
	add_settings_field(
		"{$section_slug}_$name",
		$label,
		function ( $args ) {
			printf(
				'<input name="%1$s[%2$s]" id="%3$s" value="%4$s" type="text" class="regular-text"/>',
				esc_attr( $args['option_name'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['label_for'] ),
				esc_attr( $args['value'] ),
			);
		},
		SETTINGS_PAGE_SLUG,
		$section_slug,
		array(
			'option_name' => OPTION_NAME,
			'label_for'   => OPTION_NAME . '_' . $name,
			'name'        => $name,
			'value'       => $value,
		)
	);
}

function add_radio_field( string $section_slug, string $name, string $value, string $label, string $description, string $selected_value ) {
	add_settings_field(
		"{$section_slug}_{$name}_$value",
		$label,
		function ( $args ) {
			printf(
				'<label><input name="%1$s[%2$s]" value="%3$s" type="radio" %4$s/>%5$s</label>',
				esc_attr( $args['option_name'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['value'] ),
				checked( $args['value'], $args['selected_value'], false ),
				esc_attr( $args['description'] ),
			);
		},
		SETTINGS_PAGE_SLUG,
		$section_slug,
		array(
			'option_name'    => OPTION_NAME,
			'label_for'      => OPTION_NAME . '_' . $name,
			'name'           => $name,
			'value'          => $value,
			'description'    => $description,
			'selected_value' => $selected_value,
		)
	);
}

function add_checkbox_field( string $section_slug, string $name, string $value, string $label, string $description, string $checked ) {
	add_settings_field(
		"{$section_slug}_{$name}_$value",
		$label,
		function ( $args ) {
			printf(
				'<label><input name="%1$s[%2$s][%3$s]" value="%3$s" type="checkbox" %4$s/>%5$s</label>',
				esc_attr( $args['option_name'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['value'] ),
				checked( true, $args['checked'], false ),
				esc_attr( $args['description'] ),
			);
		},
		SETTINGS_PAGE_SLUG,
		$section_slug,
		array(
			'option_name' => OPTION_NAME,
			'label_for'   => OPTION_NAME . '_' . $name,
			'name'        => $name,
			'value'       => $value,
			'description' => $description,
			'checked'     => $checked,
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
	if ( empty( $values ) ) {
		return array();
	}

	$sanitized = array();
	$previous  = get_option( OPTION_NAME );

	foreach ( $values as $key => $value ) {
		$previous_value    = array_key_exists( $key, $previous ) ? $previous[ $key ] : null;
		$sanitized[ $key ] = sanitize_value( $key, $value, $previous_value );
	}

	// Don't clear page selection when show_on is set to all pages.
	if ( 'all' === $sanitized['show_on'] && ! empty( $previous['pages'] ) ) {
		$sanitized['pages'] = $previous['pages'];
	}

	return $sanitized;
}

function add_error( $code, $message ) {
	add_settings_error( OPTION_GROUP, "chatrix-$code", $message );
}

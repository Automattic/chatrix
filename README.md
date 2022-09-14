# Chatrix Matrix client

Embed the Chatrix Matrix client into WordPress pages.

**Contributors:** akirk, ashfame, psrpinto
**Tags:** matrix, chatrix
**Requires at least:** 5.0
**Tested up to:** 6.1
**Requires PHP:** 7.4
**License:** [GPLv2 or later](http://www.gnu.org/licenses/gpl-2.0.html)
**Stable tag:** trunk
**GitHub Plugin URI:** https://github.com/Automattic/chatrix

## Description
This plugin allows you to embed the [Chatrix Matrix client](https://github.com/Automattic/chatrix-frontend) into WordPress pages.

## Advanced usage
If you need more flexibility than what the plugin's settings provides, you can configure chatrix though
the `chatrix_instances` filter:

```php
// functions.php

add_filter( 'chatrix_instances', function ( array $default_instances ) {
	// The key is an instance_id, the value array is the config for that instance.
	// Set 'pages' to an array of the ids of the pages which should show chatrix.
	// You can also set 'pages' to 'all' which results in that instance always being used.
	// Only one instance can be shown on a given page.
	return array(
		'foo' => array(
			'homeserver' => 'https://foo.com',
			'room_id'    => '!id:foo.com',
			'pages'      => 'all',
		),
		'bar' => array(
			'homeserver' => 'https://bar.com',
			'room_id'    => '!id:bar.com',
			'pages'      => array(1, 2, 3),
		),
	);
} );
```

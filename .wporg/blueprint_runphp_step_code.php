<?php

require_once 'wordpress/wp-load.php';

$chatrix_block_simple = '<!-- wp:paragraph --> <p>Below you can see "Chatrix" block in action. You can add it anywhere using either <code>/chatrix</code> or by looking up chatrix when choosing which block to insert.</p> <!-- /wp:paragraph --> <!-- wp:automattic/chatrix {"enableServiceWorker":false,"instanceId":"2530674218113325","defaultHomeserver":"matrix.org"} /--> <!-- wp:paragraph --> <p>Chatrix can also run in <a href="/chatrix-single-room-mode/">single room mode</a>.</p> <!-- /wp:paragraph -->';

$chatrix_block_2col = <<<CHATRIXBLOCK2COLUMNS
<!-- wp:paragraph -->
<p>Below you can see “Chatrix” block in action. You can add it anywhere using either&nbsp;<code>/chatrix</code>&nbsp;or by looking up chatrix when choosing which block to insert.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%">
<!-- wp:paragraph -->
<p><a href="/wp-admin/post.php?post=3&action=edit">Edit this page</a> to specify what room should Chatrix run in as, single-room mode. By default, it loads up:</p>
<!-- /wp:paragraph -->
<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#matrix:matrix.org</pre>
<!-- /wp:preformatted -->
<!-- wp:paragraph -->
<p>You would need to select Chatrix block to reveal its settings on the right side panel.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%">
<!-- wp:automattic/chatrix {"enableServiceWorker":false,"instanceId":"4986644425212020","roomId":"#matrix:matrix.org","defaultHomeserver":"matrix.org"} /-->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
CHATRIXBLOCK2COLUMNS;

$sample_page_post_id = 2;

wp_update_post( array(
    'ID' => $sample_page_post_id,
    'post_title' => 'Chatrix [Regular]',
    'post_name' => 'chatrix-regular-mode',
    'post_content' => $chatrix_block_simple
) );

wp_insert_post( array(
    'ID' => 3,
    'post_title' => 'Chatrix [Single Room Mode]',
    'post_name' => 'chatrix-single-room-mode',
    'post_type' => 'page',
    'post_status' => 'publish',
    'post_content' => $chatrix_block_2col
) );

wp_insert_post( array(
    'ID' => 4,
    'post_title' => 'Chatrix [Popup]',
    'post_name' => 'chatrix-in-popup-mode',
    'post_type' => 'page',
    'post_status' => 'publish',
    'post_content' => '<!-- wp:paragraph --> <p>On this page, you can see the popup widget at the bottom right of your screen. Click on it to show Chatrix.</p> <!-- /wp:paragraph -->'
) );

update_option( 'chatrix_settings', array(
    'homeserver' => 'matrix.org',
    'room' => '#matrix:matrix.org',
    'show_on' => 'specific',
    'pages' => array(
        0 => '4'
    )
) );

<?php

require_once 'wordpress/wp-load.php';

$chatrix_block_simple = '<!-- wp:paragraph --> <p>Below you can see "Chatrix" block in action. You can add it anywhere using either <code>/chatrix</code> or by looking up chatrix when choosing which block to insert.</p> <!-- /wp:paragraph -->  <!-- wp:paragraph --> <p>Even though its not functional in this Playground demo, since it requires its own service worker and that is not compatible with the Playground (running WordPress in your browser) at the moment, you can at least see how it looks and it can be added anywhere you can add a Gutenberg block :)</p> <!-- /wp:paragraph --> <!-- wp:automattic/chatrix {"enableServiceWorker":false,"instanceId":"2530674218113325","defaultHomeserver":"matrix.org"} /-->';

$chatrix_block_2col = <<<CHATRIXBLOCK2COLUMNS
<!-- wp:paragraph -->
<p>Below you can see “Chatrix” block in action. You can add it anywhere using either&nbsp;<code>/chatrix</code>&nbsp;or by looking up chatrix when choosing which block to insert.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%">
<!-- wp:paragraph -->
<p>Here can be some login instructions of participating in the chat window on the right side:</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%">
<!-- wp:automattic/chatrix {"enableServiceWorker":false,"instanceId":"4986644425212020","defaultHomeserver":"matrix.org"} /-->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>Unfortunately, it's not possible to login into Matrix inside of Playground demo, since it requires its own service worker and that is not compatible with the Playground at the moment. You can explore how it looks and how it can be added anywhere you can add a Gutenberg block :)</p>
<!-- /wp:paragraph -->
CHATRIXBLOCK2COLUMNS;

$sample_page_post_id = 2;

wp_update_post( array(
    'ID' => $sample_page_post_id,
    'post_title' => 'Chatrix [Regular]',
    'post_content' => $chatrix_block_simple
) );

wp_insert_post( array(
    'ID' => 3,
    'post_title' => 'Chatrix [2 Column]',
    'post_type' => 'page',
    'post_status' => 'publish',
    'post_content' => $chatrix_block_2col
) );

wp_insert_post( array(
    'ID' => 4,
    'post_title' => 'Chatrix [Popup]',
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

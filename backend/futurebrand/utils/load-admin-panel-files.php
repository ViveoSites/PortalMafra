<?php

function load_admin_panel_files($hook)
{
  wp_enqueue_style('dashboard_css', get_template_directory_uri() . '/styles/dashboard.css', array(), '1.2', false);
}
add_action('admin_enqueue_scripts', 'load_admin_panel_files');

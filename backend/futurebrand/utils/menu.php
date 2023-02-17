<?php

// Don't remove it.
// We need to keep it to load the menu in the Panel.

function wpb_custom_new_menu()
{
  register_nav_menu('default-menu', __('Default Menu'));
}

add_action('init', 'wpb_custom_new_menu');

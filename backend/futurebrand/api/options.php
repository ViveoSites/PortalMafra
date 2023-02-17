<?php

class ApiOptions
{
  public function __construct()
  {
    $this->init();
  }

  public function init()
  {
    add_filter('rest_api_init', [$this, 'register_routes']);
  }

  /**
   * Register options pages routes for WP API v2
   *
   */
  public function register_routes()
  {
    register_rest_route('wp/v2', '/options', array(
      array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => array($this, 'get_options_pages'),
        'permission_callback' => '__return_true',
      )
    ));
  }

  /**
   * Get options pages
   *
   * @return array All registered options pages
   */
  public function get_options_pages($request)
  {

    $options = get_fields('options');

    return rest_ensure_response($options);
  }
}

new ApiOptions();

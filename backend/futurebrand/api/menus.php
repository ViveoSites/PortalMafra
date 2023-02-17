<?php

class ApiMenus
{
  public function __construct()
  {
    $this->init();
  }

  public function init()
  {
    add_action('rest_api_init', function () {
      register_rest_route('wp/v2', '/menus', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => array($this, 'get_menus')
      ));
    });
  }

  public function remove_lang_from_url($url, $force_lang = false)
  {
    $current_lang = current_lang();

    if (strpos($url, '?lang=' . $current_lang) !== false) {
      $url = $force_lang
        ? '/' . $current_lang . '/' . str_replace('?lang=' . $current_lang, '', $url)
        : str_replace('?lang=' . $current_lang, '', $url);
    }

    return $url;
  }

  public function remove_lang_from_slug($slug)
  {
    foreach (all_langs() as $lang) {
      if (strpos($slug, '-' . $lang['code']) !== false) {
        $slug = str_replace('-' . $lang['code'], '', $slug);
      }
    }
    return $slug;
  }

  /**
   * Format Menus for WP API v2.
   */
  public function get_menus()
  {
    $get_menus = wp_get_nav_menus();
    $menus = array();

    foreach ($get_menus as $menu) {
      $items = wp_get_nav_menu_items($menu->term_id);
      $menu_items = array();

      foreach ($items as $item) {
        $url = ($item->type !== "custom")
          ? $this->clean_url($this->remove_lang_from_url($item->url, true))
          : $item->url;

        $fields = get_fields($item);

        $has_parent = $item->menu_item_parent;

        $item_block = array(
          "id" => $item->ID,
          "title" => $item->title,
          "url" => $url,
          "acf" => $fields,
          "children" => []
        );

        if ($has_parent) {
          foreach ($menu_items as $key => $menu_item) {
            if ($menu_item['id'] === (int) $has_parent) {
              $menu_items[$key]['children'][] = $item_block;
            } else if (is_iterable($menu_item['children'])) {
              foreach ($menu_item['children'] as $child_key => $child_item) {
                if ($child_item['id'] === (int) $has_parent) {
                  $menu_items[$key]['children'][$child_key]['children'][] = $item_block;
                }
              }
            }
          }
        } else {
          $menu_items[] = $item_block;
        }
      }

      $menus[$this->remove_lang_from_slug($menu->slug)] = $menu_items;
    }

    return rest_ensure_response($menus);
  }

  public function clean_url($url)
  {
    $site_url = $this->remove_lang_from_url(get_bloginfo('url'));
    $url = str_replace($site_url, '', $url);

    return $url;
  }
}

new ApiMenus();

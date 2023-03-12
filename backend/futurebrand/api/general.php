<?php

class ApiGeneral
{
  public function __construct()
  {
    $this->init();
  }

  public function init()
  {
    add_filter('rest_prepare_page', [$this, 'format_data_object'], 10, 3);
    add_filter('rest_prepare_post', [$this, 'format_data_object'], 10, 3);
    add_filter('acf/format_value/type=link', [$this, 'format_link_value'], 20, 3);
    add_filter('acf/format_value/type=image', [$this, 'format_image_value'], 20, 3);
    add_filter('acf/format_value/type=relationship', [$this, 'format_post_object'], 20, 3);
    add_filter('acf/format_value/type=post_object', [$this, 'format_post_object'], 20, 3);
  }

  /**
   * Format data in Posts and Pages for WP API
   */
  public function format_data_object($data, $post, $context)
  {
    // remove links from object
    $data->remove_link('collection');
    $data->remove_link('self');
    $data->remove_link('about');
    $data->remove_link('author');
    $data->remove_link('replies');
    $data->remove_link('version-history');
    $data->remove_link('predecessor-version');
    $data->remove_link('https://api.w.org/featuredmedia');
    $data->remove_link('https://api.w.org/attachment');
    $data->remove_link('https://api.w.org/term');
    $data->remove_link('curies');

    // blocks
    $blocks = [];
    $parsed_blocks = parse_blocks($post->post_content);

    foreach ($parsed_blocks as $key => $block) {
      if (!isset($block['attrs']['data'])) {
        continue;
      }

      acf_setup_meta($block['attrs']['data'], $block['attrs']['id'], true);

      $fields = get_fields();

      if (isset($fields) && !empty($fields)) {
        $blocks[] = array_merge([
          'blockName' => $block['blockName'],
        ], $fields);
      }

      acf_reset_meta($block['attrs']['id']);
    }

    foreach ($blocks as $key => $block) {
      $blocks[$key] = $this->render_block_data($block);
    }

    $data->data['content']['blocks'] = $blocks;

    // featured image
    $featured_media = null;

    if (!empty($data->data['featured_media'])) {
      $featured_media = wp_get_attachment_image_src($data->data['featured_media'], 'full');
      $featured_media_thumbnail = wp_get_attachment_image_src($data->data['featured_media'], 'thumbnail');
      $featured_media_data = wp_get_attachment_metadata($data->data['featured_media']);
      $featured_media = [
        'id' => $data->data['featured_media'],
        'alt' => $data->data['title']['rendered'],
        'width' => $featured_media[1],
        'height' => $featured_media[2],
        'url' => $featured_media[0],
        'filesize' => empty($featured_media_data['filesize']) ? 0 : $featured_media_data['filesize'],
        'sizes' => [
          'thumbnail' => $featured_media_thumbnail[0],
          'thumbnail-width' => $featured_media_thumbnail[1],
          'thumbnail-height' => $featured_media_thumbnail[2],
        ]
      ];
    }

    $data->data['featuredMedia'] = $featured_media;

    // children pages
    $pages = [];

    $query_pages = new WP_Query([
      'post_type'      => 'page',
      'posts_per_page' => -1,
      'post_parent'    => $post->ID,
      'order'          => 'ASC',
      'orderby'        => 'menu_order'
    ]);

    if ($query_pages->have_posts()) {
      foreach ($query_pages->posts as $child) {
        $pages[] = $this->format_post_object($child, $child->ID, ['return_format' => 'object']);
      }
    }

    $data->data['children'] = $pages;

    // translated slugs
    $translated_paths = [];

    $current_lang = current_lang();

    foreach (all_langs() as $lang) {
      $translatedId = apply_filters('wpml_object_id', $post->ID, $post->post_type, TRUE, $lang['code']);

      if (!empty($translatedId)) {
        $post = get_post($translatedId);
        $translated_paths[$lang['code']] = create_i18n_page_url_by_post_data(
          $lang['code'],
          get_permalink($post->ID),
          $post->post_type
        );
      }
    }

    $data->data['translatedPaths'] = $translated_paths;

    // link
    $data->data['link'] = create_i18n_page_url_by_post_data(
      $current_lang,
      $data->data['link'],
      $data->data['type'],
    );

    // seo
    $data->data['seo'] = $data->data['yoast_head_json'];
    $seo_keywords = get_post_meta($post->ID, '_yoast_wpseo_focuskw', true);

    if (!empty($data->data['seo'])) {
      $data->data['seo']['keywords'] = $seo_keywords;
    }

    // remove useless fields
    unset($data->data['ping_status']);
    unset($data->data['menu_order']);
    unset($data->data['template']);
    unset($data->data['guid']);
    unset($data->data['date_gmt']);
    unset($data->data['modified_gmt']);
    unset($data->data['featured_media']);
    unset($data->data['yoast_head']);
    unset($data->data['yoast_head_json']);

    return $data;
  }

  public function format_link_value($value)
  {
    if (empty($value['url'])) {
      return $value;
    }

    $site_url = get_bloginfo('url');

    $has_site_url = strpos($value['url'], $site_url);
    $value['url'] = str_replace($site_url, '', $value['url']);

    $value['isExternal'] = $has_site_url === false ? true : false;

    return $value;
  }

  public function format_image_value($value)
  {
    if (!$value) {
      return $value;
    }

    return [
      'id' => $value['id'],
      'alt' => $value['alt'],
      'title' => $value['title'],
      'caption' => $value['caption'],
      'filesize' => $value['filesize'],
      'url' => $value['url'],
      'width' => $value['width'],
      'height' => $value['height'],
      'sizes' => $value['sizes'],
    ];
  }

  public function format_post_object($value, $original_post_id, $field)
  {
    if ($field['return_format'] !== 'object') {
      return $value;
    }

    remove_filter('acf/format_value/type=relationship', [$this, 'format_post_object'], 20);
    remove_filter('acf/format_value/type=post_object', [$this, 'format_post_object'], 20);

    if (is_array($value)) {
      foreach ($value as $post) {
        $formatted[] = $this->convert_post_object($post, $original_post_id);
      }
    } else {
      $formatted = $this->convert_post_object($value, $original_post_id);
    }

    add_filter('acf/format_value/type=relationship', [$this, 'format_post_object'], 20, 3);
    add_filter('acf/format_value/type=post_object', [$this, 'format_post_object'], 20, 3);

    return $formatted;
  }

  public function convert_post_object($post, $original_post_id)
  {

    global $wp_rest_server;

    if (empty($post)) {
      return null;
    }

    $post_type = get_post_type_object($post->post_type);

    $request = WP_REST_Request::from_url(rest_url(sprintf('wp/v2/%s/%d?acf_format=standard', $post_type->rest_base ?: $post->post_type, $post->ID)));
    $request = rest_do_request($request);
    $data = $wp_rest_server->response_to_data($request, isset($_GET['_embed']));

    $GLOBALS['post'] = $original_post_id;

    return $data;
  }

  public function render_block_data($data)
  {
    if ($data['blockName'] === 'acf/news') {
      return $this->render_block_news($data);
    } else if ($data['blockName'] === 'acf/product-categories') {
      return $this->render_block_product_categories($data);
    }

    return $data;
  }

  public function render_block_news($data)
  {
    $data['posts'] = $this->render_posts_by_posttype([
      'post_type' => 'post',
      'posts_per_page' => 9,
    ]);

    return $data;
  }

  public function render_block_product_categories($data)
  {
    if (!isset($data['categories']) || empty($data['categories'])) {
      return $data;
    }

    $categories = [];

    // add acf fields on categories
    foreach ($data['categories'] as $category) {
      $category = get_term($category, 'product-category');
      $category->acf = get_fields('product-category_' . $category->term_id);
      $categories[] = $category;
    }

    $data['categories'] = $categories;

    return $data;
  }

  public function render_posts_by_posttype($parameters)
  {
    $posts = [];
    $query = new WP_Query($parameters);

    foreach ($query->posts as $post) {
      $posts[] = $this->format_post_object($post, $post->ID, ['return_format' => 'object']);
    }

    return $posts;
  }

  public function render_term_data($taxonomy, $ids)
  {
    $terms = [];

    foreach ($ids as $id) {
      $terms[] = get_term($id, $taxonomy);
    }

    return $terms;
  }
}

new ApiGeneral();

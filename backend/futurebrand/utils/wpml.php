<?php

// i18n Post Types Slugs
// ATTENTION: This is a list of post types slugs, should be the same as the ones in the frontend
// Frontend: /frontend/utils/post-types.js
$i18n_posts_types_slugs = [
  'post' => [
    'pt-br' => 'noticias',
    'en' => 'news',
    'es' => 'noticias',
  ],
];

function default_lang()
{
  return apply_filters('wpml_default_language', null);
}

function current_lang()
{
  return apply_filters('wpml_current_language', null);
}

function all_langs()
{
  return apply_filters('wpml_active_languages', null);
}

function remove_lang_from_url($url, $force_lang = false)
{
  $current_lang = current_lang();
  $default_lang = default_lang();

  // if (strpos($url, '?lang=' . $current_lang) !== false) {
  // $url_formatted = str_replace('?lang=' . $current_lang, '', $url);

  $url_formatted_parts = explode('?', $url);
  // $url_formatted = force_clean_url($url_formatted_parts[0]);
  $url_formatted = rtrim($url_formatted_parts[0], '/') . '/';

  $url = $force_lang && $current_lang !== $default_lang
    ? '/' . $current_lang . $url_formatted
    : $url_formatted;
  // }

  return $url;
}

function remove_lang_from_slug($slug)
{
  foreach (all_langs() as $lang) {
    if (strpos($slug, '-' . $lang['code']) !== false) {
      $slug = str_replace('-' . $lang['code'], '', $slug);
    }
  }
  return $slug;
}

function force_clean_url($url)
{
  $site_url = rtrim(remove_lang_from_url(get_bloginfo('url')), '/');
  $url = str_replace($site_url, '', remove_lang_from_url($url, true));

  return $url;
}

function create_i18n_page_url_by_post_data($locale, $post_link, $post_type = '')
{
  global $i18n_posts_types_slugs;

  if (empty($post_type)) {
    $post_id = url_to_postid($post_link);

    if (!empty($post_id)) {
      $post_data = get_post($post_id);
      $post_type = $post_data->post_type;
    }
  }


  $default_lang = default_lang();
  $url = force_clean_url($post_link);

  // remove lang
  foreach (all_langs() as $lang) {
    $url = str_replace('/' . $lang['code'] . '/', '/', $url);
  }

  // remove post type
  $url = str_replace('/' . $post_type . '/', '/', $url);

  // remove homepage slug
  $url = str_replace('/homepage/', '/', $url);

  // i18n_posts_types_slugs
  // has post type slug
  if (array_key_exists($post_type, $i18n_posts_types_slugs)) {
    $post_type_slug = $i18n_posts_types_slugs[$post_type][$locale];

    return $default_lang === $locale
      ? '/' . $post_type_slug . $url
      : '/' . $locale . '/' . $post_type_slug . $url;
  }

  return $default_lang === $locale
    ? $url
    : '/' . $locale . $url;
}

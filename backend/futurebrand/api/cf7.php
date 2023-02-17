<?php

class ApiCF7
{
  public function __construct()
  {
    $this->init();
  }

  public function init()
  {
    add_action('rest_api_init', function () {
      register_rest_route(
        'wp/v2',
        '/forms/(?P<id>\d+)',
        array(
          array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'get_form'),
          ),
          array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'send_form'),
          ),
        )
      );
    });
  }

  public function get_form(WP_REST_Request $request)
  {
    $id = (int) $request->get_param('id');

    $item = wpcf7_contact_form($id);

    if (!$item) {
      return new WP_Error(
        'wpcf7_not_found',
        __("The requested contact form was not found.", 'contact-form-7'),
        array('status' => 404)
      );
    }

    $properties = $item->get_properties();

    $formatted_fields = [];
    $fields = $properties['form'];

    preg_match_all("/\[(.*?)\]/", $fields, $matches);

    foreach ($matches[1] as $field) {
      $field_pieces = preg_split('/("[^"]*")|\h+/', $field, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

      $id = '';
      $value = '';
      $label = '';
      $classes = [];
      $options = [];
      $type = str_replace('*', '', $field_pieces[0]);
      $name = $field_pieces[1];
      $is_required = strpos($field_pieces[0], '*') !== false;

      foreach ($field_pieces as $field_piece) {
        if (strpos($field_piece, 'class:') !== false) {
          $classes[] = str_replace('class:', '', $field_piece);
        }

        if (strpos($field_piece, 'id:') !== false) {
          $id = str_replace('id:', '', $field_piece);
        }

        if (strpos($field_piece, 'label:') !== false) {
          $label = preg_replace('/"/i', '', str_replace('label:', '', $field_piece));
        } else if (strpos($field_piece, '"') !== false) {
          $value = preg_replace('/"/i', '', $field_piece);

          if ($type === 'select' || $type === 'checkbox' || $type === 'radio') {
            $options[] = $value;
          }
        }
      }

      $args = [
        'type' => $type,
        'id' => $id,
        'class' => implode(' ', $classes),
        'required' => $is_required,
        'value' => $value,
        'label' => $label,
      ];

      if ($type !== 'submit' && $type !== 'button') {
        $args['name'] = $name;

        if ($type === 'select' || $type === 'checkbox' || $type === 'radio') {
          $args['options'] = $options;
        }
      } else {
        $args['defaultValue'] = $value;
      }



      $formatted_fields[] = $args;
    }

    $response = array(
      'id' => $item->id(),
      'slug' => $item->name(),
      'title' => $item->title(),
      'fields' => $formatted_fields,
      'messages' => $properties['messages'],
    );

    return rest_ensure_response($response);
  }

  public function send_form(WP_REST_Request $request)
  {
    $id = (int) $request->get_param('id');
    $item = wpcf7_contact_form($id);

    if (!$item) {
      return new WP_Error(
        'wpcf7_not_found',
        __("The requested contact form was not found.", 'contact-form-7'),
        array('status' => 404)
      );
    }

    $result = $item->submit();

    $unit_tag = $request->get_param('_wpcf7_unit_tag');

    $response = array(
      'status' => $result['status'],
      'message' => $result['message'],
    );

    if ('validation_failed' == $result['status']) {
      $invalid_fields = array();

      foreach ((array) $result['invalid_fields'] as $name => $field) {
        $invalid_fields[] = array(
          'into' => $name,
          'message' => $field['reason'],
        );
      }

      $response['invalidFields'] = $invalid_fields;
    }

    if (!empty($result['scripts_on_sent_ok'])) {
      $response['onSentOk'] = $result['scripts_on_sent_ok'];
    }

    if (!empty($result['scripts_on_submit'])) {
      $response['onSubmit'] = $result['scripts_on_submit'];
    }

    $response = apply_filters('wpcf7_ajax_json_echo', $response, $result);

    return rest_ensure_response($response);
  }
}

new ApiCF7();

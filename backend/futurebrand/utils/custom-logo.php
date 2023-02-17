<?php

function my_login_logo()
{
  $logo = get_stylesheet_directory_uri() . '/images/logo.svg';

  echo '<style type="text/css">
    #login h1 a, .login h1 a {
      background-image: url(' . $logo . ');
      height: 100px;
      width: 300px;
      background-size: 100%;
      background-repeat: no-repeat;
      margin-bottom: 15px;
    }
    #loginform h3 {
      display: none;
    }
    #loginform .button-primary,
    #lostpasswordform .button-primary {
      background: #555 !important;
      border-color: #555 !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }
    .login #login_error,
    .login .message,
    .login .success {
      border-color: #555 !important;
    }
  </style>';
}

add_action('login_enqueue_scripts', 'my_login_logo');

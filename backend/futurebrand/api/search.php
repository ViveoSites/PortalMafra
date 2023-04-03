<?php
add_action('rest_api_init', 'register_products_endpoint');

function register_products_endpoint() {
    register_rest_route('products', '/search', array(
        'methods' => 'GET',
        'callback' => 'get_products',
    ));
}

function get_products($request) 
{
    $parentcategory = $request->get_param('parentcategory');
    $categories = $request->get_param('categories');
    $suppliers = $request->get_param('suppliers');
    $products = $request->get_param('products');
    $search = $request->get_param('term');
    $page = $request->get_param('page');
    $perpage = $request->get_param('perpage') ?: 20;
    
    $args = array(
        'post_type' => 'products',
        'posts_per_page' => $perpage,
        'paged' => $page,
        'meta_query' => array(),
        'tax_query' => array(),
    );
    
    if (!empty($parentcategory)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'product-category',
            'field' => 'term_id',
            'terms' => explode(',', $parentcategory),
        );
    }
    
    if (!empty($categories)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'product-category',
            'field' => 'term_id',
            'terms' => explode(',', $categories),
        );
    }

    if (!empty($suppliers)) {
        $args['tax_query'][] = array(
            'taxonomy' => 'product-suppliers',
            'field' => 'term_id',
            'terms' => explode(',', $suppliers),
        );
    }
    
    if (!empty($search) && $search != 'null') {
        $args['s'] = $search;
    }

    $postsByCode = [];
    if (!empty($search) && $search != 'null') {
        $postsByCode = get_posts(array(
            'numberposts'   => -1,
            'post_type'     => 'products',
            'meta_key'      => 'code',
            'meta_value'    => $search
        ));
    }

    $query = new WP_Query($args);
    $products = array();
    $category_ids = array();

    $allPosts = array_merge($query->posts, $postsByCode);

    foreach ($allPosts as $post) {
        $product = array(
            'id' => $post->ID,
            'title' => ucwords(strtolower($post->post_title)),
            'brand' => wp_get_post_terms($post->ID, 'product-suppliers', array('fields' => 'names')),
            'code' => get_field('code', $post->ID),
            'presentation' => ucwords(strtolower(get_field('presentation', $post->ID))),
            'category' => wp_get_post_terms($post->ID, 'product-category', array('fields' => 'names')),
        );
        $product_categories = wp_get_post_terms($post->ID, 'product-category');
        $category_ids = array_merge($category_ids, $product_categories);

        if (!empty($product_categories)) {
            $product_category = $product_categories[0];

            $parent = get_category($product_category->parent);
            $product['color'] = get_field('background_color', 'product-category_' . $product_category->parent);
            $product['parentCategory'] = get_term($product_category->parent)->name;
        }
        $products[] = $product;
    }

    
    if ($search != '' && $search != 'null')
    {
        $args = array(
            'post_type' => 'products',
            's' => $search,
            'posts_per_page' => -1
        );

        $taxQuery = new WP_Query($args);
        $category_ids = [];
        $suppliers_ids = [];

        foreach ($taxQuery->posts as $product) 
        {
            $categories = wp_get_post_terms($product->ID, 'product-category', array('fields' => 'ids'));
            $category_ids[] = $categories[0];
            $suppliers = wp_get_post_terms($product->ID, 'product-suppliers', array('fields' => 'ids'));
            $suppliers_ids[] = $suppliers[0];
        }

        $category_ids = array_unique($category_ids);
        $suppliers_ids = array_unique($suppliers_ids);

        $category_terms = get_terms(array(
            'taxonomy' => 'product-category',
            'include' => $category_ids,
            'hide_empty' => true,
        ));

        $categories = array();
        foreach ($category_terms as $category_term) {
            $category = array(
                'id' => $category_term->term_id,
                'name' => $category_term->name,
            );
            $categories[] = $category;
        }

        $suppliers_terms = get_terms(array(
            'taxonomy' => 'product-suppliers',
            'include' => $suppliers_ids,
            'hide_empty' => true,
        ));
        $suppliers = [];
        foreach ($suppliers_terms as $supplier_term) {
            $supplier_term = array(
                'id' => $supplier_term->term_id,
                'name' => $supplier_term->name,
            );
            $suppliers[] = $supplier_term;
        }

    }
    else 
    {
        $category_ids = array();
        $suppliers_ids = array();
        foreach ($products as $product) {
            $categories = wp_get_post_terms($product['id'], 'product-category', array('fields' => 'ids'));
            $category_ids = array_merge($category_ids, $categories);

            $suppliers = wp_get_post_terms($product['id'], 'product-suppliers', array('fields' => 'ids'));
            $suppliers_ids = array_merge($suppliers_ids, $suppliers);
        }

        $category_ids = array_unique($category_ids);
        $suppliers_ids = array_unique($suppliers_ids);

        $parentCats = explode(',', $parentcategory);

        if (sizeof($parentCats) > 1)
        {
            $category_terms = get_terms(array(
            'taxonomy' => 'product-category',
            'hide_empty' => true,
        ));
        } else
        {
            $category_terms = get_terms(array(
                'taxonomy' => 'product-category',
                'hide_empty' => true,
                'child_of' => $parentCats[0],
            ));
        }

        $categories = array();
        foreach ($category_terms as $category_term) {
            $category = array(
                'id' => $category_term->term_id,
                'name' => $category_term->name,
            );
            $categories[] = $category;
        }

        $suppliers_terms = get_terms(array(
            'taxonomy' => 'product-suppliers',
            'hide_empty' => true,
        ));
        $suppliers = array();
        foreach ($suppliers_terms as $supplier_term) {
            $supplier_term = array(
                'id' => $supplier_term->term_id,
                'name' => $supplier_term->name,
            );
            $suppliers[] = $supplier_term;
        }
    }
    
    $output = array(
        'products' => $products,
        'items_total' => $query->found_posts,
        'categories' => $categories,
        'suppliers' => $suppliers
    );

    return rest_ensure_response($output);
}
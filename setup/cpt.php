<?php

/*Register Custom Post type START

function ag_post_type_services() {

    $supports = array(
        'title',            // post title
        'editor',           // post content
        'author',           // post author
        'thumbnail',        // featured images
        'excerpt',          // post excerpt
        'custom-fields',    // custom fields
        'comments',         // post comments
        'revisions',        // post revisions
        'post-formats',     // post formats
    );
    
    $labels = array(
        'name'                  => _x('services', 'plural'),
        'singular_name'         => _x('services', 'singular'),
        'menu_name'             => _x('services', 'admin menu'),
        'name_admin_bar'        => _x('services', 'admin bar'),
        'add_new'               => _x('Add New', 'add new'),
        'add_new_item'          => __('Add New services', 'alexsvg-sprint'),
        'new_item'              => __('New services', 'alexsvg-sprint'),
        'edit_item'             => __('Edit services', 'alexsvg-sprint'),
        'view_item'             => __('View services', 'alexsvg-sprint'),
        'all_items'             => __('All services', 'alexsvg-sprint'),
        'search_items'          => __('Search services', 'alexsvg-sprint'),
        'not_found'             => __('No services found.', 'alexsvg-sprint'),
        'not_found_in_trash'    => __( 'Not found in Trash', 'alexsvg-sprint' ),
    );
    
    $args = array(
        'supports'            => $supports,
        'labels'              => $labels,
        'public'              => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'services'),
        'show_ui'             => true,
        'has_archive'         => true,
        'hierarchical'        => false,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-cart',
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'taxonomies'          => array( 'type', 'post_tag' ),
        'capability_type'     => 'page',
    );
    register_post_type('services', $args);
    }
    add_action('init', 'ag_post_type_services');
    
    Register Custom Post type END*/

    
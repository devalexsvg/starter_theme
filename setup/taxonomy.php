<?php

/*Register Custom Taxonomy START

function ag_tax_serv_type() {
    $labels = array(  
      'name'                       => _x( 'Type', 'Type General Name', 'alexsvg-sprint' ),  
      'singular_name'              => _x( 'Type', 'Type Singular Name', 'alexsvg-sprint' ),  
      'menu_name'                  => __( 'Type', 'alexsvg-sprint' ),  
      'all_items'                  => __( 'All Type', 'alexsvg-sprint' ),  
      'parent_item'                => __( 'Parent Item', 'alexsvg-sprint' ),  
      'parent_item_colon'          => __( 'Parent Item:', 'alexsvg-sprint' ),  
      'new_item_name'              => __( 'New Type', 'alexsvg-sprint' ),  
      'add_new_item'               => __( 'Add New Type', 'alexsvg-sprint' ),  
      'edit_item'                  => __( 'Edit Item', 'alexsvg-sprint' ),  
      'update_item'                => __( 'Update Item', 'alexsvg-sprint' ),  
      'view_item'                  => __( 'View Item', 'alexsvg-sprint' ),  
      'separate_items_with_commas' => __( 'Separate items with commas', 'alexsvg-sprint' ),  
      'add_or_remove_items'        => __( 'Add or remove items', 'alexsvg-sprint' ),  
      'choose_from_most_used'      => __( 'Choose from the most used', 'alexsvg-sprint' ),  
      'popular_items'              => __( 'Popular Items', 'alexsvg-sprint' ),  
      'search_items'               => __( 'Search Items', 'alexsvg-sprint' ),  
      'not_found'                  => __( 'Not Found', 'alexsvg-sprint' ),  
      'no_terms'                   => __( 'No Type', 'alexsvg-sprint' ),  
      'items_list'                 => __( 'Type list', 'alexsvg-sprint' ),  
      'items_list_navigation'      => __( 'Type list navigation', 'alexsvg-sprint' ),  
    );
  
    $args = array(  
      'labels'                     => $labels,
      'hierarchical'               => true,
      'public'                     => true,
      'show_ui'                    => true,
      'show_admin_column'          => true,  
      'show_in_nav_menus'          => true,  
      'show_tagcloud'              => true,  
    );
  
    register_taxonomy( 'type', array( 'services' ), $args );
  
  }
  
  add_action( 'init', 'ag_tax_serv_type', 0 );

  Register Custom Taxonomy END*/
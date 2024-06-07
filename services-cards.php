<?php
/**
 * Plugin Name:       Service-card
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       services-cards
 *
 * @package ServicesCards
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function services_cards_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'services_cards_block_init');



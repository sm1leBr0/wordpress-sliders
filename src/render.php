<?php
// Get selected pages from block attributes
$selectedPages = isset($attributes['selectedPages']) ? $attributes['selectedPages'] : [];
$animationColor = isset($attributes['animationColor']) ? $attributes['animationColor'] : '#004d00';

if (!empty($selectedPages)):
	?>
	<div class="selected-pages" style="--animation-color: <?php echo esc_attr($animationColor); ?>;">
		<ul>
			<?php foreach ($selectedPages as $page): ?>
				<li>
					<a href="<?php echo esc_url($page['url']); ?>" rel="noopener noreferrer">
						<?php echo esc_html($page['title']); ?>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
<?php else: ?>
	<p>No pages selected</p>
<?php endif; ?>
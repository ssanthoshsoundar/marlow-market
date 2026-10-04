<?php
$title = 'Projects';
require 'includes/header.php';
$rows = db_all('SELECT * FROM projects ORDER BY sort_order, id');
$cats = array_values(array_unique(array_column($rows, 'category')));
?>
<section class="page-head"><h1>My work</h1><p class="lead">Case studies and builds. Filter by type or search by tool.</p></section>
<section class="block">
  <div class="toolbar">
    <div class="chips" role="group" aria-label="Filter projects">
      <button class="chip on" data-filter="all" type="button">All</button>
      <?php foreach ($cats as $c): ?><button class="chip" data-filter="<?= e($c) ?>" type="button"><?= e($c) ?></button><?php endforeach; ?>
    </div>
    <input type="search" id="project-search" placeholder="Search projects or tools" aria-label="Search projects">
  </div>
  <div class="grid" id="project-grid">
    <?php foreach ($rows as $p): ?>
      <article class="card project" data-cat="<?= e($p['category']) ?>" data-text="<?= e(strtolower($p['title'] . ' ' . $p['summary'] . ' ' . $p['tech'])) ?>">
        <div class="emoji"><?= e($p['emoji']) ?></div>
        <p class="muted small"><?= e($p['category']) ?></p>
        <h3><?= e($p['title']) ?></h3>
        <p><?= e($p['summary']) ?></p>
        <details>
          <summary>What I did</summary>
          <ul><?php foreach (array_filter(array_map('trim', explode("\n", (string)$p['details']))) as $d): ?><li><?= e($d) ?></li><?php endforeach; ?></ul>
        </details>
        <p class="tags"><?php foreach (array_filter(array_map('trim', explode(',', (string)$p['tech']))) as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></p>
        <?php if (preg_match('#^https?://#i', (string)$p['link'])): ?><a href="<?= e($p['link']) ?>" target="_blank" rel="noopener">View source</a><?php endif; ?>
      </article>
    <?php endforeach; ?>
  </div>
  <p id="no-results" class="muted" hidden>No projects match that filter.</p>
</section>
<?php require 'includes/footer.php'; ?>

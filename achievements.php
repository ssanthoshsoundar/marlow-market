<?php
$title = 'Achievements';
require 'includes/header.php';
$rows = db_all('SELECT * FROM achievements ORDER BY sort_order, id');
?>
<section class="page-head"><h1>Milestones &amp; recognitions</h1></section>
<section class="block">
  <div class="grid">
    <?php foreach ($rows as $a): ?>
      <article class="card">
        <div class="emoji"><?= e($a['icon']) ?></div>
        <p class="muted small"><?= e($a['type']) ?></p>
        <h3><?= e($a['title']) ?></h3>
        <p><strong><?= e($a['event']) ?></strong></p>
        <p><?= e($a['description']) ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>
<?php require 'includes/footer.php'; ?>

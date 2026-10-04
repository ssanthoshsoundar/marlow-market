<?php
$title = 'Academics';
require 'includes/header.php';
$rows = db_all('SELECT * FROM education ORDER BY sort_order, id');
?>
<section class="page-head"><h1>Education journey</h1><p class="lead">Most recent first.</p></section>
<section class="block">
  <ol class="edu">
    <?php foreach ($rows as $r): ?>
      <li class="card">
        <span class="period"><?= e($r['period']) ?></span>
        <h3><?= e($r['degree']) ?></h3>
        <p><strong><?= e($r['institution']) ?></strong></p>
        <p class="score"><?= e($r['score_label']) ?>: <b><?= e($r['score_value']) ?></b></p>
      </li>
    <?php endforeach; ?>
  </ol>
</section>
<?php require 'includes/footer.php'; ?>

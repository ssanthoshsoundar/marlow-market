<?php
$title = 'Internships';
require 'includes/header.php';
$rows = db_all('SELECT * FROM internships ORDER BY sort_order, id');
?>
<section class="page-head"><h1>Professional experience</h1></section>
<section class="block">
  <ol class="edu">
    <?php foreach ($rows as $r): ?>
      <li class="card">
        <span class="period"><?= e($r['period']) ?></span>
        <h3><?= e($r['role']) ?></h3>
        <p><strong><?= e($r['org']) ?></strong></p>
        <p><?= e($r['description']) ?></p>
      </li>
    <?php endforeach; ?>
  </ol>
</section>
<?php require 'includes/footer.php'; ?>

<?php
$title = 'Skills';
require 'includes/header.php';
$groups = [];
foreach (db_all('SELECT * FROM skills ORDER BY category, sort_order, id') as $s) $groups[$s['category']][] = $s;
?>
<section class="page-head"><h1>Skills</h1><p class="lead">Self-rated proficiency, from daily tools to things I’m still sharpening.</p></section>
<section class="block">
  <div class="grid">
    <?php foreach ($groups as $cat => $items): ?>
      <div class="card">
        <h2 class="h3"><?= e($cat) ?></h2>
        <ul class="bars">
          <?php foreach ($items as $s): ?>
            <li>
              <div class="bar-label"><span><?= e($s['icon']) ?> <?= e($s['name']) ?></span><span class="muted"><?= (int)$s['level'] ?>%</span></div>
              <div class="bar" role="progressbar" aria-valuenow="<?= (int)$s['level'] ?>" aria-valuemin="0" aria-valuemax="100" aria-label="<?= e($s['name']) ?>"><i data-w="<?= (int)$s['level'] ?>"></i></div>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endforeach; ?>
  </div>
</section>
<?php require 'includes/footer.php'; ?>

<?php
require_once '_top.php';
require_admin();
$c = fn($t, $w = '') => (int)(db_one("SELECT COUNT(*) c FROM $t $w")['c'] ?? 0);
$cards = ['Unread messages' => $c('messages', 'WHERE is_read=0'), 'All messages' => $c('messages'), 'Projects' => $c('projects'),
          'Skills' => $c('skills'), 'Achievements' => $c('achievements'), 'Internships' => $c('internships')];
$recent = db_all('SELECT * FROM messages ORDER BY created_at DESC LIMIT 5');
admin_top('Dashboard'); ?>
<section class="page-head"><h1>Dashboard</h1><p class="lead">Welcome back. Manage your portfolio content and messages here.</p></section>
<section class="block">
  <div class="grid stats">
    <?php foreach ($cards as $k => $v): ?><div class="card"><p class="muted small"><?= e($k) ?></p><p class="big"><?= $v ?></p></div><?php endforeach; ?>
  </div>
</section>
<section class="block">
  <div class="row-head"><h2>Latest messages</h2><a href="messages.php">View all</a></div>
  <?php if (!$recent): ?><p class="muted">No messages yet.</p><?php endif; ?>
  <?php foreach ($recent as $m): ?>
    <article class="card msg<?= $m['is_read'] ? '' : ' unread' ?>">
      <p><strong><?= e($m['name']) ?></strong> <a href="mailto:<?= e($m['email']) ?>"><?= e($m['email']) ?></a> <span class="muted small"><?= e($m['created_at']) ?></span></p>
      <p><?= nl2br(e(mb_strimwidth($m['message'], 0, 200, '…'))) ?></p>
    </article>
  <?php endforeach; ?>
</section>
<?php admin_bottom();

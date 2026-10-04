<?php
require_once '_top.php';
require_admin();
if ($_SERVER['REQUEST_METHOD'] === 'POST' && csrf_ok()) {
    $id = (int)($_POST['id'] ?? 0);
    $act = $_POST['action'] ?? '';
    if ($act === 'read')   db_run('UPDATE messages SET is_read=1 WHERE id=?', 'i', [$id]);
    if ($act === 'unread') db_run('UPDATE messages SET is_read=0 WHERE id=?', 'i', [$id]);
    if ($act === 'delete') db_run('DELETE FROM messages WHERE id=?', 'i', [$id]);
    header('Location: messages.php'); exit;
}
$q = trim($_GET['q'] ?? '');
$rows = $q !== ''
    ? db_all('SELECT * FROM messages WHERE name LIKE ? OR email LIKE ? OR message LIKE ? ORDER BY created_at DESC', 'sss', ["%$q%", "%$q%", "%$q%"])
    : db_all('SELECT * FROM messages ORDER BY created_at DESC');
admin_top('Messages'); ?>
<section class="page-head"><h1>Messages</h1></section>
<section class="block">
  <form method="get" class="toolbar"><input type="search" name="q" value="<?= e($q) ?>" placeholder="Search name, email or text"><button class="btn ghost" type="submit">Search</button></form>
  <?php if (!$rows): ?><p class="muted">No messages found.</p><?php endif; ?>
  <?php foreach ($rows as $m): ?>
    <article class="card msg<?= $m['is_read'] ? '' : ' unread' ?>">
      <p><strong><?= e($m['name']) ?></strong> · <a href="mailto:<?= e($m['email']) ?>"><?= e($m['email']) ?></a> · <span class="muted small"><?= e($m['created_at']) ?></span></p>
      <?php if ($m['subject']): ?><p><em><?= e($m['subject']) ?></em></p><?php endif; ?>
      <p><?= nl2br(e($m['message'])) ?></p>
      <form method="post" class="inline">
        <?= csrf_field() ?><input type="hidden" name="id" value="<?= (int)$m['id'] ?>">
        <button class="btn ghost sm" name="action" value="<?= $m['is_read'] ? 'unread' : 'read' ?>"><?= $m['is_read'] ? 'Mark unread' : 'Mark read' ?></button>
        <button class="btn danger sm" name="action" value="delete" data-confirm="Delete this message?">Delete</button>
      </form>
    </article>
  <?php endforeach; ?>
</section>
<?php admin_bottom();

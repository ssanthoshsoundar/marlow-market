<?php
require_once '_top.php';
if (is_admin()) { header('Location: index.php'); exit; }
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['fails'] = $_SESSION['fails'] ?? 0;
    if (($_SESSION['lock_until'] ?? 0) > time()) {
        $err = 'Too many attempts. Try again in a minute.';
    } elseif (!csrf_ok()) {
        $err = 'Session expired. Reload and try again.';
    } else {
        $u = trim($_POST['username'] ?? '');
        $row = db_one('SELECT id, password_hash FROM admins WHERE username = ?', 's', [$u]);
        if ($row && password_verify($_POST['password'] ?? '', $row['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = $row['id'];
            $_SESSION['fails'] = 0;
            header('Location: index.php'); exit;
        }
        $err = 'Invalid username or password.';
        if (++$_SESSION['fails'] >= 5) { $_SESSION['lock_until'] = time() + 60; $_SESSION['fails'] = 0; }
    }
}
admin_top('Login'); ?>
<section class="block narrow">
  <h1>Admin login</h1>
  <?php if ($err): ?><div class="notice error" role="alert"><?= e($err) ?></div><?php endif; ?>
  <form method="post" autocomplete="off">
    <?= csrf_field() ?>
    <label>Username <input type="text" name="username" required autofocus></label>
    <label>Password <input type="password" name="password" required></label>
    <button class="btn" type="submit">Log in</button>
  </form>
  <p class="muted small">Default after import: <code>admin</code> / <code>admin123</code>. Change it right away.</p>
</section>
<?php admin_bottom();

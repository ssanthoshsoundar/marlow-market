<?php
require_once __DIR__ . '/../config.php';
function admin_top(string $title): void { ?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($title) ?> · Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>
</head>
<body class="admin">
<header class="site-header">
  <a class="brand" href="index.php"><span class="brand-mark">S</span> Admin</a>
  <?php if (is_admin()): ?>
  <nav class="site-nav" style="display:flex">
    <a href="index.php">Dashboard</a>
    <a href="messages.php">Messages</a>
    <?php foreach (['projects','skills','achievements','education','internships'] as $t): ?><a href="manage.php?t=<?= $t ?>"><?= ucfirst($t) ?></a><?php endforeach; ?>
    <a href="../index.php" target="_blank">View site</a>
    <a href="logout.php">Log out</a>
  </nav>
  <?php endif; ?>
</header>
<main>
<?php }
function admin_bottom(): void { ?>
</main>
<script src="../assets/js/main.js"></script>
</body></html>
<?php }

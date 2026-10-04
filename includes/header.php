<?php
require_once __DIR__ . '/../config.php';
$page = basename($_SERVER['SCRIPT_NAME'], '.php');
$nav = ['index' => 'Home', 'about' => 'About', 'academics' => 'Academics', 'projects' => 'Projects',
        'skills' => 'Skills', 'achievements' => 'Achievements', 'internships' => 'Internships', 'contact' => 'Contact'];
$base = $base ?? '';
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($title ?? 'Santhosh S') ?> · Santhosh S</title>
  <meta name="description" content="Portfolio of Santhosh S, an aspiring UI/UX designer and CSE student.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= $base ?>assets/css/style.css">
  <script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>
</head>
<body class="page-<?= e($page) ?>">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="<?= $base ?>index.php"><span class="brand-mark">S</span> Santhosh S</a>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav">☰</button>
  <nav id="nav" class="site-nav">
    <?php foreach ($nav as $file => $label): ?>
      <a href="<?= $base . $file ?>.php"<?= $page === $file ? ' class="active" aria-current="page"' : '' ?>><?= $label ?></a>
    <?php endforeach; ?>
    <button class="theme-toggle" type="button" aria-label="Toggle light/dark theme">◐</button>
  </nav>
</header>
<main id="main">

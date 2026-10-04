<?php
$title = 'Home';
require 'includes/header.php';
$stats = [
  'Projects'     => db_one('SELECT COUNT(*) c FROM projects')['c'] ?? 0,
  'Skills'       => db_one('SELECT COUNT(*) c FROM skills')['c'] ?? 0,
  'Achievements' => db_one('SELECT COUNT(*) c FROM achievements')['c'] ?? 0,
  'Internships'  => db_one('SELECT COUNT(*) c FROM internships')['c'] ?? 0,
];
$latest = db_all('SELECT * FROM projects ORDER BY sort_order, id LIMIT 3');
$ach = db_all('SELECT * FROM achievements ORDER BY sort_order, id');
?>
<section class="hero">
  <div class="hero-copy">
    <p class="kicker">Aspiring UI/UX Designer · CSE student</p>
    <h1 class="frame-title">
      <span class="frame">Santhosh S<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
      <b class="cursor-tag">Santhosh</b></span>
    </h1>
    <p class="lead">I design clean, human-centred interfaces and build them myself. From user flows and wireframes in Figma to working HTML, CSS, JavaScript and PHP.</p>
    <div class="actions">
      <a class="btn" href="projects.php">See my work</a>
      <a class="btn ghost" href="contact.php">Get in touch</a>
    </div>
  </div>
  <aside class="inspector" aria-label="Portfolio at a glance">
    <h2>Inspector</h2>
    <dl>
      <?php foreach ($stats as $k => $v): ?>
        <div><dt><?= e($k) ?></dt><dd data-count="<?= (int)$v ?>">0</dd></div>
      <?php endforeach; ?>
    </dl>
    <p class="muted small">Counts are read live from the MySQL database.</p>
    <div class="swatches" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  </aside>
</section>

<section class="block">
  <h2>Welcome</h2>
  <p class="measure">Hello! I’m <strong>Santhosh S</strong>, an aspiring UI/UX designer with a strong foundation in Computer Science and Engineering. I specialise in clean, user-friendly interfaces and in solving human-centred design problems. Explore my academic journey, projects, skills and achievements.</p>
</section>

<section class="block">
  <h2>Quick highlights</h2>
  <ul class="highlights">
    <li>🎓 Pursuing B.E. in Computer Science &amp; Engineering at Kamaraj College.</li>
    <li>💻 Experienced in Figma, Canva, HTML, CSS and UX prototyping.</li>
    <?php foreach ($ach as $a): ?>
      <li><?= e($a['icon']) ?> <?= e($a['title']) ?> at <?= e($a['event']) ?>.</li>
    <?php endforeach; ?>
  </ul>
</section>

<section class="block">
  <div class="row-head"><h2>Recent work</h2><a href="projects.php">All projects</a></div>
  <div class="grid">
    <?php foreach ($latest as $p): ?>
      <article class="card">
        <div class="emoji"><?= e($p['emoji']) ?></div>
        <h3><?= e($p['title']) ?></h3>
        <p><?= e($p['summary']) ?></p>
        <p class="tags"><?php foreach (array_filter(array_map('trim', explode(',', $p['tech']))) as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>
<?php require 'includes/footer.php'; ?>

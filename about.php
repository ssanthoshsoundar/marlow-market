<?php
$title = 'About';
require 'includes/header.php';
$int = db_all('SELECT role, org FROM internships ORDER BY sort_order, id');
$ach = db_all("SELECT title, event, description FROM achievements WHERE type='Hackathon' ORDER BY sort_order LIMIT 1");
?>
<section class="page-head"><h1>About me</h1><p class="lead">Where engineering discipline meets design empathy.</p></section>
<section class="block two-col">
  <div>
    <h2>Who I am</h2>
    <p>I am <strong>Santhosh S</strong>, an aspiring <strong>UI/UX designer</strong> with a strong foundation in <em>Computer Science and Engineering</em>. My journey blends technical knowledge with creative design, so I can craft interfaces that are both functional and pleasant to use.</p>
    <h2>My approach</h2>
    <p>I believe in <strong>human-centred design</strong>: reducing friction and anxiety in high-stakes moments. From <strong>user flows</strong> and <strong>wireframes</strong> in Figma to clean, usable interfaces, I enjoy solving problems that matter.</p>
  </div>
  <div>
    <h2>Experience highlights</h2>
    <ul class="timeline">
      <?php foreach ($int as $i): ?><li><strong><?= e($i['role']) ?></strong><br><span class="muted"><?= e($i['org']) ?></span></li><?php endforeach; ?>
      <?php foreach ($ach as $a): ?><li><strong>Hackathon participant</strong><br><span class="muted"><?= e($a['event']) ?></span></li><?php endforeach; ?>
    </ul>
    <p><a class="btn ghost" href="contact.php">Let’s work together</a></p>
  </div>
</section>
<?php require 'includes/footer.php'; ?>

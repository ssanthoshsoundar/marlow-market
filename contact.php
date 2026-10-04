<?php
require_once 'config.php';

/* ---- Form processing (POST) ---- */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
    $errors = [];

    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!csrf_ok()) $errors[] = 'Your session expired. Please reload the page and try again.';
    if (!empty($_POST['hp_trap'])) $errors[] = 'Spam detected.';           // honeypot
    if (mb_strlen($name) < 2 || mb_strlen($name) > 100) $errors[] = 'Please enter your name (2–100 characters).';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) $errors[] = 'Please enter a valid email address.';
    if (mb_strlen($subject) > 150) $errors[] = 'Subject is too long.';
    if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) $errors[] = 'Message must be 10–2000 characters.';
    if (isset($_SESSION['last_msg']) && time() - $_SESSION['last_msg'] < 20) $errors[] = 'Please wait a few seconds before sending another message.';

    if (!$errors) {
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        if (db_run('INSERT INTO messages (name, email, subject, message, ip) VALUES (?,?,?,?,?)', 'sssss', [$name, $email, $subject, $message, $ip])) {
            $_SESSION['last_msg'] = time();
            $_SESSION['csrf'] = bin2hex(random_bytes(32));
            if ($wantsJson) { header('Content-Type: application/json'); echo json_encode(['ok' => true, 'csrf' => $_SESSION['csrf'], 'msg' => "Thanks, $name! Your message has been saved. I'll reply soon."]); exit; }
            $_SESSION['flash'] = "Thanks, $name! Your message has been saved. I'll reply soon.";
            header('Location: contact.php'); exit;
        }
        $errors[] = 'Could not save your message. Please try again later.';
    }
    if ($wantsJson) { http_response_code(422); header('Content-Type: application/json'); echo json_encode(['ok' => false, 'errors' => $errors]); exit; }
    $formErrors = $errors;
}

$title = 'Contact';
require 'includes/header.php';
$flash = $_SESSION['flash'] ?? null; unset($_SESSION['flash']);
?>
<section class="page-head"><h1>Get in touch</h1><p class="lead">Collaborations, opportunities or just hello. Messages go straight into my database.</p></section>
<section class="block two-col">
  <div>
    <div id="form-status" class="notice" role="status" aria-live="polite" <?= $flash ? '' : 'hidden' ?>><?= e($flash) ?></div>
    <?php if (!empty($formErrors)): ?><div class="notice error" role="alert"><ul><?php foreach ($formErrors as $er): ?><li><?= e($er) ?></li><?php endforeach; ?></ul></div><?php endif; ?>
    <form id="contact-form" method="post" action="contact.php" novalidate>
      <?= csrf_field() ?>
      <label>Name <input type="text" name="name" required minlength="2" maxlength="100" value="<?= e($_POST['name'] ?? '') ?>" autocomplete="name"></label>
      <label>Email <input type="email" name="email" required maxlength="150" value="<?= e($_POST['email'] ?? '') ?>" autocomplete="email"></label>
      <label>Subject (optional) <input type="text" name="subject" maxlength="150" value="<?= e($_POST['subject'] ?? '') ?>"></label>
      <label>Message <textarea name="message" required minlength="10" maxlength="2000" rows="6"><?= e($_POST['message'] ?? '') ?></textarea></label>
      <div class="counter muted small"><span id="char-count">0</span> / 2000</div>
      <div class="hp" aria-hidden="true"><input type="text" name="hp_trap" tabindex="-1" autocomplete="new-password" data-lpignore="true" data-1p-ignore></div>
      <button class="btn" type="submit">Send message</button>
    </form>
  </div>
  <div>
    <h2 class="h3">Other ways to connect</h2>
    <ul class="contact-list">
      <li><span class="muted">Email</span><a href="mailto:santhoshrsoundar@gmail.com">santhoshrsoundar@gmail.com</a></li>
      <li><span class="muted">Phone</span><a href="tel:+919940727852">+91 99407 27852</a></li>
      <li><span class="muted">LinkedIn</span><a href="https://www.linkedin.com/in/santhoshsoundar" target="_blank" rel="noopener">linkedin.com/in/santhoshsoundar</a></li>
      <li><span class="muted">GitHub</span><a href="https://github.com/ssanthoshsoundar" target="_blank" rel="noopener">github.com/ssanthoshsoundar</a></li>
    </ul>
  </div>
</section>
<?php require 'includes/footer.php'; ?>
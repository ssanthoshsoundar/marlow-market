<?php
require_once '_top.php';
require_admin();

/* Whitelisted tables and fields for generic CRUD: [label, type, options] */
$cfg = [
 'projects' => ['title' => 'title', 'fields' => [
    'title' => ['Title', 'text'], 'emoji' => ['Emoji', 'text'], 'category' => ['Category', 'text'],
    'summary' => ['Summary', 'text'], 'details' => ['Details (one point per line)', 'textarea'],
    'tech' => ['Tech tags (comma separated)', 'text'], 'link' => ['Link (optional)', 'text'], 'sort_order' => ['Order', 'number']]],
 'skills' => ['title' => 'name', 'fields' => [
    'category' => ['Category', 'text'], 'name' => ['Name', 'text'], 'level' => ['Level (0-100)', 'number'],
    'icon' => ['Emoji', 'text'], 'sort_order' => ['Order', 'number']]],
 'achievements' => ['title' => 'title', 'fields' => [
    'title' => ['Title', 'text'], 'event' => ['Event', 'text'], 'type' => ['Type', 'text'],
    'description' => ['Description', 'textarea'], 'icon' => ['Emoji', 'text'], 'sort_order' => ['Order', 'number']]],
 'education' => ['title' => 'degree', 'fields' => [
    'degree' => ['Degree / level', 'text'], 'institution' => ['Institution', 'text'], 'period' => ['Period', 'text'],
    'score_label' => ['Score label (CGPA / Percentage)', 'text'], 'score_value' => ['Score', 'text'], 'sort_order' => ['Order', 'number']]],
 'internships' => ['title' => 'role', 'fields' => [
    'role' => ['Role', 'text'], 'org' => ['Organisation', 'text'], 'period' => ['Period', 'text'],
    'description' => ['Description', 'textarea'], 'sort_order' => ['Order', 'number']]],
];
$t = $_GET['t'] ?? 'projects';
if (!isset($cfg[$t])) { http_response_code(404); exit('Unknown section'); }
$fields = $cfg[$t]['fields'];
$titleCol = $cfg[$t]['title'];
$flash = '';
$edit = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_ok()) { exit('Invalid CSRF token'); }
    $action = $_POST['action'] ?? '';
    $id = (int)($_POST['id'] ?? 0);
    if ($action === 'delete' && $id) {
        db_run("DELETE FROM `$t` WHERE id=?", 'i', [$id]);
        $_SESSION['flash'] = 'Deleted.';
    } elseif ($action === 'save') {
        $vals = []; $types = ''; $ok = true;
        foreach ($fields as $col => [$label, $type]) {
            $v = trim($_POST[$col] ?? '');
            if ($type === 'number') { $v = (int)$v; $types .= 'i'; }
            else { $types .= 's'; if ($v === '' && $col !== 'link' && $col !== 'details' && $col !== 'tech') $ok = false; }
            $vals[] = $v;
        }
        if ($t === 'skills') { $vals[2] = max(0, min(100, $vals[2])); }
        if (!$ok) { $_SESSION['flash'] = 'Please fill in all required fields.'; header("Location: manage.php?t=$t" . ($id ? "&edit=$id" : '')); exit; }
        $cols = array_keys($fields);
        if ($id) {
            $set = implode(',', array_map(fn($c) => "`$c`=?", $cols));
            db_run("UPDATE `$t` SET $set WHERE id=?", $types . 'i', [...$vals, $id]);
            $_SESSION['flash'] = 'Updated.';
        } else {
            $ph = implode(',', array_fill(0, count($cols), '?'));
            db_run("INSERT INTO `$t` (" . implode(',', array_map(fn($c) => "`$c`", $cols)) . ") VALUES ($ph)", $types, $vals);
            $_SESSION['flash'] = 'Added.';
        }
    }
    header("Location: manage.php?t=$t"); exit;
}

if (!empty($_GET['edit'])) $edit = db_one("SELECT * FROM `$t` WHERE id=?", 'i', [(int)$_GET['edit']]);
$flash = $_SESSION['flash'] ?? ''; unset($_SESSION['flash']);
$rows = db_all("SELECT * FROM `$t` ORDER BY sort_order, id");
admin_top('Manage ' . $t); ?>
<section class="page-head"><h1>Manage <?= e($t) ?></h1></section>
<section class="block two-col">
  <div>
    <?php if ($flash): ?><div class="notice"><?= e($flash) ?></div><?php endif; ?>
    <h2 class="h3"><?= $edit ? 'Edit item' : 'Add new' ?></h2>
    <form method="post">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" value="<?= (int)($edit['id'] ?? 0) ?>">
      <?php foreach ($fields as $col => [$label, $type]): $val = $edit[$col] ?? ($type === 'number' ? ($col === 'level' ? 70 : 0) : ''); ?>
        <label><?= e($label) ?>
          <?php if ($type === 'textarea'): ?><textarea name="<?= $col ?>" rows="4"><?= e($val) ?></textarea>
          <?php else: ?><input type="<?= $type ?>" name="<?= $col ?>" value="<?= e($val) ?>"<?= $col === 'level' ? ' min="0" max="100"' : '' ?>><?php endif; ?>
        </label>
      <?php endforeach; ?>
      <button class="btn" type="submit"><?= $edit ? 'Save changes' : 'Add' ?></button>
      <?php if ($edit): ?><a class="btn ghost" href="manage.php?t=<?= e($t) ?>">Cancel</a><?php endif; ?>
    </form>
  </div>
  <div>
    <h2 class="h3"><?= count($rows) ?> item(s)</h2>
    <?php foreach ($rows as $r): ?>
      <article class="card msg">
        <p><strong><?= e($r[$titleCol]) ?></strong> <span class="muted small">#<?= (int)$r['sort_order'] ?></span></p>
        <form method="post" class="inline">
          <?= csrf_field() ?><input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
          <a class="btn ghost sm" href="manage.php?t=<?= e($t) ?>&edit=<?= (int)$r['id'] ?>">Edit</a>
          <button class="btn danger sm" name="action" value="delete" data-confirm="Delete this item?">Delete</button>
        </form>
      </article>
    <?php endforeach; ?>
  </div>
</section>
<?php admin_bottom();

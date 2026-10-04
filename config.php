<?php
/* Central configuration, DB connection and helpers */
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
    session_start();
}

const DB_HOST = 'localhost';
const DB_USER = 'root';      // XAMPP default
const DB_PASS = '';          // XAMPP default (empty)
const DB_NAME = 'portfolio';

mysqli_report(MYSQLI_REPORT_OFF);
$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    die('<h2 style="font-family:sans-serif">Database connection failed.</h2><p style="font-family:sans-serif">Import <code>sql/schema.sql</code> in phpMyAdmin and check the credentials in <code>config.php</code>.</p>');
}
$conn->set_charset('utf8mb4');

/** Escape for HTML output */
function e($v): string { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }

/** Run a prepared SELECT; returns array of rows */
function db_all(string $sql, string $types = '', array $params = []): array {
    global $conn;
    $st = $conn->prepare($sql);
    if (!$st) return [];
    if ($types) $st->bind_param($types, ...$params);
    $st->execute();
    $res = $st->get_result();
    $rows = $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
    $st->close();
    return $rows;
}
function db_one(string $sql, string $types = '', array $params = []): ?array {
    $r = db_all($sql, $types, $params);
    return $r[0] ?? null;
}
/** Run INSERT/UPDATE/DELETE; returns true/false */
function db_run(string $sql, string $types = '', array $params = []): bool {
    global $conn;
    $st = $conn->prepare($sql);
    if (!$st) return false;
    if ($types) $st->bind_param($types, ...$params);
    $ok = $st->execute();
    $st->close();
    return $ok;
}

/* CSRF protection */
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function csrf_field(): string { return '<input type="hidden" name="csrf" value="' . csrf_token() . '">'; }
function csrf_ok(): bool {
    return !empty($_POST['csrf']) && hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf']);
}

/* Admin auth */
function is_admin(): bool { return !empty($_SESSION['admin_id']); }
function require_admin(): void {
    if (!is_admin()) { header('Location: login.php'); exit; }
}

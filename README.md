# Santhosh S: Dynamic Portfolio Website

HTML + CSS + JavaScript front end, **PHP** server side, **MySQL** database.

## Features
- 8 pages (Home, About, Academics, Projects, Skills, Achievements, Internships, Contact), all content rendered from MySQL
- Contact form: JS validation, AJAX submit, server validation, CSRF token, honeypot, rate limit, stored in `messages`
- Admin panel (`/admin`): login (hashed password, session, lockout), dashboard, inbox (read/unread/delete/search), add/edit/delete for projects, skills, achievements, education and internships
- JS extras: dark/light theme, project filter + search, animated skill bars, count-up stats, mobile nav
- Security: prepared statements everywhere, output escaping, CSRF protection, `password_verify`

## Setup (XAMPP / WAMP / LAMP)
1. Copy this folder to `htdocs/portfolio` (e.g. `C:\xampp\htdocs\portfolio`).
2. Start **Apache** and **MySQL**.
3. Open phpMyAdmin → *Import* → choose `sql/schema.sql` (creates DB `portfolio`, tables and sample data).
4. If your MySQL user/password differ from root / empty, edit `config.php`.
5. Visit `http://localhost/portfolio/`.

Admin: `http://localhost/portfolio/admin/login.php` → **admin / admin123** (change after first login).

## Structure
```
config.php            DB connection, helpers, CSRF, auth
includes/             shared header & footer
*.php                 public pages
admin/                login, dashboard, messages, manage (CRUD)
assets/css, assets/js styling and interactivity
sql/schema.sql        tables + seed data from your original content
```
Requires PHP 8.0+ (uses `str_contains`, `mysqli`, `mysqlnd`).

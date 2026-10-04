-- Portfolio database for Santhosh S
-- Import in phpMyAdmin (or: mysql -u root < sql/schema.sql)
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio;

DROP TABLE IF EXISTS messages, admins, projects, skills, achievements, education, internships;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(150) NOT NULL,
  institution VARCHAR(200) NOT NULL,
  period VARCHAR(30) NOT NULL,
  score_label VARCHAR(20) NOT NULL,
  score_value VARCHAR(20) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  emoji VARCHAR(10) DEFAULT '✨',
  category VARCHAR(50) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  details TEXT,
  tech VARCHAR(255),
  link VARCHAR(255),
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  level TINYINT UNSIGNED NOT NULL DEFAULT 70,
  icon VARCHAR(10) DEFAULT '⭐',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  event VARCHAR(200) NOT NULL,
  type VARCHAR(40) NOT NULL,
  description TEXT,
  icon VARCHAR(10) DEFAULT '🏆',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE internships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(150) NOT NULL,
  org VARCHAR(200) NOT NULL,
  period VARCHAR(40) NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(150) DEFAULT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  ip VARCHAR(45) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin: admin / admin123  (change it after first login)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2b$10$0pscAhC2pv0nbxusJWygVec7ECduTaRkq5nCKPY2z4t5ZIW2aQxnK');

INSERT INTO education (degree, institution, period, score_label, score_value, sort_order) VALUES
('B.E. Computer Science & Engineering', 'Kamaraj College of Engineering and Technology', '2024–2028', 'CGPA', '7.80 / 10', 1),
('Higher Secondary', 'Sri Chaithanya', '2022–2024', 'Percentage', '87.4%', 2),
('High School', 'St. Ann''s High School, Hyderabad', '2010–2022', 'Percentage', '80%', 3);

INSERT INTO projects (title, emoji, category, summary, details, tech, link, sort_order) VALUES
('Safe Crash App', '📱', 'UX Case Study', 'A mobile safety app designed as a UX case study.',
 'Mapped the core user flow for registering emergency contacts and receiving crash alerts.\nDesigned a 15-second cancellation window as a deliberate safeguard against false positives.\nTranslated raw sensor input (vibration/movement) into a simple, calm interface.',
 'Figma,User Flows,Wireframing,Prototyping', '', 1),
('Inventory Management System', '📊', 'Web App', 'An internal workflow tool for stock tracking.',
 'Designed a streamlined interface for stock tracking to reduce manual errors.\nStructured the underlying information architecture with a normalized schema.\nEnsured a fast and reliable user-facing experience.',
 'Node.js,Express,SQLite,HTML,CSS', 'https://github.com/ssanthoshsoundar', 2),
('Personal Portfolio (this site)', '🌐', 'Web App', 'A database-driven portfolio with an admin panel.',
 'Content for every page is stored in MySQL and rendered by PHP.\nContact form is validated in JavaScript and processed securely on the server.\nAdmin dashboard to read messages and manage projects, skills and more.',
 'PHP,MySQL,JavaScript,CSS', '', 3);

INSERT INTO skills (category, name, level, icon, sort_order) VALUES
('Design Tools', 'Figma', 85, '🎨', 1),
('Design Tools', 'Canva', 80, '🖌️', 2),
('UX Practice', 'User Flows', 85, '🔄', 1),
('UX Practice', 'Wireframing', 85, '📐', 2),
('UX Practice', 'Rapid Prototyping', 80, '⚡', 3),
('UX Practice', 'Usability-First Thinking', 80, '👥', 4),
('UX Practice', 'Information Architecture', 75, '📊', 5),
('UI Craft', 'Layout & Visual Hierarchy', 85, '📏', 1),
('UI Craft', 'Responsive Design', 80, '📱', 2),
('UI Craft', 'Interaction Design', 75, '🎬', 3),
('Front-End & Back-End', 'HTML', 90, '💻', 1),
('Front-End & Back-End', 'CSS', 85, '🎨', 2),
('Front-End & Back-End', 'JavaScript', 70, '⚙️', 3),
('Front-End & Back-End', 'PHP & MySQL', 65, '🗄️', 4);

INSERT INTO achievements (title, event, type, description, icon, sort_order) VALUES
('Hackathon Participant', 'TechathonX 2K26', 'Hackathon', '24-hour national-level hackathon in AI & Data Science. Gained hands-on experience in rapid prototyping and collaborative problem-solving.', '🏆', 1),
('Paper Presentation', 'Aarohan ''25', 'Paper', 'Presented innovative ideas in computer science and design, showcasing analytical and communication skills.', '📄', 2),
('Paper Presentation', 'Techaura 2.0 IEEE KPRIET', 'Paper', 'Shared research insights with peers and industry experts, strengthening technical knowledge and presentation abilities.', '📄', 3);

INSERT INTO internships (role, org, period, description, sort_order) VALUES
('Networking Intern', 'I4 Communications Pvt. Ltd., Hyderabad', '2024', 'Deployed at CtrlS Tier IV Data Center, contributing to Meta''s server expansion project. This sharpened my attention to detail and systems thinking, skills I now apply to design work.', 1),
('Tata Job Simulation', 'Forage Virtual Internship', 'Virtual', 'Practiced translating data-driven insights into strategic recommendations, a skill directly transferable to evidence-based design decisions in UI/UX projects.', 2);

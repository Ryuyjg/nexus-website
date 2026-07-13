<?php
declare(strict_types=1);

const ADMIN_USER = 'nexaadmin';
const ADMIN_PASSWORD_SHA256 = 'f6ed142af3c3b6d9bb98b19dfda4f371c13289abba1b40beef87960dacd8f289';

function require_admin(): void
{
    $user = $_SERVER['PHP_AUTH_USER'] ?? '';
    $password = $_SERVER['PHP_AUTH_PW'] ?? '';
    $validUser = hash_equals(ADMIN_USER, $user);
    $validPassword = hash_equals(ADMIN_PASSWORD_SHA256, hash('sha256', $password));

    if (!$validUser || !$validPassword) {
        header('WWW-Authenticate: Basic realm="Nexa Enquiries"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Authentication required.';
        exit;
    }
}

function db(): PDO
{
    $private = dirname(__DIR__) . '/private';
    if (!is_dir($private) && !mkdir($private, 0750, true) && !is_dir($private)) {
        throw new RuntimeException('Could not create storage directory.');
    }

    $pdo = new PDO('sqlite:' . $private . '/enquiries.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            preferred_date TEXT DEFAULT "",
            message TEXT DEFAULT "",
            source TEXT DEFAULT "website",
            status TEXT DEFAULT "new",
            ip TEXT DEFAULT "",
            user_agent TEXT DEFAULT "",
            created_at TEXT NOT NULL
        )'
    );
    return $pdo;
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

require_admin();
$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)($_POST['id'] ?? 0);
    $status = (string)($_POST['status'] ?? 'new');
    $allowed = ['new', 'contacted', 'closed'];

    if ($id > 0 && in_array($status, $allowed, true)) {
        $stmt = $pdo->prepare('UPDATE enquiries SET status = :status WHERE id = :id');
        $stmt->execute([':status' => $status, ':id' => $id]);
    }

    header('Location: /admin');
    exit;
}

$rows = $pdo
    ->query('SELECT * FROM enquiries ORDER BY id DESC LIMIT 250')
    ->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nexa Enquiries</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f1e8;
      --ink: #17120d;
      --muted: #6c6258;
      --panel: #fffdf8;
      --line: #e4d9ca;
      --accent: #4f6b58;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--ink);
    }
    main { width: min(1180px, calc(100% - 32px)); margin: 32px auto; }
    header { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
    h1 { margin: 0; font-size: clamp(28px, 4vw, 44px); letter-spacing: 0; }
    .sub { margin-top: 8px; color: var(--muted); }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 18px 60px rgba(23, 18, 13, 0.08);
    }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
    th { font-size: 13px; color: var(--muted); background: rgba(255, 255, 255, 0.55); }
    td { font-size: 14px; }
    .message { max-width: 320px; white-space: pre-wrap; }
    .pill {
      display: inline-flex;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: var(--accent);
    }
    select, button {
      min-height: 36px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
      padding: 0 10px;
      font: inherit;
    }
    button {
      cursor: pointer;
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
      font-weight: 700;
    }
    form { display: flex; gap: 8px; align-items: center; }
    .empty { padding: 48px; text-align: center; color: var(--muted); }
    @media (max-width: 760px) {
      header { display: block; }
      .panel { overflow-x: auto; }
      table { min-width: 860px; }
    }
  </style>
</head>
<body>
<main>
  <header>
    <div>
      <h1>Nexa Enquiries</h1>
      <div class="sub"><?php echo count($rows); ?> latest enquiries</div>
    </div>
    <a href="/" style="color: var(--accent); font-weight: 700;">Open site</a>
  </header>

  <section class="panel">
    <?php if (count($rows) === 0): ?>
      <div class="empty">No enquiries yet.</div>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Preferred Date</th>
            <th>Message</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($rows as $row): ?>
            <tr>
              <td><?php echo h((string)$row['created_at']); ?></td>
              <td><strong><?php echo h((string)$row['name']); ?></strong></td>
              <td>
                <a href="mailto:<?php echo h((string)$row['email']); ?>"><?php echo h((string)$row['email']); ?></a><br>
                <a href="tel:<?php echo h((string)$row['phone']); ?>"><?php echo h((string)$row['phone']); ?></a>
              </td>
              <td><?php echo h((string)$row['preferred_date']); ?></td>
              <td class="message"><?php echo h((string)$row['message']); ?></td>
              <td><span class="pill"><?php echo h((string)$row['status']); ?></span></td>
              <td>
                <form method="post">
                  <input type="hidden" name="id" value="<?php echo (int)$row['id']; ?>">
                  <select name="status">
                    <?php foreach (['new', 'contacted', 'closed'] as $status): ?>
                      <option value="<?php echo $status; ?>" <?php echo $row['status'] === $status ? 'selected' : ''; ?>>
                        <?php echo $status; ?>
                      </option>
                    <?php endforeach; ?>
                  </select>
                  <button type="submit">Save</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </section>
</main>
</body>
</html>

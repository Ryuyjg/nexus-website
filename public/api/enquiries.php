<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

function read_input(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $type = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($type, 'application/json') !== false) {
        $json = json_decode($raw, true);
        return is_array($json) ? $json : [];
    }

    return $_POST;
}

function clean_string(array $data, string $key, int $max): string
{
    $value = trim((string)($data[$key] ?? ''));
    $value = preg_replace('/\s+/', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function db(): PDO
{
    $private = dirname(__DIR__, 2) . '/private';

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

try {
    $data = read_input();

    // Hidden field for low-effort spam bots.
    if (trim((string)($data['website'] ?? '')) !== '') {
        echo json_encode(['ok' => true]);
        exit;
    }

    $name = clean_string($data, 'name', 120);
    $email = clean_string($data, 'email', 160);
    $phone = clean_string($data, 'phone', 60);
    $preferredDate = clean_string($data, 'preferredDate', 80);
    $message = clean_string($data, 'message', 1000);

    if ($name === '' || $email === '' || $phone === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Name, email, and phone are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
        exit;
    }

    $stmt = db()->prepare(
        'INSERT INTO enquiries
            (name, email, phone, preferred_date, message, source, ip, user_agent, created_at)
         VALUES
            (:name, :email, :phone, :preferred_date, :message, :source, :ip, :user_agent, :created_at)'
    );

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':preferred_date' => $preferredDate,
        ':message' => $message,
        ':source' => 'website-contact',
        ':ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ':user_agent' => mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255),
        ':created_at' => gmdate('c'),
    ]);

    echo json_encode(['ok' => true]);
} catch (Throwable $error) {
    error_log('Nexa enquiry error: ' . $error->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not save enquiry.']);
}

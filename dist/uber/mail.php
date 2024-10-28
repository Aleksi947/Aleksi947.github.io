<?php

// Автозагрузка классов
spl_autoload_register(function ($class) {
    $filename = dirname(__FILE__) . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_file($filename)) {
        require $filename;
    }
});

// Подключаем необходимые классы PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    $name = isset($_POST['user_name']) ? $_POST['user_name'] : '';
    $phone = isset($_POST['user_phone']) ? $_POST['user_phone'] : '';
    $email = isset($_POST['user_email']) ? $_POST['user_email'] : '';

    $mail->isSMTP();
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'saneklomakin94@mail.ru';
    $mail->Password = '8Q7UtPwGv16Q4NrnyM9u';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom('saneklomakin94@mail.ru', 'Your Name');
    $mail->addAddress('hitsaaja94@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Заявка с тестового сайта';
    $mail->Body = '' . $name . ' оставил заявку, его телефон ' . $phone . '<br>Почта этого пользователя: ' . $email;
    $mail->AltBody = $name . ' оставил заявку, его телефон ' . $phone . ' Почта этого пользователя: ' . $email;

    if (!$mail->send()) {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при отправке: ' . $mail->ErrorInfo]);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Заявка успешно отправлена!']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $mail->ErrorInfo]);
}
?>


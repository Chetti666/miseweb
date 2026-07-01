<?php
// Configuración
$destinatario = "contacto@carlogtz.cl";
$asunto = "Nuevo contacto desde la página web";

// Verificar si se enviaron los datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recoger los datos del formulario de forma segura
    $nombre = htmlspecialchars(strip_tags(trim($_POST["nombre"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $tipo = htmlspecialchars(strip_tags(trim($_POST["tipo"])));
    $mensaje = htmlspecialchars(strip_tags(trim($_POST["mensaje"])));
    
    // Validar que no estén vacíos los campos principales
    if (empty($nombre) || empty($email) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirigir de vuelta con error o mostrar mensaje
        echo "<script>alert('Por favor, completa todos los campos correctamente.'); window.history.back();</script>";
        exit;
    }
    
    // Construir el cuerpo del mensaje
    $cuerpoMensaje = "Has recibido un nuevo mensaje desde el formulario web de Carlo Gtz:\n\n";
    $cuerpoMensaje .= "Nombre: " . $nombre . "\n";
    $cuerpoMensaje .= "Correo: " . $email . "\n";
    $cuerpoMensaje .= "Tipo de proyecto: " . $tipo . "\n";
    $cuerpoMensaje .= "Mensaje:\n" . $mensaje . "\n";
    
    // Cabeceras del correo
    $headers = "From: " . $nombre . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Enviar el correo usando la función nativa de PHP (muy compatible con cPanel)
    $envio = mail($destinatario, $asunto, $cuerpoMensaje, $headers);
    
    if ($envio) {
        // Si se envía correctamente, mostramos un mensaje y volvemos a la página anterior
        echo "<script>alert('¡Mensaje enviado con éxito! Te contactaremos pronto.'); window.location.href = '/contacto';</script>";
    } else {
        echo "<script>alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o escribe directamente a contacto@carlogtz.cl'); window.history.back();</script>";
    }
    
} else {
    // Si alguien entra al archivo PHP directamente sin usar el formulario
    header("Location: /contacto");
    exit;
}
?>

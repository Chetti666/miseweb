import nodemailer from 'nodemailer';

export default async function handler(request, response) {
  // Solo permitir peticiones POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, tipo, mensaje } = request.body;

  // Validación básica
  if (!nombre || !email || !mensaje) {
    return response.redirect(303, '/contacto?status=error&msg=missing_fields');
  }

  // Configuración del transportador SMTP usando variables de entorno de Vercel
  const transporter = nodemailer.createTransport({
    host: 's520.v2nets.com',
    port: 465,
    secure: true, // SSL/TLS
    auth: {
      user: process.env.SMTP_USER || 'contacto@carlogtz.cl',
      pass: process.env.SMTP_PASSWORD // Configurado de manera segura en Vercel
    },
    // Omitir validación estricta de certificados si es necesario
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"Web Carlo Gtz" <${process.env.SMTP_USER || 'contacto@carlogtz.cl'}>`,
    to: 'contacto@carlogtz.cl',
    replyTo: email, // Permite responder directamente al correo del cliente
    subject: `[Web Contacto] ${tipo ? tipo.toUpperCase() : 'Nuevo Mensaje'} - ${nombre}`,
    text: `Nombre: ${nombre}\nCorreo: ${email}\nTipo de proyecto: ${tipo}\nMensaje:\n\n${mensaje}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h2 style="color: #333333; border-bottom: 2px solid #08bbae; padding-bottom: 10px;">Nuevo Mensaje desde la Web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Correo de contacto:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Tipo de proyecto:</strong> ${tipo ? tipo : 'No especificado'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #08bbae;">
            <p style="margin: 0; font-style: italic; color: #555555;">${mensaje.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return response.redirect(303, '/contacto?status=success');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return response.redirect(303, `/contacto?status=error&msg=mail_error`);
  }
}

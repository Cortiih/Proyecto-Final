package com.proyecto.backend.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailReserva(String destinatario, String asunto, String htmlMensaje) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(htmlMensaje, true); // true = es HTML

            mailSender.send(mensaje);

        } catch (Exception e) {
            System.out.println("Error enviando correo HTML: " + e.getMessage());
        }
    }
}

// Formulario de contacto con EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init('MrteOKWGU8_1ZeBpn'); // Reemplazar con tu clave pública

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                asunto: formData.get('asunto'),
                mensaje: formData.get('mensaje')
            };
            
            // Validar datos
            if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
                showMessage('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Mostrar mensaje de envío
            showMessage('Enviando mensaje...', 'info');
            
            // Parámetros para EmailJS
            const templateParams = {
                from_name: data.nombre,
                from_email: data.email,
                subject: data.asunto,
                message: data.mensaje,
                to_email: 'hola@olimarteam.uy'
            };

            // Enviar email usando EmailJS
            emailjs.send('service_u1rl1nr', 'template_llaeler', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctame directamente.', 'error');
                });
        });
    }
    
    function showMessage(message, type) {
        // Remover mensaje anterior si existe
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        
        // Insertar después del formulario
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});
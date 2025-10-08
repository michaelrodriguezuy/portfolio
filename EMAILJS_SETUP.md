# 📧 Configuración de EmailJS

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar servicio de email
1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** (ej: `service_xxxxxxx`)

### 3. Crear template de email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa este template:

```
Subject: Nuevo mensaje de contacto - {{subject}}

Hola Michael,

Has recibido un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde tu portfolio web
```

4. **Copia el Template ID** (ej: `template_xxxxxxx`)

### 4. Obtener Public Key
1. Ve a **Account** > **General**
2. **Copia tu Public Key** (ej: `xxxxxxxxxxxxxxx`)

### 5. Actualizar el código
En el archivo `js/contact.js`, reemplaza:

```javascript
// Línea 4: Reemplazar YOUR_PUBLIC_KEY
emailjs.init('TU_PUBLIC_KEY_AQUI');

// Línea 45: Reemplazar YOUR_SERVICE_ID y YOUR_TEMPLATE_ID
emailjs.send('TU_SERVICE_ID_AQUI', 'TU_TEMPLATE_ID_AQUI', templateParams)
```

### 6. Probar el formulario
1. Abre tu sitio en el navegador
2. Ve a la sección de contacto
3. Llena el formulario y envía
4. Revisa tu email

## ✅ Listo!
Tu formulario ahora enviará emails directamente desde la página sin abrir el cliente de correo.

## 📊 Límites gratuitos:
- 200 emails por mes
- 2 servicios de email
- 2 templates

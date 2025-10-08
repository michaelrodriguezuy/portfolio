# 📸 Instrucciones para procesar la imagen de Michael

## 🎯 Objetivo
Crear una imagen de Michael sin fondo y con efecto "no tan nítido" para la sección hero.

## 🛠️ Herramientas recomendadas

### **Para quitar el fondo (Gratis):**
1. **Remove.bg** - https://www.remove.bg/
   - Sube la imagen `img/michael.png`
   - Descarga la versión sin fondo
   - Renombra como `michael-no-bg.png`

2. **Canva** - https://www.canva.com/
   - Herramienta de recorte automático
   - Exporta como PNG con transparencia

3. **GIMP** (Software gratuito)
   - Herramienta de selección por color
   - Borrador de fondo

### **Para el efecto "no tan nítido":**
El CSS ya incluye estos filtros:
```css
filter: blur(1px) brightness(0.9) contrast(0.95);
```

Si quieres ajustar el efecto, puedes modificar:
- `blur(1px)` - Más blur = menos nítido
- `brightness(0.9)` - Menos brillo
- `contrast(0.95)` - Menos contraste

## 📋 Pasos recomendados

### 1. **Quitar el fondo**
- Usa Remove.bg para eliminar el fondo automáticamente
- Guarda como `michael-no-bg.png` en la carpeta `img/`

### 2. **Actualizar el HTML**
Cambiar en `index.html`:
```html
<img src="img/michael-no-bg.png" alt="Michael Rodríguez" class="hero-photo" />
```

### 3. **Ajustar el efecto CSS** (opcional)
En `css/app.css`, línea 1720:
```css
/* Efecto más suave */
filter: blur(0.5px) brightness(0.95) contrast(0.98);

/* Efecto más pronunciado */
filter: blur(2px) brightness(0.8) contrast(0.9);
```

## 🎨 Resultado esperado
- Imagen sin fondo (transparente)
- Efecto sutil de desenfoque
- Integración natural con el diseño
- Responsive en todos los dispositivos

## 📱 Tamaños responsive
- **Desktop**: 400x500px
- **Tablet**: 300x400px  
- **Mobile**: 250x320px

## ✅ Listo para usar
Una vez procesada la imagen, la sección hero estará completamente funcional con el diseño moderno similar a la referencia.

# Optimización de Imágenes - Portfolio Michael Rodríguez

## 📸 Imágenes que necesitan optimización

### Proyectos (Slider)
- **eCommerce.png** (2.5MB) → Convertir a WebP, reducir a 800x800px
- **yerbalito.png** (1.1MB) → Convertir a WebP, reducir a 800x800px  
- **pelis.png** (427KB) → Convertir a WebP, reducir a 800x800px
- **eqm.png** (69KB) → Convertir a WebP, mantener tamaño
- **Touruguay.png** (161KB) → Convertir a WebP, mantener tamaño
- **kukastore.png** (2.6MB) → Convertir a WebP, reducir a 800x800px
- **indiacueros.png** (2.1MB) → Convertir a WebP, reducir a 800x800px

### Imágenes de fondo
- **fondo_portada.jpg** → Optimizar y convertir a WebP
- **fondo.jpg** → Optimizar y convertir a WebP

## 🛠️ Herramientas recomendadas

### Online (Gratis)
1. **TinyPNG** - https://tinypng.com/
2. **Squoosh** - https://squoosh.app/
3. **Convertio** - https://convertio.co/png-webp/

### Software
1. **GIMP** (Gratis)
2. **Photoshop** (Pago)
3. **ImageOptim** (Mac, Gratis)

## 📋 Pasos para optimizar

### 1. Redimensionar
- **Proyectos:** 800x800px máximo
- **Fondos:** 1920x1080px máximo
- **Iconos:** Mantener tamaño actual

### 2. Convertir formato
- **PNG → WebP** (mejor compresión)
- **JPG → WebP** (mejor calidad)
- **Mantener PNG** solo si necesitas transparencia

### 3. Comprimir
- **WebP:** Calidad 80-85%
- **PNG:** Usar compresión optimizada
- **JPG:** Calidad 85-90%

### 4. Implementar en HTML
```html
<!-- Ejemplo con fallback -->
<picture>
  <source srcset="imagen.webp" type="image/webp">
  <img src="imagen.png" alt="Descripción" loading="lazy">
</picture>
```

## 🎯 Objetivos de optimización

### Tamaños objetivo:
- **eCommerce.png:** 2.5MB → 200KB
- **yerbalito.png:** 1.1MB → 150KB
- **pelis.png:** 427KB → 100KB
- **eqm.png:** 69KB → 50KB
- **Touruguay.png:** 161KB → 80KB
- **kukastore.png:** 2.6MB → 200KB
- **indiacueros.png:** 2.1MB → 180KB

### Beneficios esperados:
- ⚡ **Carga 80% más rápida**
- 📱 **Mejor experiencia móvil**
- 🔍 **Mejor SEO**
- 💰 **Menos ancho de banda**

## 📝 Notas importantes

1. **Mantener calidad visual** - No sacrificar calidad por tamaño
2. **Probar en diferentes dispositivos** - Verificar que se vea bien
3. **Backup original** - Guardar versiones originales
4. **Actualizar HTML** - Cambiar rutas de imágenes después de optimizar

## 🔄 Proceso recomendado

1. **Hacer backup** de todas las imágenes
2. **Optimizar una por una** para verificar calidad
3. **Probar en el sitio** antes de reemplazar todas
4. **Actualizar HTML** con nuevas rutas
5. **Verificar rendimiento** con herramientas como PageSpeed Insights

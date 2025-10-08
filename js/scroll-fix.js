// Prevenir scroll bounce en iOS - Versión simplificada
document.addEventListener('DOMContentLoaded', function() {
    // Solo prevenir scroll bounce sin cambiar el layout
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const diffY = startY - currentY;
        
        // Si estamos en el top y intentamos hacer scroll hacia arriba
        if (window.scrollY === 0 && diffY < 0) {
            e.preventDefault();
        }
        
        // Si estamos en el bottom y intentamos hacer scroll hacia abajo
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight && diffY > 0) {
            e.preventDefault();
        }
    }, { passive: false });
});

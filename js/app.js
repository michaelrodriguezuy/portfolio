'use strict'

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.getElementById('cursor');
    
    // Movimiento del cursor
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = (e.clientX - 40) + 'px';
        cursor.style.top = (e.clientY - 40) + 'px';
    });
    
    // Efecto hover en enlaces
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('mini');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('mini');
        });
    });
});


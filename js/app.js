'use strict'

/**
 * Text Scramble — misma lógica que motion-primitives (21st.dev):
 * https://github.com/ibelick/motion-primitives/blob/main/components/core/text-scramble.tsx
 * - duration (s): duración total del efecto
 * - speed (s): intervalo entre cada paso (tick)
 * - Ola izquierda→derecha: cada letra se fija cuando progress * length > índice
 */
const SCRAMBLE_CHARSET_DEFAULT =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/** Valores por defecto del componente original */
const SCRAMBLE_DURATION_DEFAULT = 1.2;
const SCRAMBLE_SPEED_DEFAULT = 0.08;

function runTextScramble(element) {
    const text = element.getAttribute('data-scramble-text') || element.textContent;
    const duration = parseFloat(element.getAttribute('data-scramble-duration'));
    const speed = parseFloat(element.getAttribute('data-scramble-speed'));
    const durationSec = Number.isFinite(duration) ? duration : SCRAMBLE_DURATION_DEFAULT;
    const speedSec = Number.isFinite(speed) ? speed : SCRAMBLE_SPEED_DEFAULT;
    const steps = Math.max(1, Math.ceil(durationSec / speedSec));
    const intervalMs = speedSec * 1000;
    const charset =
        element.getAttribute('data-scramble-charset') || SCRAMBLE_CHARSET_DEFAULT;

    let step = 0;
    const intervalId = window.setInterval(function () {
        let scrambled = '';
        const progress = step / steps;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                scrambled += ' ';
                continue;
            }
            if (progress * text.length > i) {
                scrambled += text[i];
            } else {
                scrambled +=
                    charset[Math.floor(Math.random() * charset.length)];
            }
        }

        element.textContent = scrambled;
        step += 1;

        if (step > steps) {
            window.clearInterval(intervalId);
            element.textContent = text;
        }
    }, intervalMs);
}

function initHeroTextScramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    document.querySelectorAll('.js-text-scramble').forEach(function (el) {
        const finalText = el.textContent;
        el.setAttribute('data-scramble-text', finalText);
        const delay = parseInt(el.getAttribute('data-scramble-delay') || '0', 10);
        const start = function () {
            runTextScramble(el);
        };
        if (delay > 0) {
            setTimeout(start, delay);
        } else {
            start();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initHeroTextScramble();

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


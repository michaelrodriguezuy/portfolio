'use strict'

/**
 * Dock magnético: contacto = fila (eje X). Habilidades = columna (.magnetic-dock--vertical, eje Y).
 */
function initOneMagneticDock(dock) {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const vertical = dock.classList.contains('magnetic-dock--vertical');

    const items = Array.from(dock.querySelectorAll('a.magnetic-dock__link'));
    if (!items.length) return;

    const MIN_W = 48;
    const MAX_FOCUS = 92;
    const MAX_NEIGHBOR = 62;
    const DIST_MAX = 200;
    const TAU = 0.1;

    const ABS_MAX = Math.max(MAX_FOCUS, MAX_NEIGHBOR);

    const n = items.length;
    const targets = new Array(n).fill(MIN_W);
    const currents = new Array(n).fill(MIN_W);
    let rafId = null;
    let lastT = 0;

    function applySize(i, w) {
        const el = items[i];
        const clamped = Math.max(MIN_W, Math.min(ABS_MAX, w));
        el.style.width = clamped + 'px';
        el.style.height = clamped + 'px';
        el.style.setProperty('--dock-hit', clamped + 'px');
    }

    for (let i = 0; i < n; i++) {
        applySize(i, MIN_W);
    }

    function neighborFromDistance(dist) {
        if (dist >= DIST_MAX) return MIN_W;
        return MAX_NEIGHBOR + (MIN_W - MAX_NEIGHBOR) * (dist / DIST_MAX);
    }

    function focusFromDistance(dist) {
        if (dist >= DIST_MAX) return MIN_W;
        return MAX_FOCUS + (MIN_W - MAX_FOCUS) * (dist / DIST_MAX);
    }

    function updateTargets(clientX, clientY) {
        const dists = new Array(n);
        for (let i = 0; i < n; i++) {
            const rect = items[i].getBoundingClientRect();
            if (vertical) {
                const cy = rect.top + rect.height / 2;
                dists[i] = Math.abs(clientY - cy);
            } else {
                const cx = rect.left + rect.width / 2;
                dists[i] = Math.abs(clientX - cx);
            }
        }
        let focusIdx = 0;
        for (let j = 1; j < n; j++) {
            if (dists[j] < dists[focusIdx]) {
                focusIdx = j;
            }
        }
        for (let i = 0; i < n; i++) {
            targets[i] = i === focusIdx ? focusFromDistance(dists[i]) : neighborFromDistance(dists[i]);
        }
    }

    function step(now) {
        const t = now !== undefined ? now : performance.now();
        const dt = lastT > 0 ? Math.min((t - lastT) / 1000, 0.05) : 1 / 60;
        lastT = t;

        const k = 1 - Math.exp(-dt / TAU);

        let moving = false;
        for (let i = 0; i < n; i++) {
            const d = targets[i] - currents[i];
            if (Math.abs(d) > 0.02) {
                currents[i] += d * k;
                moving = true;
            } else {
                currents[i] = targets[i];
            }
            applySize(i, currents[i]);
        }

        if (moving) {
            rafId = window.requestAnimationFrame(step);
        } else {
            rafId = null;
        }
    }

    function pump() {
        if (!rafId) {
            rafId = window.requestAnimationFrame(step);
        }
    }

    dock.addEventListener('mouseenter', function (e) {
        updateTargets(e.clientX, e.clientY);
        pump();
    });

    dock.addEventListener('mousemove', function (e) {
        updateTargets(e.clientX, e.clientY);
        pump();
    });

    dock.addEventListener('mouseleave', function () {
        targets.fill(MIN_W);
        pump();
    });
}

function initMagneticDock() {
    document.querySelectorAll('.magnetic-dock').forEach(initOneMagneticDock);
}

document.addEventListener('DOMContentLoaded', initMagneticDock);

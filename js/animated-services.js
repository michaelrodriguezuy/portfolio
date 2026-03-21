document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.as-img-wrapper');
    const texts = document.querySelectorAll('.as-text-wrapper');
    const nextBtn = document.querySelector('.as-next');
    const prevBtn = document.querySelector('.as-prev');
    const quotes = document.querySelectorAll('.as-text-wrapper .quote');

    if (!images.length || !texts.length) return;

    let activeIndex = 0;
    const length = images.length;
    let autoplayInterval;

    // Splitting words for blur effect
    quotes.forEach(quote => {
        const text = quote.textContent.trim();
        quote.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const span = document.createElement('span');
            span.className = 'blur-word';
            span.textContent = word;
            span.style.setProperty('--index', wordIndex);
            quote.appendChild(span);
            // Agregamos un nodo de texto con espacio para que el navegador rompa líneas naturalmente
            quote.appendChild(document.createTextNode(' '));
        });
    });

    function updateServices(direction = 'next') {
        // Images logic
        images.forEach((img, index) => {
            const rot = img.getAttribute('data-rotate') || '0';

            if (index === activeIndex) {
                // Front active image
                img.style.zIndex = '999';
                img.style.opacity = '1';

                // Animación "bounce" desde arriba pero sin bugs
                img.style.transition = 'transform 0.2s ease-out, opacity 0.4s ease';
                img.style.transform = `scale(1) translateY(-40px) rotate(0deg)`;

                if (img.timeoutId) clearTimeout(img.timeoutId);
                img.timeoutId = setTimeout(() => {
                    img.style.transition = 'transform 0.3s cubic-bezier(0.4, 2, 0.2, 1)';
                    img.style.transform = `scale(1) translateY(0px) rotate(0deg)`;
                }, 200);
            } else {
                // In background / inactive
                if (img.timeoutId) clearTimeout(img.timeoutId);
                img.style.zIndex = length + 2 - index;
                img.style.opacity = '0.7';
                img.style.transition = 'transform 0.5s cubic-bezier(0.4, 2, 0.2, 1), opacity 0.5s ease';
                img.style.transform = `scale(0.95) translateY(0px) rotate(${rot}deg)`;
            }
        });

        // Texts logic
        texts.forEach((text, i) => {
            if (i === activeIndex) {
                text.classList.add('active');
                text.classList.remove('exit');

                const title = text.querySelector('.name');
                const designation = text.querySelector('.designation');
                const words = text.querySelectorAll('.blur-word');

                if (title) {
                    title.style.animation = 'none';
                    title.offsetHeight;
                    title.style.animation = 'asFadeInUp 0.3s ease forwards';
                }

                if (designation) {
                    designation.style.animation = 'none';
                    designation.offsetHeight;
                    designation.style.animation = 'asFadeInUp 0.3s ease forwards 0.1s';
                }

                words.forEach(word => {
                    word.style.animation = 'none';
                    word.offsetHeight;
                    word.style.animation = 'blurWordIn 0.3s ease forwards calc(var(--index) * 0.02s + 0.2s)';
                });

            } else if (text.classList.contains('active')) {
                text.classList.remove('active');
                text.classList.add('exit');
                // Exit animation wrapper classes if needed
            }
        });

        // Container dynamic height
        setTimeout(() => {
            const textsContainer = document.querySelector('.as-texts-container');
            if (!textsContainer) return;
            let maxHeight = 0;
            texts.forEach(t => {
                const prevVis = t.style.visibility;
                const prevDisp = t.style.display;
                t.style.visibility = 'hidden';
                t.style.display = 'block';
                const h = t.offsetHeight;
                if (h > maxHeight) maxHeight = h;
                t.style.visibility = prevVis;
                t.style.display = prevDisp;
            });
            if (maxHeight > 0) textsContainer.style.minHeight = `${maxHeight}px`;
        }, 50);
    }

    function next() {
        activeIndex = (activeIndex + 1) % length;
        updateServices('next');
        resetAutoplay();
    }

    function prev() {
        activeIndex = (activeIndex - 1 + length) % length;
        updateServices('prev');
        resetAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(next, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    window.addEventListener('resize', () => {
        const textsContainer = document.querySelector('.as-texts-container');
        if (!textsContainer) return;
        let maxHeight = 0;
        texts.forEach(t => {
            const h = t.offsetHeight;
            if (h > maxHeight) maxHeight = h;
        });
        if (maxHeight > 0) textsContainer.style.minHeight = `${maxHeight}px`;
    });

    document.addEventListener('keydown', (e) => {
        const asImageContainer = document.querySelector('.as-image-container');
        if (!asImageContainer) return;
        const rect = asImageContainer.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }
    });

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    updateServices();
    startAutoplay();
});

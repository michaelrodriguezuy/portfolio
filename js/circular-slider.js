document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.cs-image-wrapper');
    const texts = document.querySelectorAll('.cs-text-wrapper');
    const nextBtn = document.querySelector('.cs-next');
    const prevBtn = document.querySelector('.cs-prev');
    const imageContainer = document.querySelector('.cs-image-container');

    if (!images.length || !texts.length) return;

    const length = images.length;
    let activeIndex = 0;
    let autoplayInterval;
    let containerWidth = 1200;

    // Calcula el "gap" y el "offset Y" (stickUp) según versión React
    function calculateGap(width) {
        const minWidth = 1024;
        const maxWidth = 1456;
        const minGap = 60;
        const maxGap = 86;
        if (width <= minWidth) return minGap;
        if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
        return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
    }

    function handleResize() {
        if (imageContainer) {
            containerWidth = imageContainer.offsetWidth;
            updateSlider();
        }

        // Timeout ligero para asegurar el render de CSS
        setTimeout(() => {
            const textsContainer = document.querySelector('.cs-texts-container');
            if (!textsContainer) return;

            let maxHeight = 0;
            texts.forEach(text => {
                const height = text.offsetHeight;
                if (height > maxHeight) maxHeight = height;
            });

            if (maxHeight > 0) {
                textsContainer.style.minHeight = `${maxHeight}px`;
            }
        }, 50);
    }

    // Animación tipo Framer Motion de opacidad en palabras (simulada aquí con delay en span)
    function animateText(index) {
        texts.forEach((text, i) => {
            text.classList.remove('active', 'exit');
            if (i === index) {
                text.classList.add('active');

                // Efecto cascada en el titulo y descripcion
                const title = text.querySelector('.subtitle');
                if (title) {
                    title.style.animation = 'none';
                    title.offsetHeight; /* trigger reflow */
                    title.style.animation = 'fadeInUp 0.6s ease forwards';
                }

                const details = text.querySelector('.project-details');
                if (details) {
                    details.style.animation = 'none';
                    details.offsetHeight;
                    details.style.animation = 'fadeInUp 0.8s ease forwards 0.2s';
                }

                const tags = text.querySelectorAll('.tag');
                tags.forEach((tag, j) => {
                    tag.style.animation = 'none';
                    tag.offsetHeight;
                    tag.style.animation = `fadeInUp 0.5s ease forwards ${0.4 + (j * 0.05)}s`;
                });
            } else if (text.classList.contains('active')) {
                text.classList.add('exit');
            }
        });
    }

    function updateSlider() {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;

        images.forEach((img, i) => {
            const isLeft = (activeIndex - 1 + length) % length === i;
            const isRight = (activeIndex + 1) % length === i;
            const isActive = activeIndex === i;

            if (isActive) {
                img.style.zIndex = '3';
                img.style.opacity = '1';
                img.style.pointerEvents = 'auto';
                img.style.transform = `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`;
                img.classList.add('active-img');
            } else if (isLeft) {
                img.style.zIndex = '2';
                img.style.opacity = '1';
                img.style.pointerEvents = 'auto';
                img.style.transform = `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`;
                img.classList.remove('active-img');
            } else if (isRight) {
                img.style.zIndex = '2';
                img.style.opacity = '1';
                img.style.pointerEvents = 'auto';
                img.style.transform = `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`;
                img.classList.remove('active-img');
            } else {
                // Hide others
                img.style.zIndex = '1';
                img.style.opacity = '0';
                img.style.pointerEvents = 'none';
                img.style.transform = `translateX(0px) translateY(0px) scale(0.8) rotateY(0deg)`;
                img.classList.remove('active-img');
            }
        });

        animateText(activeIndex);
    }

    function next() {
        activeIndex = (activeIndex + 1) % length;
        updateSlider();
        resetAutoplay();
    }

    function prev() {
        activeIndex = (activeIndex - 1 + length) % length;
        updateSlider();
        resetAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(next, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', (e) => {
        // Only if section in view
        const rect = imageContainer.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }
    });

    // Init
    handleResize();
    startAutoplay();
});

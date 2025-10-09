(function(){    
    const sliders = [...document.querySelectorAll('.slider_body') ];
    
    const arrowNext = document.querySelector('#next');
    const arrowBefore = document.querySelector('#before');

    let value;

    // Verificar que tenemos sliders y flechas
    if (sliders.length === 0 || !arrowNext || !arrowBefore) {
        console.error('Slider: No se encontraron elementos necesarios');
        return;
    }

    console.log(`Slider: Se encontraron ${sliders.length} proyectos`);

    arrowNext.addEventListener('click', () => changePosition(1));
    arrowBefore.addEventListener('click', () => changePosition(-1));

    function changePosition(change){
        const currentElement = Number(document.querySelector('.slider_body--show').dataset.id);

        value = currentElement;
        value += change;

        if(value === 0 || value === sliders.length + 1){
            value = value === 0 ? sliders.length : 1;
        }

        // Remover clase de todos los sliders
        sliders.forEach(slider => slider.classList.remove('slider_body--show'));
        
        // Agregar clase al slider actual
        sliders[value-1].classList.add('slider_body--show');
        
        console.log(`Slider: Mostrando proyecto ${value} de ${sliders.length}`);
    }

    // Inicializar el slider mostrando el primer proyecto
    if (sliders.length > 0) {
        sliders.forEach(slider => slider.classList.remove('slider_body--show'));
        sliders[0].classList.add('slider_body--show');
        console.log('Slider: Inicializado correctamente');
    }
})();
// Carrusel simple - solo muestra/oculta proyectos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrusel simple...');
    
    const projects = document.querySelectorAll('.slider_body');
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#before');
    
    let currentIndex = 0;
    
    console.log(`Encontrados ${projects.length} proyectos`);
    
    function showProject(index) {
        // Ocultar todos
        projects.forEach(project => {
            project.classList.remove('slider_body--show');
        });
        
        // Mostrar el actual
        if (projects[index]) {
            projects[index].classList.add('slider_body--show');
            console.log(`Mostrando proyecto ${index + 1}: ${projects[index].querySelector('.subtitle').textContent}`);
        }
    }
    
    function nextProject() {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex);
    }
    
    function prevProject() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextProject);
    if (prevBtn) prevBtn.addEventListener('click', prevProject);
    
    // Mostrar el primer proyecto
    showProject(0);
    
    console.log('Carrusel inicializado correctamente');
});
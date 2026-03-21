// Carrusel simple - solo muestra/oculta proyectos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrusel simple...');
    
    const projects = Array.from(document.querySelectorAll('.slider_body'));
    const nextBtn = document.querySelector('#next');
    const prevBtn = document.querySelector('#before');
    const preferredOrder = ['5', '6', '4', '1', '7', '8'];
    
    // Reordena por data-id: EQM, Nexo 360, Yerbalito, luego e-commerce
    const orderedProjects = [
        ...preferredOrder
            .map(id => projects.find(project => project.dataset.id === id))
            .filter(Boolean),
        ...projects.filter(project => !preferredOrder.includes(project.dataset.id))
    ];
    
    let currentIndex = 0;
    
    console.log(`Encontrados ${orderedProjects.length} proyectos`);
    
    function showProject(index) {
        // Ocultar todos
        orderedProjects.forEach(project => {
            project.classList.remove('slider_body--show');
        });
        
        // Mostrar el actual
        if (orderedProjects[index]) {
            orderedProjects[index].classList.add('slider_body--show');
            console.log(`Mostrando proyecto ${index + 1}: ${orderedProjects[index].querySelector('.subtitle').textContent}`);
        }
    }
    
    function nextProject() {
        currentIndex = (currentIndex + 1) % orderedProjects.length;
        showProject(currentIndex);
    }
    
    function prevProject() {
        currentIndex = (currentIndex - 1 + orderedProjects.length) % orderedProjects.length;
        showProject(currentIndex);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextProject);
    if (prevBtn) prevBtn.addEventListener('click', prevProject);
    
    // Mostrar el primer proyecto
    showProject(0);
    
    console.log('Carrusel inicializado correctamente');
});
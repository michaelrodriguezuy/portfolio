'use strict'

const grande    = document.querySelector('.contenedor')
const punto     = document.querySelectorAll('.punto')


$(document).ready(function () {
    
    $('body').on({'mousemove'   : function (e) {

        console.clear();

        let clienteX = e.originalEvent.clientX;
        let clienteY = e.originalEvent.clientY;

        $('#cursor').css({
            'left'  : (clienteX-40) + 'px',
            'top'   : (clienteY-40) + 'px'
        });

    }})


    $('.a').on({
        'mouseover'   : function () {
            $('#cursor').addClass('mini');
        },
        'mouseout'   : function () {
            $('#cursor').removeClass('mini');
        },
    })


})

// Recorrer TODOS los punto
punto.forEach( ( cadaPunto , i )=> {
    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -25

        // MOVEMOS el grand
        grande.style.transform = `translateX(${ operacion }%)`

        // Recorremos TODOS los punto
        punto.forEach( ( cadaPunto , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            punto[i].classList.remove('activo')
        })
        // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo')

    })
})


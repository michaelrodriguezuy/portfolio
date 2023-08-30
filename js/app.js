'use strict'

// const grande    = document.querySelector('.contenedor')
// const punto     = document.querySelectorAll('.punto')


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

var counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 5){
        counter = 1;
    }
}, 5000);

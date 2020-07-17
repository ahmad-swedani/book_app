'use strict';
$('.btnSelect').click(function handleSelectClick(event){
    event.preventDefault();
    console.log('Hi');
    $('.bookDtlForm :input').css('display','inline');
    event.target.style.display = 'none';
    $('.btnSelect').css('display','none');
    $(".bookDtlForm :first-child").css('display','none');
});
var trans = 1
function myFunction(x) {
    x.classList.toggle("change");
    // $('#menu :first-child').toggle('display')
    // $('#menu :ul').css('display','block');
    if(trans == 1){
        trans = 2;
        $('.options').css('display','block');
        $('#menu').css('animation','in 0.1s forwards');
        // setTimeout($('#menu :first-child').css('display','none'), 0);
    }else{
        trans = 1;
        // setTimeout($('#menu :first-child').css('display','block'), 0);
        $('#menu').css('animation','out 3s forwards');
        $('.options').css('display','none');
        }
  }
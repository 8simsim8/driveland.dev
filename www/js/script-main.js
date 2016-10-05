;window.onload = function() {
    var DISTANCE_SMALL_HEADER = 200;

    var $header = $('header');

    $(window).on('load scroll', function (){
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(scrolled > DISTANCE_SMALL_HEADER) {
        $header.addClass('m-menu_small');
      } else {
        $header.removeClass('m-menu_small');
      }
    });


};
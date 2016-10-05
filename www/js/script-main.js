;window.onload = function() {
    var DISTANCE_SMALL_HEADER = 200;

// Disable scroll
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }
/*---------------------------------------------------------------------------------*/

    var $header = $('header');

    $(window).on('load scroll', function (){
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(scrolled > DISTANCE_SMALL_HEADER) {
        $header.addClass('m-menu_small');
      } else {
        $header.removeClass('m-menu_small');
      }
    });
 
    $(window).scroll(function () {
      $header.css("left", -$(this).scrollLeft() + "px");
    });

    $('.b-menu__wrapp-login').on('click', function(){
      disableScroll();
      $('.b-menu__wrapp-login-popup').addClass('m-open-popap');
    });
    $('.b-menu__wrapp-login-popup-window-close').on('click', function(){
      enableScroll()
      $('.b-menu__wrapp-login-popup').removeClass('m-open-popap');
    });

    $(document).on('click', function(){
      $('.m-open-dropdown').removeClass('m-open-dropdown');
    });

    $('.dropdown-block-current').on('click', function(){
      if($(this).hasClass('m-open-dropdown')) {
        $('.m-open-dropdown').removeClass('m-open-dropdown');
      } else {
        $('.m-open-dropdown').removeClass('m-open-dropdown');
        $(this).addClass('m-open-dropdown');
      }
      return false;
    });

    


};
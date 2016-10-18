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
/*--------------------------------------------------------------------------------*/

  var $header = $('header');

  // Уменшение меню по скролу
    $(window).on('load scroll', function (){
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(scrolled > DISTANCE_SMALL_HEADER) {
        $header.addClass('m-menu_small');
      } else {
        $header.removeClass('m-menu_small');
      }
    });

  // Проскроливание фиксорованного меню
    $(window).scroll(function () {
      $header.css("left", -$(this).scrollLeft() + "px");
    });

  // Отрытие формы входа
    $('.b-menu__wrapp-login').on('click', function(){
      $('.b-menu__wrapp-login-popup-close').trigger('click');
      $('.b-menu__wrapp-login-popup').addClass('m-open-popap');
      return false;
    });

  // Открытие попапа регистрации
    var registerInputs = $('.b-menu__wrapp-register-popup').find('.tab-input');
    $('.button-registration').on('click', function(){
      disableScroll(); // Блокирование скролла/пролистывания
      $('.b-menu__wrapp-login-popup').removeClass('m-open-popap');
      $('.b-menu__wrapp-register-popup').addClass('m-open-popap');
      workForm('register');
    });

  // Закрытие попапа
    $('.b-menu__wrapp-login-popup-close').on('click', function(){
      $('.m-open-popap').removeClass('m-open-popap');
      enableScroll(); // Разрешение скролла/пролистывания
      return false;
    });

  // Работа меню пользователя
  var userMenu = document.getElementsByClassName('b-menu__wrapp-login-nav')[0];

  $(document).on('click', function(e){
    var workPopap = false;
    var target = e.target;
    while(target !== null) {
      if(target == userMenu) {
        workPopap = true;
        $(userMenu).toggleClass('m-open-user-menu');
        break;
      }
      target = target.parentNode;
    }
    if(!workPopap) {
      $(userMenu).removeClass('m-open-user-menu');
    }
  });
  
  // Add/delete photo
  var blogNum = 1;

  $('#addPostText').on('click', function (e) {
    var name = 'txt' + blogNum;
    $('#postText').clone().removeAttr('id').show().appendTo('#postContent')
                  .find('textarea').attr('name', name);
    blogNum++;
  });

  $('#addPostPhoto').on('click', function (e) {
    var name = 'img' + blogNum;
    var div = $('#postPhoto').clone().removeAttr('id');
    var slim = div.find('.postPhotoSlim');
    
    div.show().appendTo('#postContent');    
    slim.find('input').attr('name', name);
    slim.slim();
    blogNum++;
  });

  // BAZAAR AND COMPANIES PHOTO GALLERY
    // Show first img
    if($('.galleryThumb').length > 0) {
      var photoSrc = $('.galleryThumb').eq(0).attr('src').replace('thumb', '');
      $('#galleryPhoto').attr('src', photoSrc);
    }
  
    $('.galleryThumb').on('click', function (e) {
        e.preventDefault();
        var photoSrc = $(this).attr('src').replace('thumb', '');
        $('#galleryPhoto').fadeOut(200, function() {
            $('#galleryPhoto').attr('src', photoSrc);
          }
        );
        $('#galleryPhoto').fadeIn(200);
    });

};
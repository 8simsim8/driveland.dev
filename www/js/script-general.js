;document.addEventListener("DOMContentLoaded", general);

function general() {

  var scroll = new MakeDisableScroll();
  var header = new makeHeader();            // Обьект "Меню"

  var messages = 10;
  header.checkNewNotification(messages);     // Метод отображения колличества сообщений

  var buttonToTop = new makeButtonToTop();  // Кнопка "вверх"

// **************** TEST *****************************************
// Создание навигации МЕНЮ
$.ajax('/test/data-menu.json', {
        type: 'GET',
        dataType: 'json',
        success: function(array) {
          
          var $container = $('.b-menu__wrapp-list');
          var strInsert = '';
          var sumElemOnPage = sumElemOnPage || array.length;
          for(var i = 0; i < sumElemOnPage; i++) {
            strInsert = '<li><a href="'+ array[i].linkMenu +'" title="'+ array[i].text +'" class="text bold">'+ array[i].text +'</a></li>';
          $container.append(strInsert);
          }

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
// *****************************************************************


// *** Меню ***
  function makeHeader(){
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

  // Пришли новые сообщения
    this.checkNewNotification = function (messages){
      if(messages > 0) {
        $('.b-menu__user-notification-messages').addClass('new-notification').html(messages);
      }
    }

  // Отрытие формы входа
    $('.b-menu__wrapp-login, .button-enter').on('click', function(){
        $('.b-menu__wrapp-popup').addClass('m-open-popap');
        $('.b-menu__wrapp-register-popup-window').removeClass('m-open-popap');
        scroll.disableScroll(); // Блокирование скролла/пролистывания
        $('.b-menu__wrapp-login-popup').addClass('m-open-popap');
      return false;
    });

  // Отрытие формы регистрации
    $('.button-registration').on('click', function(){
      $('.b-menu__wrapp-popup').addClass('m-open-popap');
      $('.b-menu__wrapp-login-popup').removeClass('m-open-popap');
      scroll.disableScroll(); // Блокирование скролла/пролистывания
      $('.b-menu__wrapp-register-popup-window').addClass('m-open-popap');
    });

  // Закрытие попапа
    $('.b-menu__wrapp-login-popup-close').on('click', function(){
      $('.m-open-popap').removeClass('m-open-popap');
      scroll.enableScroll(); // Разрешение скролла/пролистывания
      return false;
    });

  // Работа меню пользователя
    var userMenu = document.getElementsByClassName('b-menu__wrapp-login-wrapp')[0];
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
  }
// *** /Меню ***


// *** Disable scroll ***
  function MakeDisableScroll(){
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

    this.disableScroll = function () {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    this.enableScroll = function() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  }
// *** /Disable scroll ***

// *************************************
// Скрытие/открытие поиска на страницах:
// "Новости, "Компании"
  $('.b-filter__find').on('click', function(){
    $('.b-filter__find').addClass('open-search');
    $('.b-filter__find').find('[name=search]').focus();
    return false;
  });

  $('.b-filter__find').find('[name=search]').on('blur', function(){
    $('.b-filter__find').removeClass('open-search');
    return false;
  });
// ***************************************

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

    /*
      Переключатели 'Фильтров': 
      В результате клика на элементе фильтра - навешивается класс "m-filter__switch-item_active", 
      значение выбранного элемента в переменной "resultCaregory"
  */

    $('.b-filter__switch-item').on('click', function(){
      $(this).siblings().removeClass('m-filter__switch-item_active');
      $(this).addClass('m-filter__switch-item_active');
      var currentAttr;
      var resultCaregory;
      if($(this)[0].hasAttribute('data-filter-category')) {
        currentAttr = 'data-filter-category';
      }
      if($(this)[0].hasAttribute('data-filter-status')) {
        currentAttr = 'data-filter-status';
      }
      resultCaregory = $(this).attr(currentAttr); // Выбранный вариант

    });

  /*
    При загрузке страницы проверить на наличие классов "m-filter__switch-item_active" на фильтрах, указывающих на то, какая сортировка, соответственно, имеющиие его пропустить
  */

    $('.b-filter__switch').each(function(index,el){
      if(!$(el).find('.b-filter__switch-item').hasClass('m-filter__switch-item_active')) {
        $(el).find('.b-filter__switch-item').eq(0).trigger('click');
      }
    });
    
    

};
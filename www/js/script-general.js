;document.addEventListener("DOMContentLoaded", general);

function general() {

  var header = new makeHeader();             // Обьект "Меню"

  if(IS_FIREFOX) {
    $('body').addClass('firefox');
  }

  var messages = 10;
  header.checkNewNotification(messages);     // Метод отображения колличества сообщений

  var buttonToTop = new makeButtonToTop();   // Кнопка "вверх"

  // Открыть попап "написать"
    var messagePopup = document.getElementsByClassName('message-popup')[0];
    var buttonOpenMessagePopup = document.getElementsByName('open-message-popup');
    $(buttonOpenMessagePopup).on('click', function() {
      messagePopup.setAttribute('popup-message','open');
      disableScroll();
      return false;
    });
    $('.b-popup-message-close').on('click', function() {
      messagePopup.setAttribute('popup-message','close');
      enableScroll();
      return false;
    });

    // Клик по кнопке отправить сообщение
     $('input.submit-button').on('click', function(){
        $('.message-popup-wrapp').fadeOut('200', function(){
          $('.b-message-confirm').fadeIn('200');
        });
        return false;
      });

// **************** TEST *****************************************
// Создание навигации МЕНЮ
if( $('.b-menu__wrapp-list').children().length < 1) {
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
}
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
        disableScroll(); // Блокирование скролла/пролистывания
        $('.b-menu__wrapp-login-popup').addClass('m-open-popap');
      return false;
    });

  // Отрытие формы регистрации
    $('.button-registration').on('click', function(){
      $('.b-menu__wrapp-popup').addClass('m-open-popap');
      $('.b-menu__wrapp-login-popup').removeClass('m-open-popap');
      disableScroll(); // Блокирование скролла/пролистывания
      $('.b-menu__wrapp-register-popup-window').addClass('m-open-popap');
    });

  // Закрытие попапа
    $('.b-menu__wrapp-login-popup-close').on('click', function(){
      $('.m-open-popap').removeClass('m-open-popap');
      enableScroll(); // Разрешение скролла/пролистывания
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

// *************************************
// Скрытие/открытие поиска на страницах:
// "Новости, "Компании"
  $('.b-filter__find').on('click', function(){
    $('.b-filter__find').addClass('open-search');
    $('.b-filter__find').find('[name=search]').focus();
    return false;
  });

  $(document).on('click', function(){
    $('.b-filter__find').removeClass('open-search');
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
      $('.galleryThumb').css({
        'opacity': 0.5
      });
      $('.galleryThumb').eq(0).addClass('select-photo');
      $('.b-one-ad__img-block').addClass('after-load');
    }
  
    $('.galleryThumb').on('click', function (e) {
        e.preventDefault();
        var photoSrc = $(this).attr('src').replace('thumb', '');
        $('.select-photo').removeClass('select-photo');
        $(this).addClass('select-photo');
        $('#galleryPhoto').fadeOut(200, function() {
            $('#galleryPhoto').attr('src', photoSrc);
          }
        );
        $('#galleryPhoto').fadeIn(200);
    });

// Добавить подсказку на фильры
  $('.b-filter__switch').each(function(i,filter){
    $(filter).find('.b-filter__switch-item').each(function(index,element){
        $(element).attr('title',$(element).html());
    });
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
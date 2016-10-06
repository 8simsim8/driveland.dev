  // Открытие выпадающего списка с датой в блоке
    $('.dropdown-block-current').on('click', function(){
      if($(this).hasClass('m-open-dropdown')) {
        $('.m-open-dropdown').removeClass('m-open-dropdown');
      } else {
        $('.m-open-dropdown').removeClass('m-open-dropdown');
        $(this).addClass('m-open-dropdown');
      }
      return false;
    });

  // По клику в любой зоне окна закрыть выпадающий список
    $(document).on('click', function(){
      $('.m-open-dropdown').removeClass('m-open-dropdown');
    });

  // Сокращение текста с блоке с новостями
    $(".b-news__inner-item").dotdotdot({
      ellipsis  : '... '
    });
// *** COMMON ***
  var DISTANCE_SMALL_HEADER = 200;
  var DISTANCE_SHOW_BUTTON_TOP = 500;
  var WIDTH_WINDOW_TABLET = 768;

  // Появление кнопки редактирования
  function MakeRedact() {

    var heightWindow        = window.innerHeight;
    var widthWindow         = window.innerWidth;

    if(widthWindow > WIDTH_WINDOW_TABLET) {
      $('.redact-block').on('mouseover', function(event) {
        var $this = $(this);
        $this.children().filter('.block-redactor').addClass('m-block-redactor_show');
      });

      $('.redact-block').on('mouseout', function(event) {
        $('.block-redactor').removeClass('m-block-redactor_show');
      });
    } else {
      $('.block-redactor').addClass('m-block-redactor_show');
    }

    $(window).on('load resize', function(){

      heightWindow          = window.innerHeight;
      widthWindow           = window.innerWidth;

      if(widthWindow < WIDTH_WINDOW_TABLET) { 
        $('.block-redactor').addClass('m-block-redactor_show');
      } else {
        $('.block-redactor').removeClass('m-block-redactor_show');
      }

    });

  }

  // Кнопка "ВВЕРХ"
  function makeButtonToTop() {

    var block               = document.getElementsByTagName('main')[0];
    var buttonTop           = document.createElement('div');

    buttonTop.classList.add('button-to-top');
    buttonTop.classList.add('text');
    buttonTop.innerHTML = 'TOP';
    block.appendChild(buttonTop);

    if(window.pageYOffset >= DISTANCE_SHOW_BUTTON_TOP) {
      $(buttonTop).addClass('show-button');
    }

    $(window).on('scroll', function(){
      var scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
      if(scrollWindow >= DISTANCE_SHOW_BUTTON_TOP) {
        $(buttonTop).addClass('show-button');
      } else {
        $(buttonTop).removeClass('show-button');
      }
    });

    $(buttonTop).on('click', function(){
      $("html, body").animate({
        scrollTop: 0
      }, 200);
    });

  }

  // Вывод рейтинга
  function MakeRating(ratingBlock, positive, all) {

    $(ratingBlock).each(function(index, el){
      var $currentElem = $(el).find('.wrap-rating');
      var $star = $currentElem.find('.rating-stars').children('span');

    // Колличество звездочек
      var sumStars = $star.length;

      var resData = Math.floor((positive[index] * sumStars)/all[index]);

      for(i = 0; i < resData; i++) {
        $star.eq(i).attr('data-active', '');
      }
      $currentElem.find('.print-rating').html(all[index]);
    });

  }

  // Убирать лишние теги

    function cropTag($tags) {
      $(window).on('load resize', function(){
        cropFunctionTag($tags);
      });
    }

  function cropFunctionTag($tags) {
    $tags.each(function(index, el){

      if($tags[index].offsetWidth < $tags[index].scrollWidth) {
        $tags.eq(index).children().last().remove();

        var dottedStr = '<span class="text subtext tag">...</span>';
        $tags.eq(index).append(dottedStr);

        while($tags[index].offsetWidth < $tags[index].scrollWidth) {
          $tags.eq(index).children().last().remove();
          $tags.eq(index).children().last().remove();
          $tags.eq(index).append(dottedStr);
        }
      }
    });
  }


  function MakeAsideBar(aside) {

    var buttonOpenMyCar     = document.getElementById('button-author-auto');
    var blockAuthorCar      = document.getElementsByClassName('b-author__car')[0];

    $(buttonOpenMyCar).on('click', clickOnButtonMyCar);

    function clickOnButtonMyCar(e) {
      $(blockAuthorCar).addClass('open-block');
      return false;
    }
  }

  // // Основные измерения
  // function MakeCalc() {

  //   this.heightWindow        = window.innerHeight;
  //   this.widthWindow         = window.innerWidth;

  //   $(window).on('load resize', function(){
  //     this.heightWindow        = window.innerHeight;
  //     this.widthWindow         = window.innerWidth;
  //   });

  // }

  // Плавающее боковое окно
  function floatSideBar($container) {
    
    var $footer = $('.l-footer');
    var heightBar           = $container[0].offsetHeight;
    var heightWindow        = window.innerHeight;
    var heightFooter        = $footer[0].offsetHeight;

    $(window).on('load resize', function(){
      heightBar             = $container.height();
      heightFooter          = $footer[0].offsetHeight;
      heightWindow          = window.innerHeight;
    });

    if((heightWindow - heightFooter) < heightBar) {
      floatBigBar($container);
    } else {
      floatSmallBar($container);
    }
  }
  
  function floatBigBar($container) {
    var $perentNode         = $container.parent();
    var widthBar            = $perentNode[0].offsetWidth - 20;
    var heightBar           = $container[0].offsetHeight;
    var distanseScrollBar   = $container.offset().top;
    var distanseLeftBar     = $perentNode.offset().left;

    var $footer             = $('.l-footer');
    var heightFooter        = $footer[0].offsetHeight;
    var heightWindow        = window.innerHeight;
    var widthWindow         = window.innerWidth;

    var isFixedBar = false;
    var isEnableFloat;

    isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

    $(window).on('load resize', function(){
      heightBar             = $container.height();
      widthBar              = $perentNode[0].offsetWidth - 20;
      heightFooter          = $footer[0].offsetHeight;
      heightWindow          = window.innerHeight;
      widthWindow           = window.innerWidth;
      distanseLeftBar       = $perentNode.offset().left;

      isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

      if(isFixedBar && isEnableFloat) {
        $container.css({
          'width': widthBar + 'px',
          'left': distanseLeftBar + 10 + "px"
        });
      }
    });

    var prevScroll = 0;

    $(window).on('scroll', function(){

      var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
      var directScroll = (distanseScroll - prevScroll) > 0 ? 'down' : 'up';
      prevScroll = distanseScroll;

      var distanseBottom = heightWindow - $container[0].getBoundingClientRect().bottom;

      var offsetTopBar = (heightBar > heightWindow) ? (distanseScrollBar - $container[0].offsetTop) : (heightFooter - 40);

      if(isFixedBar && isEnableFloat) {
        $container.css("left", distanseLeftBar + 10 - $(this).scrollLeft() + "px");
      }

      if(directScroll == 'down' && isEnableFloat) {
        if(distanseBottom >= (heightFooter + 20)){
          isFixedBar = true;
          $container.css({
            'width': widthBar + 'px',
            'bottom': heightFooter + 20 + 'px',
            "left": distanseLeftBar + 10 - $(this).scrollLeft() + "px",
            'position': 'fixed',
            'z-index': '2'
          });
        }
      }

      if(directScroll == 'up' && isEnableFloat) {
        if(distanseScroll <= offsetTopBar) {
          isFixedBar = false;
          $container.css({
            'width': '',
            'bottom': '',
            'left': '',
            'position': '',
            'z-index': ''
          });
        }
      }

    });
  }


  // Small bar
  function floatSmallBar($container) {

    var $parentNode       = $container.parent();
    
    var distanseScrollBar = $parentNode.offset().top;
    var distanseLeftBar   = $parentNode.offset().left;
    var heightWindow      = window.innerHeight;
    var widthWindow       = window.innerWidth;

    var heightBar         = $container[0].offsetHeight;
    var widthBar          = $parentNode[0].offsetWidth - 20;
    
    var positionFixedBar  = Math.floor((heightWindow - heightBar)/2);
    var halfHeightBar     = Math.floor(heightBar/2);

    var isFixedBar = false;
    var isEnableFloat;

    isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

    $(window).on('load resize', function(){
      heightWindow        = window.innerHeight;
      widthWindow         = window.innerWidth;
      heightBar           = $container[0].offsetHeight;
      widthBar            = $parentNode[0].offsetWidth - 20;
      distanseScrollBar   = $container.offset().top;
      positionFixedBar    = Math.floor((heightWindow - heightBar)/2);
      halfHeightBar       = Math.floor(heightBar/2);
      distanseLeftBar     = $parentNode.offset().left;

      isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

      if(isFixedBar && isEnableFloat) {
        $container.css({
          'left': distanseLeftBar + 10 + "px",
          'width': widthBar + 'px'
        });
      }
    });

    $(window).on('scroll', function(){
      if(isFixedBar && isEnableFloat) {
        $container.css("left", distanseLeftBar - $(this).scrollLeft() + "px");
      }
      var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
      if(distanseScroll >= (distanseScrollBar - positionFixedBar) && isEnableFloat) {
        isFixedBar = true;
        $container.css({
          'position':'fixed',
          'top': '50%',
          'width': widthBar + 'px',
          "left": distanseLeftBar + 10 - $(this).scrollLeft() + "px",
          'margin-top': -halfHeightBar + 'px'
        });
      } else {
        isFixedBar = false;
        $container.css({
          'position':'',
          'top': '',
          'width': '',
          'left': '',
          'margin-top': ''
        });
      }
    });

  }
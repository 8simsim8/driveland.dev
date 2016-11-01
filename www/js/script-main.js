(function () {

  // ******************** TEST ***********************
    // Основной контент (левая панель)
      var liderAuto;
      var liderPreviousAuto;
      var popularAuto;
      var liderGeiningAuto;
      var newAuto;
    // ---------------- Получить массив ----------------
      $.ajax('/test/data-pager.json', {
        type: 'GET',
        dataType: 'json',
        success: function(res) {

      // Передается (обьект профиля, индекс необходимого авто)
          liderAuto = new makeLiderAuto(res[3], 0); // "Лидер"
      // Передаются соответствующие массивы и колличество элементов, которое выводится в блок
          newAuto = new makeNewAuto(res, 12); // "Новые авто"
          popularAuto = new makePopularAuto(res, 12); // "Популярные авто"
          liderGainingAuto = new makeLiderGainingAuto(res, 4); // "Набирающие популярность"
          liderPreviousAuto = new makeLiderPreviousAuto(res, 3); // "Предыдущие победители"
        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });

    // "Лидер голосования"
    function makeLiderAuto(objLiderAuto, indexAuto) {
      var $container = $('.b-content__lider-article');
      $('.b-content__lider-article-img').attr('src', objLiderAuto.auto[indexAuto].linkAutoPhoto);
      $('.b-content__lider-article-vote span').html(objLiderAuto.auto[indexAuto].voteAuto);
      $container.children('h4').html(objLiderAuto.auto[indexAuto].headerAuto);

      $container.find('.b-content__lider-article-author-photo').attr('src', objLiderAuto.linkAvatar);
      $container.find('.b-content__lider-article-author-name').html(objLiderAuto.name);
      $container.find('.b-content__lider-article-author-city').html(objLiderAuto.city);
      $container.find('.b-content__lider-article-text').html(objLiderAuto.auto[indexAuto].noteAuto);
      $container.find('.b-content__lider-article-read').attr('href', objLiderAuto.auto[indexAuto].linkAuto);
    }

    // "Предыдущие победители"
    function makeLiderPreviousAuto(array, sumElemOnPage) {
      var $container = $('.b-content__lider-previous .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__lider-previous-item item"><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></a>';
        $container.append(strInsert);
      }
    }

    // "Набирают популярность"
    function makeLiderGainingAuto(array, sumElemOnPage) {
      var $container = $('.b-content__lider-gaining .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__lider-gaining-item item"><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></a>';
        $container.append(strInsert);
      }
    }

    // "Популярные авто"
    function makePopularAuto(array, sumElemOnPage) {
      var $container = $('.b-content__popular .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__popular-item item"><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></a>';
        $container.append(strInsert);
      }
    }

    // "Новые авто"
    function makeNewAuto(array, sumElemOnPage) {
      var $container = $('.b-new-auto__inner .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].linkProfile + '" title="'+ array[i].name +'" class="b-new-auto__item item text"><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].linkAuto +'"><p class="b-new-auto__item-name">'+ array[i].name +'</p><p class="b-new-auto__item-auto">'+ array[i].auto[0].autoName +'</p></a>';
        $container.append(strInsert);
      }
    }

    // Правая панель

// Перменная обьекта "панели моделей"
var logoBar;

    // ---------------- Получить массив ----------------
      $.ajax('/test/data-mark.json', {
        type: 'GET',
        dataType: 'json',
        success: function(res) {

      // Передается (массив марок авто)
          renderLogoBar(res);
          function renderLogoBar(array,sumElemOnPage) {
            var $logoBar = $('.b-mark');
            var strInsert = '';
            var sumElemOnPage = sumElemOnPage || array.length;
            var isRetinaDisplay;
            var linkImg;
            if (window.devicePixelRatio > 1) {
              isRetinaDisplay = true;
            } else {
              isRetinaDisplay = false;
            }
            for(var i = 0; i < sumElemOnPage; i++) {
              linkImg = isRetinaDisplay ? array[i].linkMarkLogo2x : array[i].linkMarkLogo1x;
              var nameAutoParser = array[i].nameMark.toLowerCase();
              strInsert = '<li><a href="' + array[i].linkMark + '" title="'+ array[i].nameMark +'" class="b-mark__list-item" style="background-image: url('+ linkImg +');"></a>';
              $logoBar.find('ul').append(strInsert);
             }
          }

// Создаем обьект "панели моделей"
logoBar          = new makeLogoBar(res); // Обьект "Марки авто"


        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // **************** /TEST ***********************

// Создаем обьект "панели новостей"
$(window).on('load', function(){
  var newsBar = new makeNewsBar(); // Обьект "Новости"
});

// ******** "Конструктор блока новостей" ***********
  function makeNewsBar(array) {
    var $newsBar          = $('.b-news');
    floatSideBar($newsBar);

    // Обрезка текста до 3 строчек
    $(".b-news__inner-item a").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
  }

// ******** "Конструктор блока логотипов" ***********
  function makeLogoBar(array,sumElemOnPage) {

    var $logoBar          = $('.b-mark');
    var $parentNode       = $('.b-mark').parent();
    
    var distanseScrollBar = $parentNode.offset().top;
    var distanseLeftBar   = $parentNode.offset().left;
    var heightWindow      = window.innerHeight;
    var widthWindow       = window.innerWidth;

    var heightBar         = $logoBar[0].offsetHeight;
    var widthBar          = $parentNode[0].offsetWidth - 20;
    
    var positionFixedBar  = Math.floor((heightWindow - heightBar)/2);
    var halfHeightBar     = Math.floor(heightBar/2);

    var isFixedBar = false;
    var isEnableFloat;

    isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

    $(window).on('load resize', function(){
      heightWindow        = window.innerHeight;
      widthWindow         = window.innerWidth;
      heightBar           = $logoBar[0].offsetHeight;
      widthBar            = $parentNode[0].offsetWidth - 20;
      distanseScrollBar   = $logoBar.offset().top;
      positionFixedBar    = Math.floor((heightWindow - heightBar)/2);
      halfHeightBar       = Math.floor(heightBar/2);
      distanseLeftBar     = $parentNode.offset().left;

      isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

      if(isFixedBar && isEnableFloat) {
        $logoBar.css({
          'left': distanseLeftBar + 10 + "px",
          'width': widthBar + 'px'
        });
      }
    });

    $(window).on('scroll', function(){
      if(isFixedBar&& isEnableFloat) {
        $logoBar.css("left", distanseLeftBar - $(this).scrollLeft() + "px");
      }
      var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
      if(distanseScroll >= (distanseScrollBar - positionFixedBar) && isEnableFloat) {
        isFixedBar = true;
        $logoBar.css({
          'position':'fixed',
          'top': '50%',
          'width': widthBar + 'px',
          "left": distanseLeftBar + 10 - $(this).scrollLeft() + "px",
          'margin-top': -halfHeightBar + 'px'
        });
      } else {
        isFixedBar = false;
        $logoBar.css({
          'position':'',
          'top': '',
          'width': '',
          'left': '',
          'margin-top': ''
        });
      }
    });

  }

// Плавающее боковое окно
function floatSideBar($container) {
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

})();
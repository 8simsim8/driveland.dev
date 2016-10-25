$(window).load(function(){

// Основной контент (левая панель)
// ******************** TEST ***********************
  var liderAuto;
  var liderPreviousAuto;
  var popularAuto;
  var liderGeiningAuto;
  var newAuto;
//***************** Получить массив ****************
  $.ajax('/test/data-pager.json', {
    type: 'GET',
    dataType: 'json',
    success: function(res) {

  // Передается (обьект профиля, индекс необходимого авто)
      liderAuto             = new makeLiderAuto(res[3], 0); // "Лидер"

  // Передаются соответствующие массивы и колличество элементов, которое выводится в блок
      newAuto               = new makeNewAuto(res, 12); // "Новые авто"
      popularAuto           = new makePopularAuto(res, 12); // "Популярные авто"
      liderGainingAuto      = new makeLiderGainingAuto(res, 4); // "Набирающие популярность"
      liderPreviousAuto     = new makeLiderPreviousAuto(res, 3); // "Предыдущие победители"
    },
    error: function(req,status,err) {
      console.log("Error " + req,status,err);
    }
  });
// ****************************************************

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
// ******************** TEST ***********************
var logoBar;
//***************** Получить массив ****************
  $.ajax('/test/data-mark.json', {
    type: 'GET',
    dataType: 'json',
    success: function(res) {

  // Передается (массив марок авто)
      logoBar               = new makeLogoBar(res); // "Марки авто"

    },
    error: function(req,status,err) {
      console.log("Error " + req,status,err);
    }
  });
// ****************************************************

var newsBar = new makeNewsBar(); // Масив новостей

// "Блок новостей"
function makeNewsBar(array) {
  var $newsBar = $('.b-news');
  floatSideBar($newsBar);
}

// "Блок логотипов"
function makeLogoBar(array,sumElemOnPage) {
  var $logoBar = $('.b-mark');

  var strInsert = '';
  var sumElemOnPage = sumElemOnPage || array.length;
  for(var i = 0; i < sumElemOnPage; i++) {
    var nameAutoParser = array[i].nameMark.toLowerCase();
    strInsert = '<li><a href="' + array[i].linkMark + '" title="'+ array[i].nameMark +'" class="b-mark__list-item m-mark__list-item_' + nameAutoParser + '"></a>';
    $logoBar.find('ul').append(strInsert);
  }

  var distanseScrollBar = $('.l-mark').offset().top;
  var heightHeader =  $('.l-menu')[0].offsetHeight;
  var heightWindow = window.innerHeight;
  var heightBar = $logoBar[0].offsetHeight;
  console.log(heightBar);
  $(window).on('scroll', function(){
    var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(distanseScroll >= 160) {
      $logoBar.css({
        'position':'fixed',
        'top': '50%',
        'margin-top': '-256px'
      });
    } else {
      
      $logoBar.css({
        'position':'',
        'top': '',
        'margin-top': ''
      });

    }
  });

}

// Плавающее боковое окно
function floatSideBar($container) {
  var widthBar = $container[0].offsetWidth;
  var heightBar = $container[0].offsetHeight;
  var distanseScrollBar = $container.offset().top;

  var $footer = $('.l-footer');
  var $header = $('.l-menu');
  var heightFooter = $footer[0].offsetHeight;
  var heightHeader = $header[0].offsetHeight;
  var heightWindow = window.innerHeight;

  $(window).on('load resize', function(){
    heightWindow = window.innerHeight;
    heightBar = $container.height();
    scrollToBottomNewsBar = $container.offset().top + heightBar;
    widthBar = $container[0].offsetWidth;
    heightFooter = $footer[0].offsetHeight;
    heightHeader = $header[0].offsetHeight;
  });

  var prevScroll = 0;
  $(window).on('scroll', function(){
    
    heightHeader = $header[0].offsetHeight;
    var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
    var directScroll = (distanseScroll - prevScroll) > 0 ? 'down' : 'up';
    prevScroll = distanseScroll

    var distanseBottom = heightWindow - $container[0].getBoundingClientRect().bottom;
    
    var distanseTop = $container.parent()[0].getBoundingClientRect().top;
    var res = (heightBar > heightWindow) ? (distanseScrollBar + heightBar - heightWindow - heightFooter + 80) : (heightFooter - 40);

    if(directScroll == 'down') {
      if(distanseBottom >= (heightFooter + 20)){
        $container.css({
          'width': widthBar + 'px',
          'bottom': heightFooter + 20 + 'px',
          'position': 'fixed',
          'z-index': '2'
        });
      }
    }

    if(directScroll == 'up') {
      if(distanseScroll <= res) {
        $container.css({
          'width': '',
          'bottom': '',
          'position': '',
          'z-index': ''
        });
      }
    }

  });
}


// Сокращение текста с блоке с новостями
  $(".b-news__inner-item a").each(function(index, el){
    $clamp(el, {clamp: 3});
  });

});
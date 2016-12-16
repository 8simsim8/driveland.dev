;document.addEventListener("DOMContentLoaded", main);

function main() {

  // Создаем обьект "панели новостей"
  var newsBar      = new makeNewsBar();

  // Создаем обьект "панели марки"
  var logoBar;

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

    // "Предыдущие победители"
    function makeLiderPreviousAuto(array, sumElemOnPage) {
      var $container = $('.b-content__lider-previous .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__lider-previous-item item"><figure><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></figure></a>';
        $container.append(strInsert);
      }
    }

    // "Набирают популярность"
    function makeLiderGainingAuto(array, sumElemOnPage) {
      var $container = $('.b-content__lider-gaining .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__lider-gaining-item item"><figure><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></figure></a>';
        $container.append(strInsert);
      }
    }

    // "Популярные авто"
    function makePopularAuto(array, sumElemOnPage) {
      var $container = $('.b-content__popular .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].auto[0].linkAuto + '" title="'+ array[i].name +'" class="b-content__popular-item item"><figure><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].autoName +'"></figure></a>';
        $container.append(strInsert);
      }
    }

    // "Новые авто"
    function makeNewAuto(array, sumElemOnPage) {
      var $container = $('.b-new-auto__inner .pagin-container');
      var strInsert = '';
      var sumElemOnPage = sumElemOnPage || array.length;
      for(var i = 0; i < sumElemOnPage; i++) {
        strInsert = '<a href="' + array[i].linkProfile + '" title="'+ array[i].name +'" class="b-new-auto__item item text"><figure><img src="'+ array[i].auto[0].linkAutoPhoto +'" alt="'+ array[i].auto[0].linkAuto +'"></figure><p class="b-new-auto__item-name">'+ array[i].name +'</p><p class="b-new-auto__item-auto">'+ array[i].auto[0].autoName +'</p></a>';
        $container.append(strInsert);
      }
    }

    // ---------------- Получить массив ----------------
      $.ajax('/test/data-mark.json', {
        type: 'GET',
        dataType: 'json',
        success: function(res) {

      // Заполнение блока
          renderLogoBar(res);

logoBar          = new makeLogoBar($('.b-mark'));

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

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // **************** /TEST ***********************


// ******** "Конструктор блока новостей" ***********
  function makeNewsBar() {
    var $newsBar          = $('.b-news');
    floatSideBar($newsBar);  // Плавающий блок

    if(!IS_FIREFOX) {
      // Обрезка текста до 3 строчек
      $(".b-news__inner-item a[data-clamp]").each(function(index, el){
        $clamp(el, {clamp: 3});
      });
    }
  }

// ******** "Конструктор блока логотипов" ***********
  function makeLogoBar($container) {

    floatSideBar($container);  // Плавающий блок

  }

}
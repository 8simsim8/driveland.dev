  // Пейджер
    var sumElemPager = 5;
    var sumElemOnPage = 30; // Элементов на странице
    var sumElemnts = 151; // СУММАРНОЕ КОЛЛИЧЕСТВО ЭЛЕМЕНТОВ

    var $wrappPagin = $('.paginator');
    var $containerPagin = $('.paginator').children().filter('.container');
    var $controllPagin = $('.paginator').children().filter('.controll');
    console.log($containerPagin);

    var currentItems = 1;

    var lengthObjData = objData.length;
    var resArr = [];
    for (var i = 0; i < sumElemnts/lengthObjData; i++) {
      objData.forEach(function(el, index) {
         resArr.push(el);
      });
    }

    var sumPages = Math.ceil(sumElemnts/sumElemOnPage);

    // Отрисовка страницы
    for(var i = currentItems; i < sumElemOnPage; i++) {
      var strInsert = '<a href="#" title="" class="b-new-auto__item"><img src="'+ resArr[i].link +'" alt=""><p class="b-new-auto__item-name">'+ resArr[i].name +'</p><p class="b-new-auto__item-auto">'+ resArr[i].note +'</p></a>';
      $containerPagin.append(strInsert);
    }

    rendCurrentElem(currentItems);

    // отрисовка кнопок пагинации
    function rendCurrentElem(index) {
      var strApp = '';

      // Создание пагинатора
      $controllPagin.append('<span class="b-new-auto__pagination-item text m-new-auto__pagination_prev m-new-auto__pagination_hide"><<</span>');

      for(var i = index; i <= sumPages; i++) {
        if(i >= sumElemPager) {
          $controllPagin.append('<span class="b-new-auto__pagination-item m-new-auto__pagination_dots text"> ... </span>');
          break;
        }
        if(i == index) {
          strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_current">' + i + '</span>';
        } else {
          strApp = '<span class="b-new-auto__pagination-item text">' + i + '</span>';
        }
        $controllPagin.append(strApp);
      }

      $controllPagin.append('<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_next">>></span>');
      
    }





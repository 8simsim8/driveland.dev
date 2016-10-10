  // Пейджер
    var numberElementPaginator = 10; // Кнопок на странице
    var middleNumberElementPaginator = Math.ceil(numberElementPaginator/2); // Средина пагинатора
    var sumElemOnPage = 30; // Элементов на странице
    var sumElemnts = 751; // СУММАРНОЕ КОЛЛИЧЕСТВО ЭЛЕМЕНТОВ

    var $wrappPagin = $('.paginator');
    var $containerPagin = $('.paginator').children().filter('.container');
    var $controllPagin = $('.paginator').children().filter('.controll');

    var numberButton = $controllPagin.children().filter('.m-new-auto__pagination_number');
    var moveButtonNext = document.getElementsByClassName('m-new-auto__pagination-item_next')[0];
    var moveButtonPrev = document.getElementsByClassName('.m-new-auto__pagination-item_prev')[0];

    var currentItems = 1;
    var firstElementPaginatorRender = currentItems;

    var lengthObjData = objData.length;
    var resArr = [];
    for (var i = 0; i < sumElemnts/lengthObjData; i++) {
      objData.forEach(function(el, index) {
         resArr.push(el);
      });
    }

    var sumPages = Math.ceil(sumElemnts/sumElemOnPage);

    renderPage(resArr);
    renderPagin(firstElementPaginatorRender,(currentItems-1));
    
    $controllPagin[0].addEventListener('click', clickOnPaginControll);

    $controllPagin[0].addEventListener('click', clickOnPaginNumber);

    // Клик на цифровой кнопке
    function clickOnPaginNumber(event) {
      var target = event.target;
      if(target == numberButton) {
        currentItems = + $(target).html();
        renderFirstElement(currentItems);
      }

    }

    function clickOnPaginControll(event) {
      var target = event.target;
      if(target != numberButton) {
        console.log(event);
        return; 
      }
        if($(target).hasClass('m-new-auto__pagination-item_next')) {
          firstElementPaginatorRender = firstElementPaginatorRender + numberElementPaginator-1;
        }
        if($(target).hasClass('m-new-auto__pagination-item_prev')) {
          firstElementPaginatorRender = firstElementPaginatorRender - numberElementPaginator + 1;
        }
        currentItems = 0;
        console.log(currentItems);
        renderPagin(firstElementPaginatorRender, currentItems);
    }

    function renderFirstElement(current) {
      if(current == (firstElementPaginatorRender + numberElementPaginator-1)) {
        firstElementPaginatorRender = current;
      }
      console.log(firstElementPaginatorRender, current);
      renderPagin(firstElementPaginatorRender, (current-firstElementPaginatorRender));
    }

    function renderPage(array) {
      // Отрисовка страницы
      var strInsert = '';
      for(var i = currentItems; i <= sumElemOnPage; i++) {
        strInsert = '<a href="#" title="" class="b-new-auto__item"><img src="'+ array[i].link +'" alt=""><p class="b-new-auto__item-name">'+ array[i].name +'</p><p class="b-new-auto__item-auto">'+ array[i].note +'</p></a>';
        $containerPagin.append(strInsert);
      }
    }

    // отрисовка кнопок пагинации
    function renderPagin(firstNumber, currentElementPagin) {
      var strApp = '';

      var lastNumber = firstNumber < (sumPages - numberElementPaginator) ? (firstNumber + numberElementPaginator - 1) : sumPages;

      $controllPagin.children().remove();
      // <<
      strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_prev"><<</span>'
      if(firstNumber == 1) {
        strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_prev m-new-auto__pagination_hide"><<</span>';
      }
       $controllPagin.append(strApp);
      // Элементы пагинатора
      for(var i = firstNumber; i <= lastNumber; i++) {
        strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination_number">' + i + '</span>';
        $controllPagin.append(strApp);
      }
      // >>
      strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_next">>></span>'
      if((sumPages - firstNumber) < numberElementPaginator) {
        strApp = '<span class="b-new-auto__pagination-item text m-new-auto__pagination-item_next m-new-auto__pagination_hide">>></span>';
      }
      $controllPagin.append(strApp);

      $('.m-new-auto__pagination_number').eq(currentElementPagin).addClass('m-new-auto__pagination-item_current');

  }





;document.addEventListener("DOMContentLoaded", community);

function community() {

  // workForm('filter');
  
  $('#city').dropList({
    search:               true,
    text:                 'Город'
  });

  $('#mark').dropList({
    search:               true,
    text:                 'Марка'
  });

  $('#model').dropList({
    search:               true,
    text:                 'Модель'
  });

  var $asideFloatBar = $('.b-filter-wrapp');
  floatSideBar($asideFloatBar);  // Плавающий блок

  $('#category a').on('click', function(){
    var strSelect = $(this).html();
    var $title = $('.title-search h1');
    if(strSelect == "Все") {
      $title.html("Сообщества");
    } else {
      $title.html(strSelect);
    }
    return false;
  });

  // ******************** TEST ***********************
  
    var sumElemOnPage = 18;
    // ---------------- Получить массив ----------------
      $.ajax('/test/data-pager.json', {
        type: 'GET',
        dataType: 'json',
        success: function(array) {
          var $container = $('.pagin-container');
          var strInsert = '';
          sumElemOnPage = sumElemOnPage || array.length;
          for(var i = 0; i < sumElemOnPage; i++) {
            strInsert = '<div class="b-community__item item"><figure><img src="' + array[i].auto[0].linkAutoPhoto + '" alt="' + array[i].auto[0].autoName + '"><p class="b-community__item-name text"><a href="' +array[i].linkProfile + '" class="text" data-clamp>' + array[i].name + '</a></p></figure><div class="b-community__item-info text"><div class="b-community__item-avatar"><img src="' + array[i].linkAvatar + '" alt=""></div><p class="b-community__item-auto"><a href="' + array[i].linkProfile + '" class="text">' + array[i].auto[0].autoName + '</a></p><p class="b-community__item-city text subtext"><a href="#" class="text subtext">' + array[i].city + '</a></p></div></div>';
            $container.append(strInsert);
              if(!IS_FIREFOX) {
              // Обрезка текста до 1 строчrb
                $(".b-community__item-name a[data-clamp]").each(function(index, el){
                  $clamp(el, {clamp: 1});
                });
              }
          }

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // ******************** /TEST ***********************

};
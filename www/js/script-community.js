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

  var $asideFloatBar = $('.b-filter');
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
            strInsert = '<div class="b-community__item item"><figure><img src="' + array[i].auto[0].linkAutoPhoto + '" alt="' + array[i].auto[0].autoName + '"></figure><div class="b-community__item-info text"><div class="b-community__item-avatar"><img src="' + array[i].linkAvatar + '" alt=""></div><p><a href="' + array[i].linkProfile + '" class="b-community__item-auto">' + array[i].auto[0].autoName + '</a></p><p class="b-community__item-author"><a href="my-page.html" class="text">' + array[i].name + '</a><a href="#" class="text subtext">' + array[i].city + '</a></p></div></div>';
            $container.append(strInsert);
          }

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // ******************** /TEST ***********************

};
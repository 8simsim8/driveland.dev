;document.addEventListener("DOMContentLoaded", community);

function community() {

  workForm('filter');


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
            strInsert = '<div class="b-community__item item"><img src="' + array[i].auto[0].linkAutoPhoto + '" alt="' + array[i].auto[0].autoName + '"><div class="b-community__item-info text"><div class="b-community__item-avatar"><img src="' + array[i].linkAvatar + '" alt=""></div><p><a href="#" class="b-community__item-auto">' + array[i].auto[0].autoName + '</a></p><p class="b-community__item-author"><a href="my-page.html" class="text">' + array[i].name + '</a><a href="#" class="text subtext">' + array[i].city + '</a></p></div></div>';
            $container.append(strInsert);
          }

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // ******************** /TEST ***********************

};
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
            strInsert = '<div class="b-community__item item"><img src="' + array[i].auto[0].linkAutoPhoto + '" alt="' + array[i].auto[0].autoName + '"><p class="text"><a href="' + array[i].linkProfile + '" class="b-community__item-name">' + array[i].name + '</a><span> из города </span><a href="#" class="b-community__item-city">' + array[i].city + '</a><span> ездит на </span><a href="#" class="b-community__item-auto">' + array[i].auto[0].autoName + '</a></p>';
            $container.append(strInsert);
          }

        },
        error: function(req,status,err) {
          console.log("Error " + req,status,err);
        }
      });
  // ******************** /TEST ***********************

};
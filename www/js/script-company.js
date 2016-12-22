;document.addEventListener("DOMContentLoaded", company);

function company() {

  var positiveVote        = [3,8,1,18,50,50,17];   // Массив положительных голосов по компании
  var allVote             = [10,15,33,34,75,62,17];   // Всего голосов по компании

  // workForm('filter');

  var $asideFloatBar = $('.b-filter');
  floatSideBar($asideFloatBar);  // Плавающий блок

  // Убирать лишние теги
  var $tags               = $('.wrap-tags');
  cropTag($tags);

  $('#category').dropList({});

  $('#city').dropList({
    search:               true,
    text:                 'Город'
  });

  $('#district').dropList({
    search:               true,
    text:                 'Район'
  });

  // Отображение в заголовке выбранной категории
  $('#wrapperCategory').on('click',function(){
    $(this).find('.SelectItem').on('click',function(){
      var $strTitle = $('.b-company h3');
      $strTitle.html($(this).html());
    });
  });
 
  //   var strSelect = $(this).html();
  //   var $title = $('.title-search h1');
  //   if(strSelect == "Все") {
  //     $title.html("Сообщества");
  //   } else {
  //     $title.html(strSelect);
  //   }
  //   return false;
  // });

  // Рейтинг
  var blocksRating        = $('.b-company__item');
  var rating              = new MakeRating(blocksRating, positiveVote, allVote);  // Обьект вывода рейтинга

  if(!IS_FIREFOX) {
    // Обрезать текст
    $("h4[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 2});
    });

    $(".item p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 4});
    });
  }

};





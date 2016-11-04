;document.addEventListener("DOMContentLoaded", company);

function company() {

  var positiveVote        = [3,8,1,18,50,50,17];   // Массив положительных голосов по компании
  var allVote             = [10,15,33,34,75,62,17];   // Всего голосов по компании

  workForm('filter');


  // Убирать лишние теги
  var $tags               = $('.wrap-tags');
  cropTag($tags);

  // Рейтинг
  var blocksRating        = $('.b-company__item');
  var rating              = new MakeRating(blocksRating, positiveVote, allVote);  // Обьект вывода рейтинга

  // Обрезать текст
  $("h4[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 2});
  });

  $(".item p.text[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 4});
  });

};





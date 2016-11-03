;document.addEventListener("DOMContentLoaded", company);

function company() {

  workForm('filter');

  var evaluationUserCompany; // Выставленная пользователем в рейтинге оценка компании

  //floatSideBar($('#float-bar'));

  var positiveVote        = [3,2,1,10,15,50,17];   // Массив положительных голосов по компании
  var allVote             = [10,15,33,34,75,62,17];   // Всего голосов по компании
  var blocksRating        = $('.b-company__item');

  var rating              = new MakeRating(blocksRating, positiveVote, allVote);  // Обьект вывода рейтинга

  $("h4[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 2});
  });

  $(".item p.text[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 4});
  });

};





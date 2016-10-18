(function () {

  workForm('filter');

  $(".b-company__item p.text").each(function(index, el){
    $clamp(el, {clamp: 6});
  });

})();





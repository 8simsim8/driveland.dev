(function () {

  workForm('filter');

  var $tags = $('.wrap-tags');
  cropTag($tags);

  // Сокращение текста с блоке с новостями
    $("h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 2});
    });
    $("p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
})();





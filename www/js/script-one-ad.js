(function () {

  // Сокращение текста с блоке с новостями
    $(".b-similar__item a").each(function(index, el){
      $clamp(el, {clamp: 3});
    });

})();
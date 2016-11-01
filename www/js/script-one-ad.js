(function () {

  var redact = new MakeRedact();

  // Сокращение текста с блоке с новостями
    $(".b-similar__item a").each(function(index, el){
      $clamp(el, {clamp: 3});
    });

})();
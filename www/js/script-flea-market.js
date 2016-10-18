(function () {

  workForm('filter');

  // Сокращение текста с блоке с новостями
    $(".b-ad__item-info h5 a").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
})();





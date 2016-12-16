;document.addEventListener("DOMContentLoaded", onePageAd);

function onePageAd() {

  var redact = new MakeRedact();

  floatSideBar($('.b-contact'));

  // Сокращение текста с блоке с новостями
    $(".b-similar__item a").each(function(index, el){
      $clamp(el, {clamp: 3});
    });

}
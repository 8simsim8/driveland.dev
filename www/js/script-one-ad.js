;document.addEventListener("DOMContentLoaded", onePageAd);

function onePageAd() {

  var redact = new MakeRedact();

  // Подобрать кол-во новостей от высоты окна
    cutSideBar($('.float-bar'));

    floatSideBar($('.float-bar'));

  if(!IS_FIREFOX) {
  // Обрезка текста до 2 строчек
    $(".b-ad__item.item h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 4});
    });

    $(".b-contact__other-ad-item a[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 2});
    });

  }

}
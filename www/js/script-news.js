;document.addEventListener("DOMContentLoaded", news);

function news() {

  // workForm('filter');

  $('#sort').dropList({});

  $('#mark').dropList({
    search:           true,
    text:             "Марка"
  });

  $('#model').dropList({
    search:           true,
    text:             "Модель"
  });

  // открытие строки с фильтром
  $('.b-news__submenu span').on('click', function(e){
    var target = e.target;
    var strTraget = target.innerHTML;
    if(!$(target).parent('li').hasClass('active')) {
      $('.active').removeClass('active');
      $('.filter-wrapp').slideUp(200);
      $(target).parent('li').addClass('active');
      $('.show-filter[data-name-filter="'+ strTraget +'"]').parent('.filter-wrapp').slideDown(200);
    }
  });

$('.b-news__submenu span').eq(0).trigger('click');

  floatSideBar($('#float-bar'));

  if(!IS_FIREFOX) {
  // Обрезка текста до 2 строчек
    $(".b-news__wrap-item p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
  // Обрезка текста до 3 строчек
    $(".b-popular__item a.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
  }

}
;document.addEventListener("DOMContentLoaded", news);

function news() {

  // workForm('filter');

  $('#category').dropList({});

  $('#date').dropList({});

  floatSideBar($('#float-bar'));

  $('.b-filter__find').on('click', function(){
    $('.b-filter__find').addClass('open-search');
    $('.b-filter__find').find('[name=search]').focus();
    return false;
  });

  $('.b-filter__find').find('[name=search]').on('blur', function(){
    $('.b-filter__find').removeClass('open-search');
    return false;
  });

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
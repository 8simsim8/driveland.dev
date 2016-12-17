;document.addEventListener("DOMContentLoaded", news);

function news() {

  // workForm('filter');

  $('#category').dropList({});

  $('#date').dropList({});

  $('#wrapperCategory').on('click',function(){
    $(this).find('.SelectItem').on('click',function(){
      var valueStr = $('#category').val();
      $('.show-filter').removeClass('show-filter');
        $('.b-filter__switch[data-name-filter='+ valueStr +']').addClass('show-filter');
      return false;
    });
  });


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
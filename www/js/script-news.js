;document.addEventListener("DOMContentLoaded", news);

function news() {

  workForm('filter');

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

  $(".b-news__wrap-item p.text[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 3});
  });

  $(".b-popular__item a.text[data-clamp]").each(function(index, el){
    $clamp(el, {clamp: 3});
  });

}
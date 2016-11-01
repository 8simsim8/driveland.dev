$(document).ready(function() {

  workForm('filter');

  var buttonToTop = new makeButtonToTop();

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

floatSideBar($('#float-bar'));

// Плавающее боковое окно
function floatSideBar($container) {
  var $perentNode         = $container.parent();
  var widthBar            = $perentNode[0].offsetWidth - 20;
  var heightBar           = $container[0].offsetHeight;
  var distanseScrollBar   = $container.offset().top;
  var distanseLeftBar     = $perentNode.offset().left;

  var $footer             = $('.l-footer');
  var heightFooter        = $footer[0].offsetHeight;
  var heightWindow        = window.innerHeight;
  var widthWindow         = window.innerWidth;

  var isFixedBar = false;
  var isEnableFloat;

  isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

  $(window).on('load resize', function(){
    heightBar             = $container.height();
    widthBar              = $perentNode[0].offsetWidth - 20;
    heightFooter          = $footer[0].offsetHeight;
    heightWindow          = window.innerHeight;
    widthWindow           = window.innerWidth;
    distanseLeftBar       = $perentNode.offset().left;

    isEnableFloat = widthWindow > WIDTH_WINDOW_TABLET ? true : false;

    if(isFixedBar && isEnableFloat) {
      $container.css({
        'width': widthBar + 'px',
        'left': distanseLeftBar + 10 + "px"
      });
    }
  });

  var prevScroll = 0;

  $(window).on('scroll', function(){

    var distanseScroll = window.pageYOffset || document.documentElement.scrollTop;
    var directScroll = (distanseScroll - prevScroll) > 0 ? 'down' : 'up';
    prevScroll = distanseScroll;

    var distanseBottom = heightWindow - $container[0].getBoundingClientRect().bottom;

    var offsetTopBar = (heightBar > heightWindow) ? (distanseScrollBar - $container[0].offsetTop) : (heightFooter - 40);

    if(isFixedBar && isEnableFloat) {
      $container.css("left", distanseLeftBar + 10 - $(this).scrollLeft() + "px");
    }

    if(directScroll == 'down' && isEnableFloat) {
      if(distanseBottom >= (heightFooter + 20)){
        isFixedBar = true;
        $container.css({
          'width': widthBar + 'px',
          'bottom': heightFooter + 20 + 'px',
          "left": distanseLeftBar + 10 - $(this).scrollLeft() + "px",
          'position': 'fixed',
          'z-index': '2'
        });
      }
    }

    if(directScroll == 'up' && isEnableFloat) {
      if(distanseScroll <= offsetTopBar) {
        isFixedBar = false;
        $container.css({
          'width': '',
          'bottom': '',
          'left': '',
          'position': '',
          'z-index': ''
        });
      }
    }

  });
}


});
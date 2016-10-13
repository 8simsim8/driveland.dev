(function () {

  workForm('filter');

  $('.b-filter__switch-item').on('click', function(){
    $('.m-filter__switch-item_active').removeClass('m-filter__switch-item_active');
    $(this).addClass('m-filter__switch-item_active');
  });
  
  $('.b-filter__switch-item').eq(0).trigger('click');

})();





(function () {

  workForm('add-car');

// Добавление замеров
$('.b-add-car__form-add p').eq(0).addClass('m-add-car__form-add_active');

$('.b-add-car__form-add span').on('click', function(){
  var $this = $(this);
  var result = $this.parent().index();
  $('.m-add-car__form-add_active').removeClass('m-add-car__form-add_active');
  $this.parent().addClass('m-add-car__form-add_active');
  $('.b-add-car__form-add-wrapp').hide();
  $('.b-add-car__form-add-wrapp').eq(result).show();
  return false;
});

// ------------------------------------------------------------------------------

//SLIM ADD CAR MAIN PHOTO (INITIALIZE SLIM TO BE READY FOR ADDING CAR MAIN PHOTO WHEN ADDING NEW CAR)

$('#carMainPhotoSlim').slim();

// SET DEFAULT SELECT OPTION. Есть у елемента СЕЛЕКТ есть аттрибут data-default, то опция с соответствующим
// значением помечается как выбранная (чтобы на странице редактирования машины по умолчанию были выбраны селекторы)

var selectors = $('select[data-default]');

for (var i = 0; i < selectors.length; i++) {
    var selector = $(selectors[i]);
    var defaultValue = selector.attr('data-default');
    selector.find("option[value='" + defaultValue + "']").attr('selected', 'selected');
}

})();





;document.addEventListener("DOMContentLoaded", addAd);

function addAd() {

  // workForm('add-ad');

  $('#postMainPhotoSlim').slim();

  $('#category').dropList({
    selected              : '["Rims"]'
  });

  $('#car-mark').dropList({
    search:               true,
    text:                 'Выберите марку'
  });

  $('#car-model').dropList({
    search:               true,
    text:                 'Выберите модель'
  });

  $('#wrapperCategory').on('click',function(){
    $(this).find('.SelectItem').on('click',function(){
      if($('#category').val() == $('#wrapperCar').attr('name')) {
        $('#wrapperCar').show(200);
      }
    });
  });

  $('#wrapperCar').on('click',function(){
    $(this).find('.SelectItem').on('click',function(){
      $('#wrapperModel').show(200);
    });
    $(this).find('input').keyup(function(e){
      if(e.keyCode == 13) {
        $('#wrapperModel').show(200);
      }
    });
  });

};





(function () {

  // workForm('add-company');

$('#postMainPhotoSlim').slim();

    $('#category').dropList({});

    $('#tag').dropList({
      multiple:           true
    });
    
    $('#city').dropList({});
    
    $('#district').dropList({ });

    $('#wrapperCity').on('click',function(){
      $(this).find('.SelectItem').on('click',function(){
        $('#wrapperDistrict').show(200);
      });
    });

})();





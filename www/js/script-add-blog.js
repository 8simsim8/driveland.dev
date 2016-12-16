(function (){

  // workForm('add-blog');
  
  $('#tag').dropList({
    multiple  : true,
    selected  : '["Личное"]'
  });

// ADD POSTS (GIVE USER ABILITY TO ADD TEXT BLOCKS AND PHOTOS WHEN CREATING NEW POST)

  $('#postMainPhotoSlim').slim();

// ----------------------------------------------------------------------------------

  // При фокусе на input добавить прозрачности кнопкам
  var $inputs = $('input, textarea');
  $inputs.on('focus', function(){
    $('.b-add-blog__form-button').addClass('m-button-in-fade');
  });
  $inputs.on('blur', function(){
    $('.b-add-blog__form-button').removeClass('m-button-in-fade');
  });

})();
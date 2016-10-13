(function (){
  
  workForm('add-blog');

// ADD POSTS (GIVE USER ABILITY TO ADD TEXT BLOCKS AND PHOTOS WHEN CREATING NEW POST)

  $('#postMainPhotoSlim').slim();

  var blogNum = 1;

  $('#addPostText').on('click', function (e) {
    var name = 'txt' + blogNum;
    $('#postText').clone().removeAttr('id').show().appendTo('#postContent')
                  .find('textarea').attr('name', name);
    blogNum++;
  });

  $('#addPostPhoto').on('click', function (e) {
    var name = 'img' + blogNum;
    var div = $('#postPhoto').clone().removeAttr('id');
    var slim = div.find('.postPhotoSlim');
    
    div.show().appendTo('#postContent');    
    slim.find('input').attr('name', name);
    slim.slim();
    blogNum++;
  });

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
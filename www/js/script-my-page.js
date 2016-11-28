;document.addEventListener("DOMContentLoaded", general);

function general() {

  var redact = new MakeRedact();

  var aside = $('.l-author');

  var asideBar = new MakeAsideBar(aside);

  if(!IS_FIREFOX) {
    $("h4[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 1});
    });

    $(".text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
  }

// -----------------------------------------------------------------------------

// ADD COMMENT ON THE USER MAIN PAGE

$('#addCom').on('click', function (e) {
    e.preventDefault();
    var comment = $('#hidnCom').clone().removeAttr('id');
    comment.find('p').text($('#comTa').val());
    comment.find('span').text(Date.now());
    comment.show().prependTo('#comments');
});



// ADD PHOTO TO THE USER ALBUM MODAL (USER PAGE)

$('#addUserPhoto').on('click', function (e) {
    e.preventDefault();
    var modal = $('#addUserPhotosModal');
    modal.css('display', 'block');
    $('#addUserPhotosSlim').slim();    
    modal.find('.close').on('click', function (e) {
        modal.css('display', 'none');
    });  
});


// VIEW USER ALBUM MODAL (USER PAGE)

$('#userPhotos').on('click', function (e) {
    e.preventDefault();
    var modal = $('#userPhotosModal');
    var modalImage = modal.find('#userPhotosModalImg');       
    var images = modal.find('#albumImages').data('address').split(',');
    var position = 0;    
    modalImage.attr('src', images[position]);
    modal.css('display', 'block');       
    modal.find('.close').on('click', function (e) {
        modal.css('display', 'none');        
    });    
    $('#userPhotosModalNext').on('click', function (e) {
        e.preventDefault();
        position++;
        if (position >= images.length) { position = 0; }
        modalImage.attr('src', images[position]);        
    });
    $('#userPhotosModalPrev').on('click', function (e) {
        e.preventDefault();
        position--;
        if (position < 0) { position = images.length - 1; }
        modalImage.attr('src', images[position]);        
    });
    $('#delUserPhoto').on('click', function (e) {
        e.preventDefault();
        images.splice(position, 1);
        modal.find('#albumImages').data('address', images.toString());        
        $.ajax({
          method: "POST",
          url: "/user/deluserphoto",
          data: { img : modalImage.attr('src') },
          complete: $('#userPhotosModalNext').trigger('click') 
        });
    });
});


// ADD PHOTO TO THE CAR ALBUM MODAL (USER PAGE)

$('#addCarPhoto').on('click', function (e) {
    e.preventDefault();
    var modal = $('#addCarPhotosModal');
    modal.css('display', 'block');
    $('#addCarPhotoSlim').slim();    
    modal.find('.close').on('click', function (e) {
        modal.css('display', 'none');
    });  
});


// CAR PHOTOS GALLERY (USER PAGE)

var carPhotos = $('#carPhotos');

if (carPhotos.length) {

    var carPhotosImg = carPhotos.find('#carPhotosImg');
    var carMainPhoto = carPhotosImg.attr('src');
    var carImages = carPhotos.find('#carImages').data('address').split(',');    
    var carPhotoPosition = 0;
    var delCarPhoto = $('#delCarPhoto');    

    delCarPhoto.hide();
    carImages.unshift(carMainPhoto);

    $('#carPhotosNext').on('click', function (e) {
        e.preventDefault();
        carPhotoPosition++;
        if (carPhotoPosition >= carImages.length) { carPhotoPosition = 0 ; }
        carPhotosImg.attr('src', carImages[carPhotoPosition]);
        if (carImages[carPhotoPosition] != carMainPhoto) { delCarPhoto.show(); } 
        else { delCarPhoto.hide(); }        
    });

    $('#carPhotosPrev').on('click', function (e) {
        e.preventDefault();
        carPhotoPosition--;
        if (carPhotoPosition < 0) { carPhotoPosition = carImages.length - 1; }
        carPhotosImg.attr('src', carImages[carPhotoPosition]);
        if (carImages[carPhotoPosition] != carMainPhoto) { delCarPhoto.show(); } 
        else { delCarPhoto.hide(); }         
    });

    delCarPhoto.on('click', function (e) {
        e.preventDefault();
        carImages.splice(carPhotoPosition, 1);
        carPhotos.find('#carImages').data('address', carImages.toString());    
        $.ajax({
          method: "POST",
          url: "/user/delcarphoto",
          data: { img : carPhotosImg.attr('src'),
                carid : delCarPhoto.data('carid') },
          complete: $('#carPhotosNext').trigger('click')
        });
    });
}


// REFRESH AND DELETE AVATAR (USER PAGE)

$('#newAvatar').on('click', function (e) {
    e.preventDefault();
    
    var avatar = $('#avatarContainer');
    avatar.children().remove();
    avatar.html('<input type="file" id="avatarSlim"/>');

    $('#avatarSlim').slim({
        service: '/user/avatar',
        ratio: '1:1',
        size: {
            width: 240,
            height: 240
        }        
    });    
});


$('#deleteAvatar').on('click', function (e) {
    e.preventDefault();
    
    $.ajax({
      method: 'POST',
      url: '/user/delete-avatar'
    });

    var avatar = $('#avatarContainer');
    avatar.children().remove();
    avatar.html('<input type="file" id="avatarSlim"/>');

    $('#avatarSlim').slim({
        service: '/user/avatar',
        ratio: '1:1',
        size: {
            width: 240,
            height: 240
        }        
    });
});


// USER STATUS REFRESH (USER PAGE)

$('#status-btn').on('click', function (e) {
    e.preventDefault();
    $('#status').html('HELLO FROM jQUERY!');

    $.ajax({
      method: 'POST',
      url: '/user/status',
      data: { status: 'NEW STATUS' }
    });

});


// SLIM ADD AVATAR (INITIALIZE SLIM TO BE READY FOR ADDING AVATAR ON USER PAGE RIGHT AFTER REGISTERING)

$('#avatarSlim').slim({
    service: '/user/avatar',
    ratio: '1:1',
    size: {
        width: 240,
        height: 240
    }        
});

}

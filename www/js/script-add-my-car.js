(function () {

// Логика дроплиста
$('.droplist-block').each(function(index, el){
  $(el).css({
    'height': $(el)[0].scrollHeight + 'px'
  });
});


$(document).on('click', function(){
  $('.m-open-droplist').removeClass('m-open-droplist');
});

$('.droplist-current').on('click', function(){
  var $this = $(this);
  var $dropList = $this.siblings().filter('.droplist-block');
  if($dropList.hasClass('m-open-droplist')) {
    $('.m-open-droplist').removeClass('m-open-droplist');
  } else {
    $('.m-open-droplist').removeClass('m-open-droplist');
    $dropList.addClass('m-open-droplist');
  }
  return false;
});

$('.droplist-item').on('click', function(){
  var selectStr = $(this).html();
  $(this).parent().siblings().filter('.droplist-current').html(selectStr);
  $(this).parent().siblings('input').val(selectStr);
  $(this).parent().removeClass('m-open-droplist');
  return false;
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


//SLIM ADD CAR MAIN PHOTO (INITIALIZE SLIM TO BE READY FOR ADDING CAR MAIN PHOTO WHEN ADDING NEW CAR)

$('#carMainPhotoSlim').slim();


// ADD MEASUREMENTS/TUNING/FUTURETUNING (ADD CAR PAGE). При добавлении замеров, или тюнанга добавляет
// соответствующее поле ввода и удаляет соответствующую строку из списка. При удалении поля ввода,
// опять возвращает строку в список.

var measureSelect = $('#measureSelect');    
    measureSelect.on('change', function (e) {
    var optionSelected = $("option:selected", this);    
    var nameSelected = optionSelected.text();
    var valueSelected = this.value;
    optionSelected.remove();
    var measureItem = $('#hiddenMeasureItem').clone().removeAttr('style').removeAttr('id');
    $('label', measureItem).text(nameSelected);
    $('input', measureItem).attr('name', valueSelected);
    $('a', measureItem).on('click', delMeasureItem);
    measureItem.appendTo($('#measurements'));
});

$('.delMeasure').on('click', delMeasureItem);

function delMeasureItem (e) {
    e.preventDefault();
    var a = $(this);
    var text = a.prev().prev().text();
    var value = a.prev().attr('name');
    var option = '<option value=\"'+value+'\">'+text+'</option>';
    $(option).appendTo(measureSelect);
    a.closest('div').remove();
}


var tuningSelect = $('#tuningSelect');    
    tuningSelect.on('change', function (e) {
    var optionSelected = $("option:selected", this);    
    var nameSelected = optionSelected.text();
    var valueSelected = this.value;
    optionSelected.remove();
    var tuningItem = $('#hiddenTuningItem').clone().removeAttr('style').removeAttr('id');
    $('label', tuningItem).text(nameSelected);
    $('input', tuningItem).attr('name', valueSelected);
    $('a', tuningItem).on('click', delTuningItem);
    tuningItem.appendTo($('#tuning'));
});

$('.delTuning').on('click', delTuningItem);

function delTuningItem (e) {
    e.preventDefault();
    var a = $(this);
    var text = a.prev().prev().text();
    var value = a.prev().attr('name');
    var option = '<option value=\"'+value+'\">'+text+'</option>';
    $(option).appendTo(tuningSelect);
    a.closest('div').remove();
}


var futureSelect = $('#futureSelect');
futureSelect.on('change', function (e) {
    var optionSelected = $("option:selected", this);    
    var nameSelected = optionSelected.text();
    var valueSelected = this.value;
    optionSelected.remove();
    var futureItem = $('#hiddenFutureItem').clone().removeAttr('style').removeAttr('id');
    $('label', futureItem).text(nameSelected);
    $('input', futureItem).attr('name', valueSelected);
    $('a', futureItem).on('click', delFutureItem);    
    futureItem.appendTo($('#future'));
});

$('.delFuture').on('click', delFutureItem);

function delFutureItem (e) {
    e.preventDefault();
    var a = $(this);
    var text = a.prev().prev().text();
    var value = a.prev().attr('name');
    var option = '<option value=\"'+value+'\">'+text+'</option>';
    $(option).appendTo(futureSelect);
    a.closest('div').remove();
}


// SET DEFAULT SELECT OPTION. Есть у елемента СЕЛЕКТ есть аттрибут data-default, то опция с соответствующим
// значением помечается как выбранная (чтобы на странице редактирования машины по умолчанию были выбраны селекторы)

var selectors = $('select[data-default]');

for (var i = 0; i < selectors.length; i++) {
    var selector = $(selectors[i]);
    var defaultValue = selector.attr('data-default');
    selector.find("option[value='" + defaultValue + "']").attr('selected', 'selected');    
}


// PRELOADED ITEMS (WHEN EDITING THE CAR REMOVES ALREADY ADDED MEASUREMTNS OR TUNING FROM THE LIST).

var preloadedItems = $('.preloadedItem');

for (var k = 0; k < preloadedItems.length; k++) {
    var preloadedItem = $(preloadedItems[k]);
    var preloadedItemName = preloadedItem.find('input').attr('name');
    var preloadedOption = $("option[value='" + preloadedItemName + "']");
    preloadedItem.find('label').text(preloadedOption.text());
    preloadedOption.remove();
}


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


// BAZAAR AND COMPANIES PHOTO GALLERY

$('.galleryThumb').on('click', function (e) {
    e.preventDefault();
    var photoSrc = $(this).attr('src').replace('thumb', '');
    $('#galleryPhoto').attr('src', photoSrc);
});


// ADD COMMENT ON THE USER MAIN PAGE

$('#addCom').on('click', function (e) {
    e.preventDefault();
    var comment = $('#hidnCom').clone().removeAttr('id');
    comment.find('p').text($('#comTa').val());
    comment.find('span').text(Date.now());
    comment.show().prependTo('#comments');
});



})();





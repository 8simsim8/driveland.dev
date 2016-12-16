;document.addEventListener("DOMContentLoaded", oneCompany);

function oneCompany() {

  var positiveVote        = [50];   // Массив положительных голосов по компании
  var allVote             = [75];   // Всего голосов по компании

  // Рейтинг
  var blocksRating        = $('.b-one-company__title-note');
  var rating              = new MakeRating(blocksRating, positiveVote, allVote);  // Обьект вывода рейтинга

  var strReduceHeader = $(".b-one-company__news-wrapp-item-text h5")[2];
  var strReduce = $(".b-one-company__news-wrapp-item-text")[2];

  var $asideFloatBar = $('.b-similar');
  floatSideBar($asideFloatBar);  // Плавающий блок

  if(!IS_FIREFOX) {
    $(".b-similar__item [data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
    $("h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
    $("p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 4});
    });
  }

  // Открыть попап "написать компании"
    var messagePopup = document.getElementsByClassName('b-one-company__message')[0];
    var buttonOpenMessagePopup = document.getElementsByName('open-message-popup');
    $(buttonOpenMessagePopup).on('click', function() {
      messagePopup.setAttribute('popup-message','open');
      disableScroll();
      return false;
    });
    $('.b-popup-message-close').on('click', function() {
      messagePopup.setAttribute('popup-message','close');
      enableScroll();
      return false;
    });

    // Клик по кнопке отправить сообщение
     $('input.submit-button').on('click', function(){
        $('.b-one-company__message-wrapp').fadeOut('200', function(){
          $('.b-one-company__message-confirm').fadeIn('300');
        });
        return false;
      });

  // Вывод карты, в зависимости от адресса компании
    initialize();

    function initialize()
    {
      var nameCompany = document.getElementById('nameCompany').innerHTML;
      var mapDiv = document.getElementById('map');
      var address = document.getElementById("textAddress").innerHTML;
      var geocoder = new google.maps.Geocoder();
      // Get LatLng information by name
      geocoder.geocode({
        "address": address
      }, function(results, status){
        var map = new google.maps.Map(mapDiv, {
       // Center map (but check status of geocoder)
          center: results[0].geometry.location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        });
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          animation: google.maps.Animation.DROP,
          title: nameCompany
        });
      });
    }

};
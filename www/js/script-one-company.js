(function () {

// Disable scroll
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
/*--------------------------------------------------------------------------------*/

  var strReduceHeader = $(".b-one-company__news-wrapp-item-text h5")[2];
  var strReduce = $(".b-one-company__news-wrapp-item-text")[2];
  var asideStr = ".b-similar__item";
  
  $(".b-similar__item").each(function(index, el){
    $clamp(el, {clamp: 3});
  });
  $(".b-one-company__news-wrapp-item-text h5").each(function(index, el){
    $clamp(el, {clamp: 3});
  });
  $(".b-one-company__news-wrapp-item-text").each(function(index, el){
    $clamp(el, {clamp: '80px'});
  });

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

})();
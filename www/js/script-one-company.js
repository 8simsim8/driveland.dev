;document.addEventListener("DOMContentLoaded", oneCompany);

function oneCompany() {

  var positiveVote        = [50];   // Массив положительных голосов по компании
  var allVote             = [75];   // Всего голосов по компании

  // Рейтинг в верху страницы
  var blocksRating        = $('.b-one-company__title-note');
  var rating              = new MakeRating(blocksRating, positiveVote, allVote);  // Обьект вывода рейтинга

  // Рейтинг голосования
    $('#rating-select').rating(function(vote, event){
      var strMessage;
      switch(+vote) {
        case 1:
          strMessage = 'Плохо';
          break;
        case 2:
          strMessage = 'Посредственно';
          break;
        case 3:
          strMessage = 'Удовлетворительно';
          break;
        case 4:
          strMessage = 'Хорошо';
          break;
        case 5:
          strMessage = 'Отлично';
          break;
      }
      $('#message-rating').html(strMessage);
      
      // $.ajax({
      //   url: "/get_votes.php",
      //   type: "GET",
      //   data: {rate: vote},
      // });
    }); 

  var strReduceHeader = $(".b-one-company__news-wrapp-item-text h5")[2];
  var strReduce = $(".b-one-company__news-wrapp-item-text")[2];

  if(!IS_FIREFOX) {
    $(".b-similar__item [data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
    $("h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
    $(".b-one-company__news-wrapp-item h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 1});
    });
    $("p.text[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 4});
    });
  }

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
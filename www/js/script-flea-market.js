;document.addEventListener("DOMContentLoaded",  market);

function market() {
  workForm('filter');

  var $tags = $('.wrap-tags');
  cropTag($tags);					// Обрезание лишних тегов
  
  // Анимация кнопки "Избранное"
  var $favorite = $('.b-ad__item-fav');
  var strAddFav = $('.b-ad__item-fav').attr('data-add-message');
  var strRemFav = $('.b-ad__item-fav').attr('data-remove-message');

  $favorite.on('click', function(){
	  var $this = $(this);
	  if(!$(this).hasClass('add-to-favorite')) {
		$(this).attr('data-message', strAddFav);
		$(this).addClass('add-to-favorite');
		$(this).addClass('show-text-favorite');
	  }
	  else {
		$(this).attr('data-message', strRemFav);
		$(this).removeClass('add-to-favorite');
	  }
	  $(this).addClass('show-text-favorite');
	  setTimeout(
		function(){
		  $this.removeClass('show-text-favorite');
		},
	  1000);
  });

  if(!IS_FIREFOX) {
  // Обрезка текста до 2 строчек
    $(".b-ad__item-info-top h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 2});
    });
  }

};





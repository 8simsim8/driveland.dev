;document.addEventListener("DOMContentLoaded",  market);

function market() {
  // workForm('filter');

  var $tags = $('.wrap-tags');
  cropTag($tags);					// Обрезание лишних тегов

  // Подобрать кол-во новостей от высоты окна
    // cutSideBar($('.aside-panel-wrapp'));

  var $asideFloatBar = $('.b-filter');
  floatSideBar($asideFloatBar);  // Плавающий блок
  
  // Анимация кнопки "Избранное"
  // var $favorite = $('.b-ad__item-fav');
  // var strAddFav = $('.b-ad__item-fav').attr('data-add-message');
  // var strRemFav = $('.b-ad__item-fav').attr('data-remove-message');

  // $favorite.on('click', function(){
	 //  var $this = $(this);
	 //  if(!$(this).hasClass('add-to-favorite')) {
		// $(this).attr('data-message', strAddFav);
		// $(this).addClass('add-to-favorite');
		// $(this).addClass('show-text-favorite');
	 //  }
	 //  else {
		// $(this).attr('data-message', strRemFav);
		// $(this).removeClass('add-to-favorite');
	 //  }
	 //  $(this).addClass('show-text-favorite');
	 //  setTimeout(
		// function(){
		//   $this.removeClass('show-text-favorite');
		// },
	 //  1000);
  // });

  if(!IS_FIREFOX) {
  // Обрезка текста до 2 строчек
    $(".b-ad__item-info-top h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 2});
    });

  // Обрезка текста до 3 строчек в просмотреных ранее
    $(".b-add-block__last h5[data-clamp]").each(function(index, el){
      $clamp(el, {clamp: 3});
    });
  }

  // Дроплисты
  $('#category').dropList({});

  // Отображение в заголовке выбранной категории
  $('#wrapperCategory').on('click',function(){
    $(this).find('.SelectItem').on('click',function(){
      var $strTitle = $('.b-ad-block h3');
      $strTitle.html($(this).html());
    });
  });

  $('#mark').dropList({
    search:             true,
    text:               'Все марки'
  });

  $('#model').dropList({
    search:             true,
    text:               'Все модели'
  });


};





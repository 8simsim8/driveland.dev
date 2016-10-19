  workForm('filter');
  
  $(".b-popular__item img+a.text").each(function(index, el){
    $clamp(el, {clamp: 3});
  });
  
  $(".b-news__wrap-item h5").each(function(index, el){
    $clamp(el, {clamp: 3});
  });

  $(".b-news__wrap-item a p.text").each(function(index, el){

    var linkNews = $(el).siblings('h5').children('a').attr('href');
    var titleNews = $(el).siblings('h5').children('a').html();
    var addStr = '<a href="' + linkNews + '" class="news-link" title="'+ titleNews + '"></a>';

    $clamp(el, {clamp: 4});
    if($(el)[0].scrollHeight > $(el).height() ) {
      $(el).append(addStr);
    }

  });
  workForm('filter');
  
  $(".b-popular__item p.text+a.text").each(function(index, el){
    $clamp(el, {clamp: 3});
  });
  
  $(".b-news__wrap-item h5").each(function(index, el){
    $clamp(el, {clamp: 3});
  });

  $(".b-news__wrap-item").each(function(index, el){
    
    var $linkNews = $(el).children('a').eq(0);
    var hrefLinkNews = $linkNews.attr('href');
    var titleNews = $linkNews.children('h5').html();
    console.log(titleNews);
    var addStr = '<a href="' + hrefLinkNews + '" class="news-link" title="'+ titleNews + '"></a>';

    $clamp($linkNews.children('p.text')[0], {clamp: 4});
    $linkNews.children('p.text').append(addStr);

  });
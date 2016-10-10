var pageMyCar = new MakePageMyCar();

function MakePageMyCar() {
  $('.redact-block').on('mouseover', function(event) {
    var $this = $(this);
    $this.children().filter('.block-redactor').addClass('m-block-redactor_show');
  });
  
  $('.redact-block').on('mouseout', function(event) {
    $('.block-redactor').removeClass('m-block-redactor_show');
  });
}
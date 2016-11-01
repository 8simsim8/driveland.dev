function workForm(nameForm) {

  // Логика дроплиста ----------------------------------------------------------
    var form            = document.getElementsByName(nameForm)[0];
    var itemInputs      = form.getElementsByClassName('tab-input');
    var currentInput    = 0;
    var currentString   = 0;
    var heightList      = 0;
    var $thisList;
    var sumInputs       = itemInputs.length;
    var keyUp           = 38,
        keyDown         = 40,
        keyEnter        = 13,
        keyTab          = 9;

    // При загрузке фокус на первом поле
      if($(itemInputs).eq(currentInput).hasClass('click-element')) {
        $(itemInputs).eq(currentInput).click();
      } else {
        $(itemInputs).eq(currentInput).focus();
      }

    $(itemInputs).on('click', function(){
      if(currentInput != 0) $(itemInputs).eq(currentInput).blur();
      var $this = $(this);
      currentInput = $(itemInputs).index($this);
    });

    // Переключение inputs по "Tab"
    $(document).on('keydown', form, function(e){
      if(e.keyCode == keyTab && currentInput <= sumInputs-1) {
        do {
          currentInput++;
        } while(!$(itemInputs).eq(currentInput).is(':visible') && currentInput < sumInputs)
        $(itemInputs).blur();
        $(document).trigger('click');

        if($(itemInputs).eq(currentInput).hasClass('droplist-current') || $(itemInputs).eq(currentInput).hasClass('click-element')) {
          $(itemInputs).eq(currentInput).click();
          return false;
        } else {
          $(itemInputs).eq(currentInput).focus();
          return false;
        }
      }
    });

    // Work with mouse - Active item of list
    $('.droplist-item').on('mouseover',function(){
        $('.droplist-item_select').removeClass('droplist-item_select');
        currentString = $(this).index();
        $thisList.children().eq(currentString).addClass('droplist-item_select');
    });

    // Dropdown work with keyboard
    $(document).on('keydown',function(e){
      if($('.droplist-block').hasClass('m-open-droplist')) {
        distanseScroll = $thisList.children().eq(currentString).position().top;
        if(e.keyCode == keyUp) {
          if(currentString > 0) {
            currentString--;
          }
        }
        if(e.keyCode == keyDown) {
          if(currentString < sumListEl-1) {
            currentString++;
          }
        }
        if(e.keyCode == keyEnter) {
          $thisList.children().eq(currentString).trigger('click');
        }
        $('.droplist-item_select').removeClass('droplist-item_select');
        $thisList.children().eq(currentString).addClass('droplist-item_select');
        var heightItemElement = $thisList.children().eq(currentString)[0].scrollHeight;
        // If end/start list
        if( distanseScroll > (heightList-3*heightItemElement) && e.keyCode == keyDown && currentString < sumListEl-1) {
          scrollY += heightItemElement;
          $thisList.animate({'scrollTop': scrollY}, 50);
        }
        if(distanseScroll <= heightItemElement+10 && e.keyCode == keyUp && currentString > 0) {
          scrollY -= heightItemElement;
          $thisList.animate({'scrollTop': scrollY}, 50);
        }
        // Dont event click on button
        if(e.keyCode == keyUp || e.keyCode == keyDown || e.keyCode == keyEnter) return false;
      }
    });

    // Закрыть дропдаун по клику на странице
    $(document).on('click', function(){
      $('.m-open-droplist').removeClass('m-open-droplist');
    });

    $('.droplist-current').on('click focus', function(){
      var $this = $(this);
      $thisList = $this.siblings().filter('.droplist-block');
      var $dropList = $thisList;
      sumListEl = $thisList.children().length;
      heightList = $thisList[0].clientHeight;
      if($dropList.hasClass('m-open-droplist')) {
        $('.m-open-droplist').removeClass('m-open-droplist');
      } else {
        $('.m-open-droplist').removeClass('m-open-droplist');
        $dropList.addClass('m-open-droplist');
        $this.addClass('m-open-droplist');
      }
      return false;
    });

    $('.droplist-item').on('click', function() {
      var $this = $(this);
      var selectStr = $(this).html();
      $(this).parent().siblings().filter('.droplist-current').html(selectStr);
      $(this).parent().siblings('input').val(selectStr);
      $('.m-open-droplist').removeClass('m-open-droplist');
      var currentList = $(this).parent().parent();
      if(currentList.next() && !currentList.next().is(':visible')) {
        currentList.next().show();
      }
      currentString = 0;
      return false;
    });
}
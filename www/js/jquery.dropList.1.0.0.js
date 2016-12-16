/*****************************************************
*													 *
*	Author: Dinesh Vadivel							 *
*	Plugin: jquery.dropList.1.0.0.js				 *
*	Date:	20-06-2013								 *
*													 *
*													 *
*													 *
*													 *
*													 *
*													 *
*****************************************************/

(function($){
   var DropList = function(element, options)
   {
       var elem = $(element);
       var obj = this;
       var rand;
       this.result = [];
       // Merge options with defaults
       var settings = $.extend({
       	  text		: "",
          speed		: 200,
        
          type		: "dropdown",
          search	: false,
          multiple	: false,
          selected	: '[]'
       }, options || {});
       
       var matched, browser;
       jQuery.uaMatch = function( ua ) {
	   ua = ua.toLowerCase();
	   var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};

		matched = jQuery.uaMatch( navigator.userAgent );
		browser = {};
		
		if ( matched.browser ) {
		    browser[ matched.browser ] = true;
		    browser.version = matched.version;
		}
		
		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
		    browser.webkit = true;
		} else if ( browser.webkit ) {
		    browser.safari = true;
		}
		
		jQuery.browser = browser;
		
       GenerateUI(elem, element, settings, matched.browser);

       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function GenerateUI(element, selectNode, options, browser) 
   {
		rand=Math.floor((Math.random()*9999999)+9999);
		ID=element.attr('id');
		var parentID=element.parent().attr('id');
		
		$('#'+ID).hide();
		if(options.search==false)
		{
			if(options.selected.length == 2)
			{
				if(options.text == '') {
					var titleValue = $('#'+parentID).children().find('option[data-title]').html();
					$('#'+parentID).append('<div class="dListholder" id="dlholder_'+rand+'"><div class="dListText" id="dltext"  data-titem="'+options.text+'">'+titleValue+'</div><div class="dListBtn" id="dlbtn"></div><div id="tempdllist" style="display:none;">'+options.text+'</div></div>');
				} else {
					$('#'+parentID).append('<div class="dListholder" id="dlholder_'+rand+'"><div class="dListText" id="dltext"  data-titem="'+options.text+'">'+options.text+'</div><div class="dListBtn" id="dlbtn"></div><div id="tempdllist" style="display:none;">'+options.text+'</div></div>');
				}
			}
			else
			{
				var json=$.parseJSON(options.selected);
				var parsed=json[0];

				if(options.multiple==false)
				{
				$('#'+parentID).append('<div class="dListholder" id="dlholder_'+rand+'"><div class="dListText" id="dltext"  data-titem="'+options.text+'">'+parsed+'</div><div class="dListBtn" id="dlbtn"></div><div id="tempdllist" style="display:none;">'+options.text+'</div></div>');
				$('#dlholder_'+rand).siblings(selectNode).children('option[value='+parsed+']').attr('selected', 'selected');
				}
				else
				{	
				var temp='';
					
					$.each(json,function(key,value){
						$('#'+ID).children('option[value='+value+']').attr('selected', 'selected');
						temp+=value+',';
					});
					temp=temp.substr(0,temp.length-1);
					$("#dlholder_"+rand).children('#tempdllist').text(temp);
					$('#'+parentID).append('<div class="dListholder" id="dlholder_'+rand+'"><div class="dListText" id="dltext"  data-titem="'+temp+'">'+temp+'</div><div class="dListBtn" id="dlbtn"></div><div id="tempdllist" style="display:none;">'+options.text+'</div></div>');
				}
			}
			
			$('#'+parentID).append('<div class="dListdivider" id="dldivider_'+rand+'"></div>');
			$('#'+parentID).append('<div class="dListdrop" id="dldrop_'+rand+'"></div>');
			$('#'+ID+' option').each(function(){
				if(!$(this).is('[data-title]')) {
					if(!$(this).is('[value]')) {
						$(this).attr('value',this.innerHTML);
						$('#dldrop_'+rand).append('<div class="dlitem SelectItem" data-val='+this.innerHTML+'>'+this.innerHTML+'</div>');
					} else {
						$('#dldrop_'+rand).append('<div class="dlitem SelectItem" data-val='+this.value+'>'+this.innerHTML+'</div>');
					}
				} else {
					$('#dldrop_'+rand).append('<div class="dlitem SelectItem">'+this.innerHTML+'</div>');
				}
			});
			
			if(options.multiple==false)
			{
				$('#dlholder_'+rand).off('click');
				$('#dlholder_'+rand).click(function(){
					var split=this.id.split("_");

					$('.dListdrop').each(function(){
						if(this.id!="dldrop_"+split[1]&&$('#'+this.id).is(":visible"))
						{
							$("#"+this.id).slideUp();
						}
					});	
					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
					{
						
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).addClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideDown( options.speed, function() {
						});
					} 
					else 
					{
					    $("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).removeClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideUp( options.speed, function() {
						 
					  	});
					}
					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
					{
					} else {
						$("#dldrop_"+split[1]+" .SelectItem").off('click');
						$("#dldrop_"+split[1]+" .SelectItem").click(function(){
							var selection = $(this).text();
							if($('#dlholder_'+split[1]).siblings(selectNode).val() != selection) {
								$('#dlholder_'+split[1]+' #dltext').text(selection);
								$('#dlholder_'+split[1]).siblings(selectNode).val(selection);
								result = $('#dlholder_'+split[1]).siblings(selectNode).val();
								}
							$( "#dldrop_"+split[1] ).slideUp( options.speed );
							return false;
						});
					}
				});
			}
			else if(options.multiple==true)
			{
				$('#dlholder_'+rand).off('click');
				$('#dlholder_'+rand).click(function(){
					
					var split=this.id.split("_");
					$('.dListdrop').each(function(){
						if(this.id!="dldrop_"+split[1]&&$('#'+this.id).is(":visible"))
						{
							$("#"+this.id).slideUp();
						}
					});
					var Stext=$("#dlholder_"+split[1]).children('#tempdllist').text();	
					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
					{
						
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).addClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideDown( options.speed, function() {
						});
					} 
					else 
					{
					    $("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).removeClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideUp( options.speed, function() {
						 
					  	});
					}
					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
					{
								
					}
					else
					{
						
						if(Stext==options.text)
						{
							var items=[];
						}
						else
						{
							var items=Stext.split(',');
						}
						
						//var trainindIdArray = 
						$(this).removeClass('currentclick');
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).off('click');
							$(this).click(function(){
								var disable=$(this).hasClass('ItemAdded');
								if(disable==false)
								{					
									$(this).addClass('ItemAdded');
									var selection=$(this).text();
	
									items.push(selection);
									$('#dlholder_'+split[1]+' #dltext').text(selection);
									$('#dlholder_'+split[1]).siblings('select').children('option:selected').removeAttr('selected');
									$.each(items,function(e,value){
										$('#dlholder_'+split[1]).siblings('select').children('option[value='+ value +']').prop('selected', 'selected');
									});
									var stringme=items+"";
									$('#dlholder_'+split[1]+' #dltext').text(stringme);
									$('#dlholder_'+split[1]+' #tempdllist').text(stringme);	
									result = $('#dlholder_'+split[1]).siblings(selectNode).val();
								}
								else
								{
									var selection=$(this).text();
									$(this).removeClass('ItemAdded');
									items = jQuery.grep(items, function(value) {
									  return value != selection;
									});
									var stringme=items+"";
									$('#dlholder_'+split[1]+' #dltext').text(stringme);
									$('#dlholder_'+split[1]+' #tempdllist').text(stringme);
									$('#dlholder_'+split[1]).siblings('select').children('option[value='+selection+']').removeAttr('selected');
									if(items.length==0)
									{
										$('#dlholder_'+split[1]+' #dltext').text(options.text);
										$('#dlholder_'+split[1]+' #tempdllist').text(options.text);
										
									}
									result = $('#dlholder_'+split[1]).siblings(selectNode).val();
								}
							});
						
						});
					
					}
						
				});
	
			}

		}
		else if(options.search==true&&options.multiple==false)
		{
			
			$('#'+parentID).append('<div class="dListholder" id="dlholder_'+rand+'"><div class="dListText reducepad" id="dltext"  data-titem="'+options.text+'"><input type="text" name="searchstring" class="dlsearch" placeholder="'+options.text+'" id="dlsrch_'+rand+'"></div><div class="dListBtn" id="dlbtn_'+rand+'" ref="'+rand+'"></div><div id="tempdllist" style="display:none;">'+options.text+'</div></div>');
			$('#'+parentID).append('<div class="dListdivider" id="dldivider_'+rand+'"></div>');
			$('#'+parentID).append('<div class="dListdrop" id="dldrop_'+rand+'"></div>');
			$('#'+ID+' option').each(function(){
				if(!$(this).is('[value]')) {
					$(this).attr('value',this.innerHTML);
				}
				$('#dldrop_'+rand).append('<div class="dlitem SelectItem" data-val='+this.innerHTML+'>'+this.innerHTML+'</div>');
			});

			var $prevString;
			$("#dlsrch_"+rand).keyup(function(e){
				var split=this.id.split("_");
				$('.dListdrop').each(function(){
						if(this.id!="dldrop_"+split[1]&&$('#'+this.id).is(":visible"))
						{
							$("#"+this.id).slideUp();
						}
					});
				var filter = $(this).val(), count = 0;
				if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
				{
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).addClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideDown( options.speed, function() {
						});
				} 
				
				$("#dldrop_"+split[1]+" .SelectItem").each(function(){
					if ($(this).text().search(new RegExp(filter, "i")) < 0) {
		        $(this).hide();
		      } else {
		        $(this).show();
		        count++;
		      }
	       });

				if($("#dldrop_"+split[1]+" .SelectItem").filter(":visible").length <= 1) {
					if($("#dldrop_"+split[1]+" .SelectItem").filter(":visible") != $("#dldrop_"+split[1]+" .SelectItem").last()) {
						$("#dldrop_"+split[1]+" .SelectItem").filter(":visible").css({
							'border-bottom': 'none'
						});
						$prevString = $("#dldrop_"+split[1]+" .SelectItem");
					}
				} else {
					if($prevString) {
						$prevString.css({
							'border-bottom': ''
						});
					}
				}

        if( $( "#dldrop_"+split[1] ).is( ":hidden" ) ) {

	  		} else {
					$("#dldrop_"+split[1]+" .SelectItem").off('click');
					$("#dldrop_"+split[1]+" .SelectItem").click(function(){
						selection=$(this).text();
						if($('#dlholder_'+split[1]).siblings(selectNode).val() != selection) {
							$('#dlholder_'+split[1]+' #dltext input').val(selection);
							$('#dlholder_'+split[1]).siblings(selectNode).val(selection);
								}
							result = $('#dlholder_'+split[1]).siblings(selectNode).val();
							$( "#dldrop_"+split[1] ).slideUp( options.speed );
							return false;
						});
				}
			});
			
			$('#dlholder_'+rand).click(function(){
					var split=this.id.split("_");
					$('.dListdrop').each(function(){
						if(this.id!="dldrop_"+split[1]&&$('#'+this.id).is(":visible"))
						{
							$("#"+this.id).slideUp();
						}
					});
					
					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) )
					{
						
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).addClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideDown( options.speed, function() {
						});
					} 
					else 
					{
						$("#dldrop_"+split[1]+" .SelectItem").each(function(){
							$(this).removeClass('dlithov');
						});
						$( "#dldrop_"+split[1] ).slideUp( options.speed );
					}
					
					if($("#dldrop_"+split[1]+" .SelectItem").filter(":visible").length <= 1) {
						if($("#dldrop_"+split[1]+" .SelectItem").filter(":visible") != $("#dldrop_"+split[1]+" .SelectItem").last()) {
							$("#dldrop_"+split[1]+" .SelectItem").filter(":visible").css({
							'border-bottom': 'none'
							});
							$prevString = $("#dldrop_"+split[1]+" .SelectItem").index();
						} 
					} else {
						if($prevString) {
							$prevString.css({
								'border-bottom': ''
							});
						}
					}

					if( $( "#dldrop_"+split[1] ).is( ":hidden" ) ) {
					} else {

						$("#dldrop_"+split[1]+" .SelectItem").off('click');
						$("#dldrop_"+split[1]+" .SelectItem").click(function(){
							var selection=$(this).text();
							if($('#dlholder_'+split[1]).siblings(selectNode).val() != selection) {
								$('#dlholder_'+split[1]+' #dltext input').val('');
								$('#dlholder_'+split[1]+' #dltext input').val(selection);
								$('#dlholder_'+split[1]).siblings(selectNode).val(selection);
								}
							result = $('#dlholder_'+split[1]).siblings(selectNode).val();
							$( "#dldrop_"+split[1] ).slideUp( options.speed );
							return false;
						});

						$('#dlholder_'+split[1]+' #dltext input').off('click');
						$('#dlholder_'+split[1]+' #dltext input').keyup(function(e){
							if(e.keyCode == 13) {
								var selection = $(this).val();
								var select = selectNode;
								var option = document.createElement("option");
								option.text = selection;
								select.add(option);
								$('#dlholder_'+split[1]).siblings(selectNode).val(selection);
								result = $('#dlholder_'+split[1]).siblings(selectNode).val();
								$(this).blur();
							}
							return false;
						});
					}

			});
			
		}
		
		
		
 };
  
  
   $.fn.dropList = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('dropList')) return;

           // pass options to plugin constructor
           var dropList = new DropList(this, options);

           // Store plugin object in this element's data
           element.data('dropList', dropList);

       });
   };
})(jQuery);
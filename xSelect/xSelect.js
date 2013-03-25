/*
	xSelect v1.2
	QQ:971546
*/
(function($){
	$.fn.xSelect = function(opts){
		if(!$(this).size() || $(this).parent('.xSelect').size())return false;
		var $isIE6 = (!window.XMLHttpRequest) ? true : false;
		$(this).each(function(i){
            $(this).wrap('<div class="xSelect"></div>');
            var $xSelect, $opt, tmp = {}, DOM = '', selected_idx;
			$opt = $.extend({size:10}, opts);
            selected_idx = this.selectedIndex; //default selected
			$xSelect = $(this).parent();
			tmp.v = $(this).val();
			tmp.id = $(this).attr('id');
			tmp.name = $(this).attr('name');
			tmp.height = $(this).height();
			tmp.width = $(this).outerWidth();
			if(tmp.width<51)tmp.width=50;
			tmp.text = $('option', this).eq(selected_idx).text();
			tmp.size = $('option', this).size();
			$(this).hide();
			DOM = '<span class="xSelectToggle"></span><input type="hidden" name="'+ tmp.name +'" id="'+ tmp.id +'" value="'+ tmp.v +'"/>';
			DOM += '<input type="text" class="xSelectInput" readonly="readonly" name="xSelect@'+ tmp.name +'" id="xSelect@'+ tmp.id +'" value="'+ tmp.text +'"/>';
			DOM += '<ul class="xSelectList">';
			$('option', this).each(function(j){
				DOM += '<li v="'+ $(this).attr('value') +'" title="'+ $(this).text() +'">'+ $(this).text() +'</li>';
			});
			DOM += '</ul>';
			$(DOM).insertAfter(this);
			$(this).attr('id', 'xSelect_'+ $(this).attr('id'));
			$(this).attr('name', 'xSelect_'+ $(this).attr('name'));
			tmp.liHeight = $('.xSelectList li', $xSelect).outerHeight();
			if(tmp.size>$opt.size)$('.xSelectList', $xSelect).addClass('xSelectListScroll').css({height:parseInt(tmp.liHeight*$opt.size)});
			$('.xSelectInput', $xSelect).css({width:parseInt(tmp.width-24)});
			$xSelect.mouseenter(function(){
				$(this).addClass('xSelectHover');
			}).mouseleave(function(){
				$(this).removeClass('xSelectHover');
			});
			$('.xSelectList li', $xSelect).click(function(){
				var $p = $(this).parent();
				var $pp = $p.parent();
				$p.find('li').removeClass('selected');
				$(this).addClass('selected');
				$('input[type=text]', $pp).val($(this).text());
				$('input[type=hidden]', $pp).val($(this).attr('v'));
				var $event = $('select',$pp).attr('event');
				if($event)eval($event);
			}).hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			}).eq(selected_idx).addClass('selected');

            var inputWidth = parseInt(tmp.width),
                ulWidth = parseInt($('.xSelectList li', $xSelect).outerWidth()),
                listWidth = 0;
            // 滚动时加滚动条宽度.
            if($('.xSelectList', $xSelect).hasClass('xSelectListScroll')){
                if(!$.browser.msie){
                    listWidth = ulWidth + 17 + 18;
                }else{
                    listWidth = ulWidth + 16;
                };
            }else{
                listWidth = ulWidth;
            };
			$xSelect.click(function(){
				if($(this).hasClass('xSelectExpand')){
					$(this).removeClass('xSelectExpand');
					return false;
				}else{
					$('.xSelect').removeClass('xSelectExpand');
					$(this).addClass('xSelectExpand');
                    // 比较select，ul宽度，设置selectt宽度 (最小为select宽度，最大为内容宽度)
					if(inputWidth > listWidth){
                        $('.xSelectList', this).css({width: $(this).width()});
                    }else{
                        $('.xSelectList', this).css({width: listWidth});
                    }
					return false;
				};
			});
			$(document).bind('click', function(){
				$('.xSelect').removeClass('xSelectExpand');
			});
		});
		return this;
	};
    $(".rawSelect").xSelect();
})(jQuery);

var ScrollinPage = {

	init: function() {
		this.backToTopDiv();
		this.bindUIActions();
	},

	bindUIActions: function() {

		$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},800);
		});	

		$(".link").click(function() {
			scroll = $(this).data('scroll');
		    ScrollinPage.scrollToAnchor(scroll);
		});
  	},

  	backToTopDiv: function() {

  		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$('#toTop').fadeIn();	
			} else {
				$('#toTop').fadeOut();
			}
		});
  	},

  	scrollToAnchor: function(aid) {

  		var aTag = $("#"+aid);
		$('html,body').animate({scrollTop: aTag.offset().top},'slow');
  	}

}
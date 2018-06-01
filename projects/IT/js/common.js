$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	try {
	  		$.browserSelector();
	  		if($("html").hasClass("chrome")) {
	  			$.smoothScroll();
	  		}
	  	} catch(err) {

	  	};

	jQuery(document).ready(function($) {
			// window.requestFullScreen();
	  	// disable preloader
	  	$("#preloader").fadeOut("fast");


	  	var waypoint1 = new Waypoint({
	  		element: document.getElementById('main_menu'),
	  		handler: function(direction) {
	  			$("#menu_welcome").addClass("animateFadeInLeft").css("opacity", "1");
	  		},
	  		offset: '75%'
	  	});
	  	var waypoint2 = new Waypoint({
	  		element: document.getElementById('menu_welcome'),
	  		handler: function(direction) {
	  			$(".item").addClass("animateFadeIn").css("opacity", "1");
	  		},
	  		offset: '40%'
	  	});

	  	
        // $('#myCarousel').carousel({
        //         interval: 5000
        // });

        // $('#carousel-text').html($('#slide-content-0').html());

        // //Handles the carousel thumbnails
        // $('[id^=carousel-selector-]').click( function(){
        //         var id_selector = $(this).attr("id");
        //         var id = id_selector.substr(id_selector.length -1);
        //         var id = parseInt(id);
        //         $('#myCarousel').carousel(id);
        // });


        // // When the carousel slides, auto update the text
        // $('#myCarousel').on('slid', function (e) {
        //         var id = $('.item.active').data('slide-number');
        //         $('#carousel-text').html($('#slide-content-'+id).html());
        // });
      });

});

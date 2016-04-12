var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
var isHomepage = $(".block--hp-first").length > 0;

/* HEADER NAVIGATION DISAPPEAR WHEN SCROLL DOWN */
var lastScrollPos = 0;
var $nav = $(".fullpage-nav");
$(window).on('scroll touchmove', function(event) {
    var currentScrollPos = $(this).scrollTop();
    if (currentScrollPos > lastScrollPos && currentScrollPos > 100) { // if scrolling down
        $nav.addClass("hide");
    } else if (currentScrollPos <= 100) { // if near top section
        $nav.removeClass("hide").removeClass("background");
    } else { // if scrolling up
        $nav.removeClass("hide").addClass("background");
    }
    lastScrollPos = currentScrollPos;
});

/* CHEVRON IN FIRST HOMEPAGE SECTION */
$(".scroll").on("click", function() {
    $("body").animate({
        scrollTop: $(".block--hp-current-clients").offset().top
    }, 2000);
});

/* FADE CONTENT IN ON SCROLL */
$(window).on('scroll touchmove', function(event) {
	$(".hideUntilScroll").each(function(i){
		var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object ){
            $(this).addClass("fadeInLeft");
        }
	});
});

$("#youtubePlayer").hide();

// Take a tour video
if ($("#youtubePlayer").length > 0) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Replace the 'ytplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('youtubePlayer', {
            videoId: 'Mpa6K6iR5Eo',
            playerVars: { "showinfo": 0, "controls": 0, "autoplay": 0, "modestbranding": 1, "playsinline": 0, "rel": 0 },
        });
    }
}

$("#take-a-tour").on("click", function () {
    $("#youtubePlayer").fadeIn();
    if (!(/iPad|iPhone|iPod/.test(navigator.platform))) {
        player.playVideo();
    }
    $("#closePlayer").show();
});

$("#closePlayer").on("click", function() {
    player.pauseVideo();
    $("#youtubePlayer").fadeOut();
    $(this).hide();
});

if (isHomepage){
	/* LOAD VIDEOS ON DESKTOP ONLY */
	$(window).load(function(){
		if (isMobile){
			$(".block--hp-first").css("background-image", "url('/img/sections/agility-frame.jpg')")
			$(".block--hp-commercial-ability").css("background-image", "url('/img/sections/commercial-frame.jpg')")
		} else {
			$("#agility-video source").eq(0).attr("src", "/video/agility.mp4");
			$("#agility-video").eq(0).load();

			$("#commercial-video source").eq(0).attr("src", "/video/commercial.mp4");
			$("#commercial-video").eq(0).load();
		}
	});

	/* DEXTERITY FRAMES */
	for (var i=1; i<72; i++){
		$("#frames").append("<li class='frame' style='display: none; background-image: url(\"/img/frames/"+i+".jpg\");''/>")
	}

	$(".frame").hide();

	$(window).load(function(){
		var $dexterity = $(".block--hp-dexterity");
		var dexterityHeight = $dexterity.outerHeight();
		var dexTop = $dexterity.offset().top;
		var dexBottom = dexTop + dexterityHeight;
		var increment = ($dexterity.outerHeight() * 2) / 72;

		function switchFrame(frame) {
			$('.frame').hide();
			$('.frame').eq(frame).show();
		}

		function updateFrame(){
			var scrollPosTop = $(window).scrollTop();
			var scrollPosBottom = $(window).scrollTop() + dexterityHeight;

			if (scrollPosBottom > dexTop && scrollPosTop < dexBottom){
				var relativePos = Math.floor(scrollPosBottom - dexTop);
				var frame = Math.floor(relativePos / increment);
				switchFrame(frame);
			}
		}

	    $(window).on('scroll touchmove', function(event) {
	    	updateFrame();
	    });

	    updateFrame();
	});

	/* OUR WORK OVERLAY/UNDERLAY */
	var $content = $(".block--hp-our-work");
	var $contentAbove = $(".block--hp-dexterity");
	var $overlay = $(".overlay");
	var $underlay = $(".underlay");

	function updateParallax(currentScroll){
		if ($content.length) {
		    $content.height($overlay.outerHeight() + $underlay.height(), 500);

		    if (($overlay.offset().top <= (currentScroll + $contentAbove.outerHeight())) &&
		        !($underlay.offset().top + $underlay.outerHeight() <= (currentScroll))) {
		        $underlay.addClass('show');
		    } else {
		        $underlay.removeClass('show');
		    };

		    if (!(($overlay.offset().top + $overlay.find('img').outerHeight()) >= (currentScroll))) {
		        $underlay.addClass('return-scroll');
		        $underlay.addClass('show');
		    } else {
		        $underlay.removeClass('return-scroll');
		    };
		}
	}

	$(window).load(function(){
		updateParallax($(this).scrollTop());

		$(window).on('scroll touchmove', function(event){
			updateParallax($(this).scrollTop());
		});
	});
}

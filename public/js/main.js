var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
var isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
var isHomepage = $(".block--hp-first").length > 0;

// slim header when scroll down
$(window).on('scroll touchmove', function(event) {
	var currentScroll = $(window).scrollTop();
	(currentScroll > 50) ? $("header").addClass("slim") : $("header").removeClass("slim");
});

// make content take header height into account as it's position: absolute
$(".block").eq(0).css("padding-top", $("header").outerHeight());
$(window).resize(function(){
	$(".block").eq(0).css("padding-top", $("header").outerHeight());
});

// highlight current page in nav
var pageName = window.location.pathname;
$("header li a").each(function(element){
	if ($(this).attr("href") == pageName)
		$(this).addClass("active");
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
	var $ourClients = $(".block--hp-current-clients");
	var $overlay = $(".overlay");
	var $underlay = $(".underlay");
	var $work = $(".work");

	function updateParallax(currentScroll){
		if ($content.length) {
			$work.css("padding-top", $("header").outerHeight());
		    $content.height($overlay.outerHeight() + $underlay.height() + $("header").height(), 500);

		    if (($overlay.offset().top <= (currentScroll + $contentAbove.outerHeight())) &&
		        !($underlay.offset().top + $underlay.outerHeight() <= (currentScroll))) {
		        $underlay.addClass('show');
		    	$ourClients.css("z-index", "-10");
		    } else {
		        $underlay.removeClass('show');
		    };

		    if (!(($overlay.offset().top + $overlay.find('img').outerHeight()) >= (currentScroll))) {
		        $underlay.addClass('return-scroll');
		        $underlay.addClass('show');
		    } else {
		        $underlay.removeClass('return-scroll');
		        $ourClients.css("z-index", "0");
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

// work page grid
$(window).load(function(){
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	$('.grid').masonry("layout");
});

// burger icon
$(".burger").click(function(){
	$(".menu").addClass("open");
	$(".menu li").each(function(i, element){
		setTimeout(function(){
			$(element).addClass("fadeInLeft");
		}, i * 100);
	});
	$(".burger").fadeOut(30);
});
$(".fa-times").click(function(){
	$(".menu").removeClass("open");
	$(".menu li").each(function(i, element){
		$(element).removeClass("fadeInLeft");
	});
	$(".burger").fadeIn(30);
});

// blog post meta sticky
if ($(".block--blogpost-meta").length > 0){
	if ($(window).width() > 749){
		$(".block--blogpost-meta").sticky({
			topSpacing: 125,
			bottomSpacing: $(document).height() - $(".block--blogpost-content").children().last().offset().top - $(".block--blogpost-content").children().last().outerHeight()
		});
	}
}

// estimated time to read for blog articles
var wordcount = $(".block--blogpost-content").text().split(" ").length;
$(".wordcount").text(wordcount);
$(".esttime").text(Math.round(wordcount / 200));

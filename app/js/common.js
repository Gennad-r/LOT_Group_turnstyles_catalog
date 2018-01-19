

$(document).ready(function () {
	// body...


//scroll to
$('.menu a, #to-contacts, .to-top').bind('click', function(e) {
	e.preventDefault(); // prevent hard jump, the default behavior
	$(".hamburger--elastic").removeClass("is-active");
	$(".menu").removeClass("clicked");
	var target = $(this).attr("href") || $(this).attr("data"), // Set the target as variable
		pos = $(target).offset().top; // navigation panel heigth
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({
		scrollTop: pos
	}, 600/*, function() {
			location.hash = target; //attach the hash (#jumptarget) to the pageurl
		}*/);

	return false;
});


//to top
$(window).on("scroll", function () {
	if ( window.scrollY >= window.innerHeight * 0.8 ) {
			$('.to-top').addClass('s-scrolled');
		} else {
			$('.to-top').removeClass('s-scrolled');
		}
});


// hamburger menu
	$('.hamburger--elastic').click(function () {
			$(this).toggleClass("is-active");
			$(".menu").toggleClass("clicked");
	});


// show more positions in products
function prodView(n) {
	$(".production-item").each(function (index) {
		if (index > n) {
			$(this).hide();
		}
	});
}
prodView(5);
$("#show-more").on("click", function () {
	if (($("#show-more").text() == "Посмотреть полный каталог") && ($(".production-item").length > 6)) {
		$(".production-item").show();
		$("#show-more").text("Скрыть");
	} 
	else if ($("#show-more").text() == "Скрыть") {
		prodView(5);
		$("#show-more").text("Посмотреть полный каталог");
	}
});


//OWL Carousel options
$(".owl-carousel-projects").owlCarousel({
	loop:true,
	autoplay:true,
	nav:true,
	navText:['назад','вперед'],
	margin:30,
	responsiveClass:true,
	autoplayHoverPause: true,
	responsive:{
		0:{
			nav:false,
			slideBy:1,
			items:1,
		},
		
		768:{
			slideBy:3,
			items:3,
		}
	}
});

/*$(".owl-carousel-rewiews").owlCarousel({
	loop: true,
	autoplay:true,
	items: 1,
	margin: 60,
	//nav: true
});*/


//E-mail Ajax Send

$("#call-action").submit(function() { //Change
		var th = $(this);
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
			$("input[name='customer-country']").attr('value', data.country_name);
			$("input[name='customer-ip']").attr('value', data.ip);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$("#myModalLabel").html("Спасибо!");
				$("#call-action .modal-body").html("Ваша анкета отправлена менеджеру");
				$("#call-action .modal-footer").hide();
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
		});
	return false;
});

$("#product-form").submit(function() { //Change
		var th = $(this);
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
			$("input[name='customer-country']").attr('value', data.country_name);
			$("input[name='customer-ip']").attr('value', data.ip);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$("#product-form .modal-title").html("Спасибо!");
				$("#product-form .modal-body").html("Ваше обращение отправлено менеджеру");
				$("#product-form .modal-footer").hide();
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
		});
	return false;
});

$("#contacts-form").submit(function() { //Change
		var th = $(this);
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
			$("input[name='customer-country']").attr('value', data.country_name);
			$("input[name='customer-ip']").attr('value', data.ip);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$("#contacts-form").html("<h3>Спасибо!</h3><p>Ваше обращение принято.</p>");
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
		});
	return false;
});



//Products

$(".item-info-button").click(function() {
		$("#product-modal").modal("show");
		var productName, prodDescription, imgAlt, imgSrc;
		productName = $($(this)).parents().siblings("h3").text();
		prodDescription = $($(this)).parents().siblings("p").text();
		imgAlt = $($(this)).parents().siblings(".production-item__image-holder").children('img').attr("alt");
		imgSrc = $($(this)).parents().siblings(".production-item__image-holder").children('img').attr("src");
		$("#product-form .modal-title").text(productName);
		$("#product-form p").text(prodDescription);
		$("#product-form img").attr('src', imgSrc);
		$("#product-form img").attr('alt', imgAlt);
		$("#product-form input[name='Product_name']").val(productName);


});


});

// Google Maps
function initMap() {
	var uluru = {lat: 50.001089, lng: 36.206014};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: uluru
	});
	var image = "../img/map-marker.png"
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: image
	});
}
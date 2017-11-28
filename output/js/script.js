$( document ).ready(function() {
    var windowEl = $(window);
    var bodyEl = $('body');
    var headerEl = $('.header');
    var windowH = windowEl.height();
    var windowW = windowEl.width();
    var menuBtn = $('#menu-btn');
    var menuClose = $('#close-menu');
    var menuEl = $('#menu-el');
    var menuSpyEl = $('.menu-spy');
    windowEl.resize(function() {
        windowW = windowEl.width();
        windowH = windowEl.height();
    });

    //window scroll
    windowEl.scroll(function() {
        var scroll = windowEl.scrollTop();
        //fixed menu
        if ((scroll > 200)&&(windowW > 1024)) {
            headerEl.addClass("fixed");
        } else {
            headerEl.removeClass("fixed");
        };
    });
    $('.main-slider__select,#bottom-select').styler();

    //clean slider
    $('.how-clean__info-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        dots: false,
        swipe: false,
        infinite: false,
        asNavFor: '.how-clean__tab-slider'
    });
    $('.how-clean__tab-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.how-clean__info-slider',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                }
            },{
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '24px',
                    centerMode: true,
                }
            }
        ]
    });
    //testim slider
    $('.testim__slider').slick({
        speed: 500,
        slidesToShow: 2,
        dots: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    swipe: true,
                    arrows: false,
                }
            }
        ]
    });
    //video ended
    $('.main-slider__video-el').on('ended',function () {
        $(this).parent().hide();
    });
    //smooth scroll
    var scrOffset = 110;
    if (windowW <= 1024) scrOffset = 0;
    $('.header__nav ul a,.sm-scr').click(function(event){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - scrOffset
        }, 500);
        closeMenu();
        event.preventDefault();
    });
    //mobile menu
    menuBtn.on('click',function () {
        menuEl.addClass('opened');
        menuBtn.addClass('hidden');
    });
    menuClose.on('click',function () {
        closeMenu();
    });
    function closeMenu() {
        menuEl.removeClass('opened');
        menuBtn.removeClass('hidden');
    };

    //popup close
    function closePopup() {
        $('.lity-close').click();
    };
    $('.close-popup').on('click',function () {
        closePopup();
    });
    //success
    function openSuccess() {
        $('#open-success-popup').click();
    };
    //services expand
    $('.services__item-container').on('click',function () {
        $(this).toggleClass('opened').children('.services__item-descr').stop().slideToggle(500);
    });
    //faq expand
    $('.faq__item-btn').on('click',function () {
        $(this).toggleClass('active').next().stop().slideToggle(500);
    });
    //clean images
    $('.how-clean__info-list li').on('click',function () {
        var thisEl = $(this);
        var thisIndex = thisEl.index();
        thisEl.addClass('active').siblings().removeClass('active');
        thisEl.parent().prev().children().eq(thisIndex).addClass('active').siblings().removeClass('active');
    });
    $('.how-clean__info-list').on('click',function (e) {
        var thisEl = $(this);
        if (this == e.target) {
            thisEl.children().removeClass('active');
            thisEl.prev().children().removeClass('active');
        };
    });
    //bottom form step
    function bottomStep2(val) {
      $('.bottom-form__container').addClass('step2').find('#bottom-next').attr('data-freq',val);

    };
    $('#bottom-btn').on('click',function () {
       var freq = $(this).attr('data-freq');
        bottomStep2(freq);
    });
    $('#bottom-select').on('change',function () {
        var freq = $(this).val();
        bottomStep2(freq);
    });

    //menu spy
    function menuSpy($el) {
        var thisEl = $el;
        var thisOffset = thisEl.offset().top - 115;
        var thisH = thisEl.height();
        var thisScrEnd = thisOffset + thisH;
        var thisId = thisEl.attr('id');
        var thisMenuEl = menuEl.find('a[href="#'+ thisId +'"]');
        var activeCl = 'current';
        var visibleCl = 'visible';
        windowEl.scroll(function() {
            scroll = windowEl.scrollTop();
            if ((scroll >= thisOffset)&&(scroll <= thisScrEnd)) {
                thisMenuEl.addClass(activeCl);
                thisEl.addClass(visibleCl);
            } else {
                thisMenuEl.removeClass(activeCl);
                thisEl.removeClass(visibleCl);
            };
        });
    };
    menuSpyEl.each(function () {
        menuSpy($(this));
    });
    //form page
    $('#book-btn').on('click',function () {
        $('#bottom-form').find('.main-form__next').attr('data-id','book button')
    });
    $('.main-form__next').on('click',function () {
       var thisEl = $(this);
       var thisId = thisEl.attr('data-id');
       var country = thisEl.siblings('.location').children('.location').val();
       var size = thisEl.siblings('.size').children('.size').val();
       var type = thisEl.siblings('.type').children('.type').val();
       var freq = thisEl.attr('data-freq');
       localStorage.setItem('formId', thisId);
       localStorage.setItem('country', country);
       localStorage.setItem('size', size);
       localStorage.setItem('type', type);
       localStorage.setItem('freq', freq);
    });

    var formEl = $('#form-home');
    if (formEl.length) {
        var currentDate = new Date();
        $('#calendar').datepicker({ dateFormat: 'mm-dd-yy',
            minDate: currentDate,
            onSelect: function(dateText) {
                 $('#form-date').val(dateText);
            }
        });
        //set params
        $('#form-id').val(localStorage.getItem('formId'));
        $('#form-country').val(localStorage.getItem('country'));
        $('#form-size').val(localStorage.getItem('size'));
        $('#form-type').val(localStorage.getItem('type'));
        var freqVal = localStorage.getItem('freq');
        if (freqVal) {
            $('.form-page__freq-item input').each(function () {
                var thisEl = $(this);
                var thisVal = thisEl.val();
                if (freqVal == thisVal) {
                    thisEl.prop('checked',true);
                };
            });
        };
        //form page next
        $('#form-next').on('click',function () {
            formEl.addClass('step2');
        });
    };
    //form ajax
    $('form').submit(function (e) {
        var thisForm = $(this);
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: 'mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function ( data ) {
                openSuccess();
                thisForm[0].reset();
                submitBtn.prop("disabled", false);
            }, error: function() {
                alert('Something went wrong!');
                submitBtn.prop("disabled", false);
            }
        });
        e.preventDefault();
    });
    //map
    if ($('#map').length) {
        google.maps.event.addDomListener(window, 'load', init);
        function init() {
            var lat = 35.03;
            var long = -116.15;
            var zoom = 6;
            if (windowW < 768) {
                lat = 36.53;
                long = -118.55;
                zoom = 5;
            }
            var mapOptions = {
                zoom: zoom,
                center: new google.maps.LatLng(lat, long),
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#71d6ff"
                            },
                            {
                                "saturation": 100
                            },
                            {
                                "lightness": -5
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ffffff"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "hue": "#ffffff"
                            },
                            {
                                "saturation": 0
                            },
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#deecec"
                            },
                            {
                                "saturation": -73
                            },
                            {
                                "lightness": 72
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "hue": "#bababa"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 25
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#e3e3e3"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 0
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ffffff"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "hue": "#59cfff"
                            },
                            {
                                "saturation": 100
                            },
                            {
                                "lightness": 34
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
            };
            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var pinIcon = {
                url: "img/map-pin.svg",
                size: new google.maps.Size(45, 85),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(25, 75)
            };
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(34.0522342,-118.2436849),
                map: map,
                title: 'CLN',
                icon: pinIcon
            });
            var marker1 = new google.maps.Marker({
                position: new google.maps.LatLng(32.715738, -117.1610838),
                map: map,
                title: 'CLN',
                icon: pinIcon
            });
            var marker2 = new google.maps.Marker({
                position: new google.maps.LatLng(37.7749295,-122.4194155),
                map: map,
                title: 'CLN',
                icon: pinIcon
            });
            var marker3 = new google.maps.Marker({
                position: new google.maps.LatLng(33.7174708, -117.8311428),
                map: map,
                title: 'CLN',
                icon: pinIcon
            });
        };
    };

});


//Scripts

//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
// scroll body to 0px on click
$('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

//Carousel responsive
$(function () {

    var jcarousel = $('.jcarousel');

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 991) {
                width = width / 2;
            } else if (width >= 767) {
                width = width;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 8000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

//Match Height
    $(function () {
        $('.ideas-item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
        $('.grid-item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
        $('.item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });

// init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        getSortData: {
            day: '.day',
            popular: '.popular',
            number: '.number parseInt',
            category: '[data-category]',
            weight: function (itemElem) {
                var weight = $(itemElem).find('.weight').text();
                return parseFloat(weight.replace(/[\(\)]/g, ''));
            }
        }
    });

// filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

// bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({filter: filterValue});
    });

// bind sort button click
    $('#sorts').on('click', 'button', function () {
        var sortByValue = $(this).attr('data-sort-by');
        $grid.isotope({sortBy: sortByValue});
    });

// change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


//Timer
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector(".days");
        var hoursSpan = clock.querySelector(".hours");
        var minutesSpan = clock.querySelector(".minutes");
        var secondsSpan = clock.querySelector(".seconds");
        console.log(this);
        document.querySelector(".before").querySelector(".end").innerHTML = endtime.substr(3, 2) + "." + endtime.substr(0, 2) + "." + endtime.substr(-2);

        function updateClock() {
            var t = getTimeRemaining(endtime);

            if (t.total <= 0) {
                document.getElementById(id).className = "hidden";
                document.querySelector(".before").querySelector(".end").innerHTML = endtime.substr(3, 2) + "." + endtime.substr(0, 2) + "." + endtime.substr(-2);
                clearInterval(timeinterval);
                return true;
            }

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    initializeClock('clockdiv-1', "02-14-2019");
    initializeClock('clockdiv-2', "04-31-2019");
    initializeClock('clockdiv-3', "05-31-2019");

});



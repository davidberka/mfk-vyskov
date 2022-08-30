$(document).ready(function () {
    $('.topstory-carousel').slick({
        centerMode: true,
        slidesToShow: 1,
        arrows: false,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 6000,
        infinite: true,
        arrows: true,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });

    $('.social-media-carousel').slick({
        infinite: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 800,
    });
});

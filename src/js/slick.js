$(document).ready(function () {
    $('.topstory-carousel').slick({
        centerMode: true,
        slidesToShow: 1,
        arrows: false,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 800,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    dots: true,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    dots: true,
                },
            },
        ],
    });
});

$(document).ready(function () {
    $('.topstory-carousel').slick({
        centerMode: true,
        slidesToShow: 1,
        arrows: false,
        variableWidth: true,
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

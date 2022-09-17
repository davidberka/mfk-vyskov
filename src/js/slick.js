$(document).ready(function () {
    $('.topstory-carousel')
        .slick({
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
        })
        .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            if (currentSlide !== nextSlide) {
                document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
                    // timeout required or Slick will overwrite the classes
                    setTimeout(() => next.classList.add('slick-current', 'slick-center'));
                });
            }
        });

    $('.social-media-carousel').slick({
        infinite: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 800,
    });
});

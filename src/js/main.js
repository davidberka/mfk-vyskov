const menuHandler = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    const burgerMenu = document.querySelector('.burger-menu');
    const navbar = document.querySelector('.navbar');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('open');
        navbar.classList.toggle('open');

        if (!navbar.classList.contains('open')) {
            dropdownMenus.forEach((menu) => {
                if (menu.classList.contains('open')) {
                    menu.classList.remove('open');
                }
            });
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            // remove open className
            dropdownMenus.forEach((menu) => {
                if (link.parentNode != menu.parentNode) {
                    menu.classList.remove('open');
                }
            });

            // add open className to current dropdown
            const dropdownMenu = link.nextElementSibling;

            if (dropdownMenu) {
                dropdownMenu.classList.toggle('open');
            }
        });
    });
};

menuHandler();

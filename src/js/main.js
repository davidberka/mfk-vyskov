const menuHandler = () => {
    if (window.innerWidth > 992) return;

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

const tabsHandler = (filterLink, filterTab) => {
    const links = document.querySelectorAll(filterLink);
    const tabs = document.querySelectorAll(filterTab);

    if (!tabs.length || !links.length) return;

    tabs[0].style.display = 'block';

    links.forEach((link) => {
        link.addEventListener('click', function () {
            let currentLink = document.querySelector(`${filterLink}.active`);
            currentLink.className = currentLink.className.replace('active', '');
            this.classList.add('active');

            linkId = link.getAttribute('data-id');

            tabs.forEach((tab) => {
                if (tab.getAttribute('id') == linkId) {
                    tab.style.display = 'block';
                    tab.animate([{ opacity: '0' }, { opacity: '1' }], {
                        duration: 400,
                    });
                } else {
                    tab.style.display = 'none';
                }
            });
        });
    });
};

tabsHandler('.roster-type-link', '.roster-tab');
tabsHandler('.team-link', '.team-tab');

const rosterTabsHandler = (filterLink, filterTab) => {
    const links = document.querySelectorAll(filterLink);
    const tabs = document.querySelectorAll(filterTab);

    if (!tabs.length || !links.length) return;

    const allPositionsLink = document.querySelector(`${filterLink}[data-id='all']`);
    allPositionsLink.classList.add('active');

    links.forEach((filter) => {
        filter.addEventListener('click', function () {
            const linkId = filter.getAttribute('data-id');

            let current = document.querySelector(`${filterLink}.active`);
            current.className = current.className.replace(' active', '');
            this.classList.add('active');

            tabs.forEach((tab) => {
                if (tab.getAttribute('id') == linkId || linkId === 'all') {
                    tab.style.display = 'block';
                    tab.animate([{ opacity: '0' }, { opacity: '1' }], {
                        duration: 400,
                    });
                } else {
                    tab.style.display = 'none';
                }
            });
        });
    });
};

rosterTabsHandler('.position-link', '.roster-position');

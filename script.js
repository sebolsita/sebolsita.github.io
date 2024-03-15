document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const heroTitle = document.querySelector('.hero h1');
    const navbarTitle = document.querySelector('.navbar-title');
    const navbarItems = document.querySelectorAll('.navbar .nav-item');
    const footerItems = document.querySelectorAll('.navigation .icon');
    const sections = document.querySelectorAll('section');
    let allowScrollUpdate = true; // Allow scroll updates initially

    function activateNavItem(item) {
        navbarItems.forEach(nav => nav.classList.remove('active'));
        footerItems.forEach(footer => footer.classList.remove('active'));

        const href = item.getAttribute('href');
        const correspondingNav = document.querySelector(`.navbar .nav-item[href="${href}"]`);
        const correspondingFooter = document.querySelector(`.navigation .icon[href="${href}"]`);

        if (correspondingNav) correspondingNav.classList.add('active');
        if (correspondingFooter) correspondingFooter.classList.add('active');
    }

    function scrollToSection(item) {
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 240; // Adjust to your header's actual height
            const elementTop = window.scrollY + targetElement.getBoundingClientRect().top;
            const offsetPosition = elementTop - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('night-mode', modeToggle.checked);
        body.classList.toggle('day-mode', !modeToggle.checked);
    });

    [...navbarItems, ...footerItems].forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            activateNavItem(this);
            scrollToSection(this);
            allowScrollUpdate = false; // Disable scroll update temporarily

            // Re-enable scroll update after a delay to avoid immediate override
            setTimeout(() => { allowScrollUpdate = true; }, 500);
        });
    });

    window.addEventListener('scroll', () => {
        if (allowScrollUpdate) {
            let scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach(section => {
                if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    activateNavItem(document.querySelector(`.navbar .nav-item[href="#${section.id}"]`));
                }
            });
        }

        if (window.scrollY > 100) {
            navbarTitle.classList.add('visible');
        } else {
            navbarTitle.classList.remove('visible');
        }
    });
});



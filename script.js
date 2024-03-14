document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const heroTitle = document.querySelector('.hero h1');
    const navbarTitle = document.querySelector('.navbar-title');
    const allNavItems = document.querySelectorAll('.navbar .nav-item, .navigation .icon');

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('night-mode', modeToggle.checked);
        body.classList.toggle('day-mode', !modeToggle.checked);
    });

    allNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            allNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            heroTitle.addEventListener('transitionend', () => {
                if (heroTitle.style.opacity === '0') {
                    navbarTitle.style.display = 'block';
                    setTimeout(() => {
                        navbarTitle.style.opacity = '1';
                    }, 10);
                }
            }, { once: true });
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbarTitle.classList.add('visible');
            navbarTitle.classList.remove('fadeOut');
            navbarTitle.classList.add('fadeIn');
        } else {
            navbarTitle.classList.remove('visible');
            navbarTitle.classList.remove('fadeIn');
            navbarTitle.classList.add('fadeOut');
        }
    });

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the href attribute
            const targetElement = document.querySelector(targetId); // Find the corresponding section

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll
                    block: 'start' // Align to the start of the target element
                });
            }
        });
    });
});

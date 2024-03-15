document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const heroTitle = document.querySelector('.hero h1');
    const navbarTitle = document.querySelector('.navbar-title');
    const allNavItems = document.querySelectorAll('.navbar .nav-item, .navigation .icon');
    const sections = document.querySelectorAll('section');
    let userScroll = true; // Flag to track if scrolling is user-initiated

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('night-mode', modeToggle.checked);
        body.classList.toggle('day-mode', !modeToggle.checked);
    });

    allNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            userScroll = false; // User is not scrolling, clicked a nav item

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 220; // Adjust based on your header's height
                const elementTop = window.scrollY + targetElement.getBoundingClientRect().top;
                const offsetPosition = elementTop - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Immediately activate the clicked nav item
                allNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Reactivate scrollspy after a delay to allow for smooth scrolling to finish
                setTimeout(() => {
                    userScroll = true;
                }, 1000); // Delay should match the smooth scroll duration
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (userScroll) { // Only activate scrollspy if the user has manually scrolled
            let scrollPosition = window.scrollY + 200; // Adjust based on your header's height

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200; // Adjust based on your header's height
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    allNavItems.forEach(navItem => {
                        navItem.classList.remove('active');
                        if (navItem.getAttribute('href') === `#${section.id}`) {
                            navItem.classList.add('active');
                        }
                    });
                }
            });
        }

        if (window.scrollY > 100) {
            navbarTitle.classList.add('visible');
        } else {
            navbarTitle.classList.remove('visible');
        }
    });

    // Reset userScroll to true on user-initiated scroll
    window.addEventListener('wheel', () => { userScroll = true; });
    window.addEventListener('touchmove', () => { userScroll = true; });
});


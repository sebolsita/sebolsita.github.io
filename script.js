document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            body.classList.add('night-mode');
            body.classList.remove('day-mode');
        } else {
            body.classList.add('day-mode');
            body.classList.remove('night-mode');
        }
    });

    const heroTitle = document.querySelector('.hero h1');
    const navbarTitle = document.querySelector('.navbar-title'); // The title element in the navbar

    const allNavItems = document.querySelectorAll('.navbar .nav-item, .navigation .icon'); // Select items from both navbar and footer

    allNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor behavior

            allNavItems.forEach(nav => {
                nav.classList.remove('active');
            });

            this.classList.add('active');

            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translate(0, -350%)'; // Move up and out of view

            // Adjust the transition end for heroTitle to ensure it works as expected
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
});

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
    const allSections = document.querySelectorAll('.content-section');
    const allPanels = {
        '#code': document.querySelector('#code-panel'),
        '#web': document.querySelector('#web-panel'),
        '#graphics': document.querySelector('#graphics-panel'),
        '#pc-shop': document.querySelector('#pc-shop-panel'),
        '#mobile-technology': document.querySelector('#mobile-technology-panel') // Add the mobile technology panel
    };
    const heroHeader = document.querySelector('.hero');
    const workItems = document.querySelectorAll('.my-work .work-item');

    function handleHashChange() {
        const hash = window.location.hash;

        // Hide all sections and the hero header initially
        allSections.forEach(section => section.style.display = 'none');
        heroHeader.style.display = 'none';
        workItems.forEach(item => item.style.display = 'none');

        if (allPanels[hash]) {
            // Show the panel corresponding to the hash
            allPanels[hash].style.display = 'block';
        } else {
            // If hash does not correspond to any panel, show the default sections
            allSections.forEach(section => {
                if (!Object.values(allPanels).includes(section)) {
                    section.style.display = 'block';
                }
            });
            heroHeader.style.display = 'block';
            workItems.forEach(item => item.style.display = 'block');
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Also check the hash when the page loads
    handleHashChange();
});



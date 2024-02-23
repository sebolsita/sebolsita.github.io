document.addEventListener('DOMContentLoaded', (event) => {
    const heroTitle = document.querySelector('.hero h1');
    const navbarTitle = document.querySelector('.navbar-title'); // The new title element in the navbar

    // Set the initial state of the hero title
    heroTitle.style.transform = 'translate(-50%, -50%)';
    heroTitle.style.opacity = '1';

    // Event listeners for navbar items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor behavior

            // Remove 'active' class from all nav items
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });

            // Add 'active' class to clicked nav item
            this.classList.add('active');

            // Move and fade out the hero title
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translate(-50%, -100%)'; // Move up and out of view

            // Wait for the transition to end before displaying the new title
            heroTitle.addEventListener('transitionend', () => {
                // Only display the navbar title if the hero title is fully transparent
                if (heroTitle.style.opacity === '0') {
                    navbarTitle.style.display = 'block';
                    setTimeout(() => { // A slight delay to ensure a smooth transition
                        navbarTitle.style.opacity = '1';
                    }, 10);
                }
            }, { once: true }); // Ensure this event is only triggered once
        });
    });
});

// Function to add 'in-view' class to sections if needed (define this if you have such a behavior)
function checkScroll() {
    // ...your existing logic for in-view...
}

// Add scroll event listener to window if needed for checking sections in view
window.addEventListener('scroll', checkScroll);

// Call the checkScroll function to initialize which sections are in view
checkScroll();

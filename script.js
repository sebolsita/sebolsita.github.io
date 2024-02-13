document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('mode-toggle');

    toggleSwitch.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.body.classList.add('night-mode');
            document.body.classList.remove('day-mode');
        } else {
            document.body.classList.add('day-mode');
            document.body.classList.remove('night-mode');
        }
    });
});

/*HTML content is loaded before JS to ensure DOM elements are accessible*/
document.addEventListener('DOMContentLoaded', () => {

    // --- DATE & CLOCK FUNCTIONALITY ---
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    // Check if the date and clock elements exist on the page
    if (clockElement && dateElement) {
        function updateDateTime() {
            // Get the current date and time
            const now = new Date();

            // --- Update Date ---
            // Using 'en-GB' for DD/MM/YYYY format, but with full text
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-GB', dateOptions);

            // --- Update Clock ---
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');

            // Update the text content of the clock element
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Update the date and time every second (1000 milliseconds)
        setInterval(updateDateTime, 1000);

        // Run once immediately on page load to show the time without a delay
        updateDateTime();
    }


    const nav = document.getElementById('nav');
    const openButton = document.getElementById('open');
    const closeButton = document.getElementById('close');


    // Event listeners for opening the navigation menu
    openButton.addEventListener('click', () => {

        openButton.classList.add('is-clicked');

        setTimeout(() => {
            nav.classList.add('visible');
        }, 200); // Delay to allow click animation to start

        setTimeout(() => {
            openButton.classList.remove('is-clicked');
        }, 400); // Duration of the click animation
    });

    //
    closeButton.addEventListener('click', () => {
        closeButton.classList.add('is-clicked');

        setTimeout(() => {
            nav.classList.remove('visible');
        }, 200); // Delay to allow click animation to start


        setTimeout(() => {
            closeButton.classList.remove('is-clicked');
        }, 400); // Duration of the click animation
    });

    // --- PARALLAX BACKGROUND SLIDESHOW ---
    const slides = document.querySelectorAll('.parallax-bg-slide');

    // Only run the script if there are slides on the page
    if (slides.length > 0) {
        let currentSlide = 0;

        function showNextSlide() {
            // Remove 'active' class from the current slide
            slides[currentSlide].classList.remove('active');

            // Move to the next slide, looping back to the start if at the end
            currentSlide = (currentSlide + 1) % slides.length;

            // Add 'active' class to the new current slide to trigger its animation
            slides[currentSlide].classList.add('active');
        }

        // Change the slide every 5 seconds (5000 milliseconds)
        setInterval(showNextSlide, 5000);
    }

});

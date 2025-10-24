/**
 * @file script.js
 * @description Main JavaScript file for the Jo Smith Photography website.
 * This script handles global functionality including the live clock, mobile navigation toggle,
 * and the homepage's parallax background slideshow.
 * @version 1.0
 */

// Wait for the entire HTML document to be fully loaded and parsed before running any scripts.
// This prevents errors from trying to manipulate DOM elements that haven't been created yet.
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DYNAMIC DATE & CLOCK
    // ==========================================================================

    // Get references to the DOM elements where the date and clock will be displayed.
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    // This check ensures the script doesn't break on pages that don't have a clock/date element.
    if (clockElement && dateElement) {

        /**
         * Updates the date and time display in the footer.
         */
        function updateDateTime() {
            // Get the current date and time.
            const now = new Date();

            // --- Update Date ---
            // Format the date string (e.g., "Saturday, 1 October 2025").
            // 'en-GB' is used as a base for DD/MM/YYYY order, but the options override it to a long format.
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-GB', dateOptions);

            // --- Update Clock ---
            // Get hours, minutes, and seconds, ensuring each has two digits by padding with a leading '0' if needed.
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');

            // Construct the final time string and update the clock element.
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Set an interval to call the updateDateTime function every 1000 milliseconds (1 second).
        setInterval(updateDateTime, 1000);

        // Call the function once immediately on page load to prevent a 1-second delay before the clock first appears.
        updateDateTime();
    }


    // ==========================================================================
    // 2. MOBILE NAVIGATION TOGGLE
    // ==========================================================================

    // Get references to the navigation panel and its control buttons.
    const nav = document.getElementById('nav');
    const openButton = document.getElementById('open');
    const closeButton = document.getElementById('close');

    // Event listener for the "open menu" button.
    openButton.addEventListener('click', () => {
        // Trigger the button's click animation.
        openButton.classList.add('is-clicked');

        // This small delay allows the button's click animation to play before the menu starts sliding in,
        // creating a smoother visual effect.
        setTimeout(() => {
            nav.classList.add('visible');
        }, 200);

        // Remove the click class after the animation duration to reset the button's state.
        setTimeout(() => {
            openButton.classList.remove('is-clicked');
        }, 400);
    });

    // Event listener for the "close menu" button.
    closeButton.addEventListener('click', () => {
        // Trigger the button's click animation.
        closeButton.classList.add('is-clicked');

        // Delay the menu's slide-out to allow the click animation to be seen.
        setTimeout(() => {
            nav.classList.remove('visible');
        }, 200);

        // Reset the button's state after its animation is complete.
        setTimeout(() => {
            closeButton.classList.remove('is-clicked');
        }, 400);
    });


    // ==========================================================================
    // 3. PARALLAX BACKGROUND SLIDESHOW (HOMEPAGE)
    // ==========================================================================

    // Get a list of all slide elements.
    const slides = document.querySelectorAll('.parallax-bg-slide');

    // Only run this part of the script if there are slide elements on the current page.
    if (slides.length > 0) {
        let currentSlide = 0; // Tracks the index of the currently visible slide.

        /**
         * Hides the current slide and shows the next one in the sequence.
         */
        function showNextSlide() {
            // First, remove the 'active' class from the slide that is currently visible.
            slides[currentSlide].classList.remove('active');

            // Move to the next slide. The modulo operator (%) is the key here.
            // It ensures that when the counter reaches the end of the array, it loops back to 0,
            // creating an infinite, seamless loop.
            currentSlide = (currentSlide + 1) % slides.length;

            // Then, add the 'active' class to the new slide to make it visible and trigger its CSS animation.
            slides[currentSlide].classList.add('active');
        }

        // Set an interval to call the showNextSlide function every 5 seconds (5000 milliseconds).
        setInterval(showNextSlide, 5000);
    }

});
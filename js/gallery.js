/**
 * @file gallery.js
 * @description Manages the functionality for the image slideshow galleries.
 * This script is designed to handle multiple independent galleries on a single page,
 * ensuring that the controls for one gallery do not affect another.
 * @version 1.0
 */

// Wait for the entire HTML document to be fully loaded and parsed before running the script.
// This prevents errors from trying to find elements that don't exist yet.
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================================
    // 1. GALLERY INITIALIZATION
    // ==========================================================================

    // An object to store the state (current slide) and elements of each gallery.
    // Using an object with an index as a key allows us to manage multiple galleries independently.
    const galleries = {};

    // Find all gallery containers on the page.
    const galleryContainers = document.querySelectorAll('.gallery-container');

    // Loop through each found gallery container to initialize it.
    galleryContainers.forEach((container, index) => {

        // Find all the necessary elements ONLY within the current gallery container.
        const slides = container.querySelectorAll('.mySlides'); // The large images
        const dots = container.querySelectorAll('.demo');     // The thumbnail images

        // The [id^="caption-"] selector finds any <p> tag whose ID *starts with* "caption-".
        // This makes the code flexible without hardcoding a specific ID.
        const caption = container.querySelector('p[id^="caption-"]');

        // Only initialize the gallery if it actually contains slides. This prevents errors.
        if (slides.length > 0) {

            // Create a new entry in our `galleries` object using its index (0, 1, 2...) as the key.
            galleries[index] = {
                slideIndex: 1, // The current slide number (we start at 1, not 0)
                slides: slides,
                dots: dots,
                caption: caption
            };

            // Display the first slide of this specific gallery by default when the page loads.
            showSlides(1, index);
        }
    });


    // ==========================================================================
    // 2. GLOBAL FUNCTIONS
    // ==========================================================================

    // These functions are attached to the `window` object. This makes them "global",
    // which is necessary for them to be called directly from the `onclick` attributes in the HTML.

    /**
     * Moves to the next or previous slide by incrementing/decrementing the current slide index.
     * @param {number} n - The number of slides to move (e.g., 1 for next, -1 for previous).
     * @param {number} galleryIndex - The index of the gallery to control.
     */
    window.plusSlides = function (n, galleryIndex) {
        // Calculate the new slide index and then call the main display function.
        let newIndex = galleries[galleryIndex].slideIndex += n;
        showSlides(newIndex, galleryIndex);
    }

    /**
     * Jumps directly to a specific slide, typically called from a thumbnail click.
     * @param {number} n - The slide number to display (e.g., 1, 2, 3...).
     * @param {number} galleryIndex - The index of the gallery to control.
     */
    window.currentSlide = function (n, galleryIndex) {
        // The 'n' here is the absolute slide number, so we pass it directly.
        showSlides(n, galleryIndex);
    }


    // ==========================================================================
    // 3. CORE DISPLAY LOGIC
    // ==========================================================================

    /**
     * The main function that handles all the logic for displaying a specific slide.
     * @param {number} n - The target slide number.
     * @param {number} galleryIndex - The index of the gallery being controlled.
     */
    function showSlides(n, galleryIndex) {
        // Get the specific gallery's data (slides, dots, etc.) from our main object.
        const gallery = galleries[galleryIndex];
        // If for some reason the gallery doesn't exist, stop the function to prevent errors.
        if (!gallery) return;

        let i;
        let slideIndex = n;

        // --- Loop Logic ---
        // If the index goes past the last slide, loop back to the first slide.
        if (slideIndex > gallery.slides.length) {
            slideIndex = 1;
        }
        // If the index goes before the first slide, loop to the last slide.
        if (slideIndex < 1) {
            slideIndex = gallery.slides.length;
        }

        // Update the state object with the correct current slide index.
        gallery.slideIndex = slideIndex;

        // --- Reset Phase ---
        // First, hide all the large images in this gallery.
        for (i = 0; i < gallery.slides.length; i++) {
            gallery.slides[i].classList.remove("active-slide");
        }
        // And remove the "active" class from all thumbnails in this gallery.
        for (i = 0; i < gallery.dots.length; i++) {
            gallery.dots[i].classList.remove("active");
        }

        // --- Activation Phase ---
        // Display the correct large image. We use `slideIndex - 1` because arrays are 0-indexed
        // (e.g., slide #1 is at array index 0).
        gallery.slides[slideIndex - 1].classList.add("active-slide");

        // Highlight the correct thumbnail with the "active" class.
        gallery.dots[slideIndex - 1].classList.add("active");

        // --- UX Improvement ---
        // Automatically scroll the thumbnail container to keep the active thumbnail visible.
        // This provides a great user experience if there are many thumbnails.
        gallery.dots[slideIndex - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });

        // --- Caption Update ---
        // If a caption element exists for this gallery...
        if (gallery.caption) {
            // ...update its text with the `title` attribute from the active thumbnail.
            gallery.caption.innerHTML = gallery.dots[slideIndex - 1].title;
        }
    }
});
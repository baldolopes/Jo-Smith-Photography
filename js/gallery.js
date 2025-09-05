/*Image Slider*/

document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.slider-container');

    if (!sliderTrack || slides.length === 0 || !prevBtn || !nextBtn || !sliderContainer) {
        /* To ensure all elements are present on current page */
        //Avoid errors on pages without slider
        return;
    }

    // Index of the active current image
    let currentIndex = 0;

    // Function to update the slider position
    function updateSlider() {
        // Take off the active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add the active class to the current slide
        slides[currentIndex].classList.add('active');

        //Calculate the position to center the current slide
        const activeSlide = slides[currentIndex];

        //relative to the beginning of the slider container
        const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;

        // Calcul the central point of the visible slider container
        const containerCenter = sliderContainer.offsetWidth / 2;

        // Length to move is the difference the slide center and the container center

        const transformOffset = slideCenter - containerCenter;

        // Apply the transformation to the slider track
        sliderTrack.style.transform = `translateX(${-transformOffset}px)`;

    }

    //Function to show the next slide
    function nextSlide() {
        //Loop it and go back to the beginning
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    //Function to show the previous slide
    function prevSlide() {
        //Loop it and go to the end
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    //Optional: When clicking on a slide, make it active
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Initial slider setup 
    // Using a timeout to ensure DOM is fully rendered and styles are applied
    setTimeout(updateSlider, 100);

    // Re-center the slider on window resize (Crucial for responsiveness)
    window.addEventListener('resize', updateSlider);
});

/*End of Image Slider*/
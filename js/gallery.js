document.addEventListener('DOMContentLoaded', function () {
    // We create an object to hold the state for each gallery
    const galleries = {};

    // Find all gallery containers on the page
    const galleryContainers = document.querySelectorAll('.gallery-container');

    // Initialize each gallery
    galleryContainers.forEach((container, index) => {
        const slides = container.querySelectorAll('.mySlides');
        const dots = container.querySelectorAll('.demo');
        const caption = container.querySelector('p[id^="caption-"]'); // Find caption by starting text

        if (slides.length > 0) {
            galleries[index] = {
                slideIndex: 1,
                slides: slides,
                dots: dots,
                caption: caption
            };
            showSlides(1, index); // Show the first slide of each gallery
        }
    });

    // Make the functions globally available
    window.plusSlides = function (n, galleryIndex) {
        let newIndex = galleries[galleryIndex].slideIndex += n;
        showSlides(newIndex, galleryIndex);
    }

    window.currentSlide = function (n, galleryIndex) {
        showSlides(n, galleryIndex);
    }

    function showSlides(n, galleryIndex) {
        const gallery = galleries[galleryIndex];
        if (!gallery) return;

        let i;
        let slideIndex = n;

        if (slideIndex > gallery.slides.length) { slideIndex = 1 }
        if (slideIndex < 1) { slideIndex = gallery.slides.length }

        gallery.slideIndex = slideIndex; // Update the current index for this gallery

        for (i = 0; i < gallery.slides.length; i++) {
            gallery.slides[i].classList.remove("active-slide");
        }
        for (i = 0; i < gallery.dots.length; i++) {
            gallery.dots[i].classList.remove("active");
        }

        gallery.slides[slideIndex - 1].classList.add("active-slide");
        gallery.dots[slideIndex - 1].classList.add("active");

        gallery.dots[slideIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        if (gallery.caption) {
            gallery.caption.innerHTML = gallery.dots[slideIndex - 1].title;
        }
    }
});
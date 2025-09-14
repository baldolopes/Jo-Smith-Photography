// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function () {

    // Comprueba si los elementos de la galería existen en la página actual.
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) {
        return; // Si no hay galería, no se ejecuta nada.
    }

    let slideIndex = 1;
    showSlides(slideIndex);

    // Asigna las funciones al objeto global 'window' para que los 'onclick' del HTML puedan encontrarlas.
    window.plusSlides = function (n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function (n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("demo");
        const captionText = document.getElementById("caption");

        // Bucle para volver al principio o al final
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // Oculta todas las imágenes grandes
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Quita la clase "active" de todas las miniaturas
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Muestra la imagen grande correcta
        slides[slideIndex - 1].style.display = "block";

        dots[slideIndex - 1].className += " active";

        dots[slideIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        const activeImage = slides[slideIndex - 1].querySelector('img');

        // Actualiza la descripción
        captionText.innerHTML = dots[slideIndex - 1].title;
    }
});
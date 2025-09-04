/*HTML content is loaded before JS to ensure DOM elements are accessible*/
document.addEventListener('DOMContentLoaded', () => {

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
});

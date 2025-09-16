/*HTML content is loaded before JS to ensure DOM elements are accessible*/
document.addEventListener('DOMContentLoaded', () => {

    //Find the clock element in the HTML
    const clockElement = document.getElementById('clock');

    //If the clock element doesn't exist on the page, stop the script
    if (!clockElement) {
        return;
    }

    function updateClock() {
        //Get the current date and time
        const now = new Date();

        //Extract hours, minutes and seconds
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        //Format numbers to alwas have two digits
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        //Update the text content of the clock element
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    //Update the clock every second (1000 milliseconds)
    setInterval(updateClock, 1000);


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

// =======================================================
// CONTACT FORM VALIDATION LOGIC
// =======================================================

/**
 * Validates the contact form before submission.
 * Should be called on the form's 'onsubmit' event.
 * @returns {boolean} Returns true if all fields are valid, false otherwise.
 */
function validateForm() {
    let isValid = true;

    // Get field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name
    if (name === "" || name.length < 2) {
        displayError('nameError', 'Please enter your name (minimum 2 characters).');
        isValid = false;
    } else {
        clearError('nameError');
    }

    // Validate Email
    if (email === "") {
        displayError('emailError', 'Email address is required.');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        displayError('emailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError('emailError');
    }

    // Validate Message
    if (message === "" || message.length < 10) {
        displayError('messageError', 'Please write a message (minimum 10 characters).');
        isValid = false;
    } else {
        clearError('messageError');
    }

    // If the form is valid, redirect the user to the confirmation page.
    if (isValid) {
        // Optional: Disable button to prevent double clicks (good UX practice)
        document.querySelector('.submit-btn').disabled = true;

        // KEY CHANGE: Redirect to the confirmation page.
        // Assuming "confirmation.html" is in the 'pages' folder.
        window.location.href = '../pages/confirmation.html'; 
        
        // IMPORTANT: Return false to prevent the form from submitting
        // via the HTML 'action' attribute, as JavaScript is controlling navigation.
        return false; 
    }

    // Returns false if validation failed, preventing form submission.
    return isValid; 
}

/**
 * Displays an error message in the corresponding <span> element.
 * @param {string} elementId The ID of the <span> (e.g., 'nameError').
 * @param {string} message The error message to display.
 */
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Show the error
    }
}

/**
 * Clears the error message from the corresponding <span> element.
 * @param {string} elementId The ID of the <span> (e.g., 'nameError').
 */
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none'; // Hide the error
    }
}


// =======================================================
// FOOTER CLOCK LOGIC
// =======================================================

function updateClock() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const timeString = now.toLocaleTimeString('en-US', timeOptions);

    const dateElement = document.getElementById('date');
    const clockElement = document.getElementById('clock');

    if (dateElement) dateElement.textContent = dateString;
    if (clockElement) clockElement.textContent = timeString;
}

// Initialize the clock update
setInterval(updateClock, 1000);
updateClock();

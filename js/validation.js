/**
 * @file contact.js (or similar)
 * @description Contains the client-side validation logic for the contact form
 * and the functionality for the footer's dynamic clock.
 * @version 1.0
 */

// ==========================================================================
// 1. CONTACT FORM VALIDATION LOGIC
// ==========================================================================

/**
 * Validates the contact form fields before allowing submission.
 * This function should be called from the form's 'onsubmit' event in the HTML.
 * e.g., <form onsubmit="return validateForm();">
 * @returns {boolean} Returns false to prevent the default form submission,
 * as redirection is handled by JavaScript.
 */
function validateForm() {
    // Start with a "flag" variable. Assume the form is valid until a check fails.
    let isValid = true;

    // --- Get field values ---
    // .trim() is used to remove any accidental leading or trailing whitespace from the user's input.
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // A regular expression (regex) to perform a simple check for a valid email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- Validation Checks ---

    // Validate Name: Check if it's empty or too short.
    if (name === "" || name.length < 2) {
        displayError('nameError', 'Please enter your name (minimum 2 characters).');
        isValid = false; // Set the flag to false.
    } else {
        clearError('nameError'); // If valid, ensure any previous error is hidden.
    }

    // Validate Email: Check if it's empty or doesn't match the email pattern.
    if (email === "") {
        displayError('emailError', 'Email address is required.');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        displayError('emailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError('emailError');
    }

    // Validate Message: Check if it's empty or too short.
    if (message === "" || message.length < 10) {
        displayError('messageError', 'Please write a message (minimum 10 characters).');
        isValid = false;
    } else {
        clearError('messageError');
    }

    // --- Handle Submission ---

    // This block only runs if ALL the validation checks above passed.
    if (isValid) {
        // Good UX: Disable the submit button to prevent the user from clicking it multiple times.
        document.querySelector('.submit-btn').disabled = true;

        // Manually redirect the user to the confirmation page using JavaScript.
        // The path '../pages/confirmation.html' assumes this script is in a 'js' folder
        // at the same level as the 'pages' folder.
        window.location.href = '../pages/confirmation.html';

        // IMPORTANT: We must return 'false' here. This stops the browser's default
        // form submission process. Since we are handling the redirect ourselves in JavaScript,
        // we don't want the form to also try to submit to its 'action' attribute.
        return false;
    }

    // If any validation check failed, `isValid` will be false, and this return
    // statement will prevent the form from submitting.
    return isValid;
}


// ==========================================================================
// 2. ERROR HANDLING HELPER FUNCTIONS
// ==========================================================================

/**
 * Displays an error message within a specified <span> element.
 * @param {string} elementId The ID of the <span> element (e.g., 'nameError').
 * @param {string} message The error message to be displayed.
 */
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    // Safety check: only proceed if the error element actually exists.
    if (errorElement) {
        errorElement.textContent = message; // Set the error message text.
        errorElement.style.display = 'block'; // Make the <span> visible.
    }
}

/**
 * Clears an error message from a specified <span> element.
 * @param {string} elementId The ID of the <span> element (e.g., 'nameError').
 */
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = ''; // Clear the text content.
        errorElement.style.display = 'none'; // Hide the <span>.
    }
}


// ==========================================================================
// 3. DEPRECATED FOOTER CLOCK LOGIC
// ==========================================================================
// NOTE: This clock logic appears to be from an older version and might be
// duplicated by the logic in your main 'script.js' file. You may only need one.
// I have commented it for clarity.
// ==========================================================================

/**
 * Updates the date and time display in the footer.
 * This version uses 'toLocaleDateString' and 'toLocaleTimeString' for formatting.
 */
function updateClock() {
    const now = new Date();
    // Define formatting options for the date and time.
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    // Generate the formatted strings.
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const timeString = now.toLocaleTimeString('en-US', timeOptions);

    // Get references to the DOM elements.
    const dateElement = document.getElementById('date');
    const clockElement = document.getElementById('clock');

    // Update the elements, but only if they exist on the page.
    if (dateElement) dateElement.textContent = dateString;
    if (clockElement) clockElement.textContent = timeString;
}

// Set an interval to call the updateClock function every 1000 milliseconds (1 second).
// setInterval(updateClock, 1000);

// Call the function once immediately on page load to prevent a 1-second delay.
// updateClock();
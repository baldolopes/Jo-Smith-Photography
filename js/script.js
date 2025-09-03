const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () =>{
    nav.classList.remove("visible");
})

function Nav () {
    let mobileClick = document.getElementById('mobile_click');
    let mobileNav = document.querySelector('#mobile_nav');

    mobileClick.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}
Nav()


// form validation
// validation
function validateForm() {
    // Reset previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get form values
    // The trim() function in JavaScript is used to remove whitespace (spaces, tabs, and newlines) from both the beginning and the end of a string. It is often used to clean up user input or to remove unnecessary whitespace
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    // Validate name

    // Validate name
if (name === '') {
    document.getElementById('nameError').textContent = 'Name is required';
    return false;
}

// Regular expression to check if the name contains only letters
var namePattern = /^[a-zA-Z ]+$/;

if (!namePattern.test(name)) {
    document.getElementById('nameError').textContent = 'Name must contain only letters';
    return false;
}

// Counts the number of words
var wordCount = name.trim().split(/\s+/).length;

if (wordCount < 2) {
    document.getElementById('nameError').textContent = 'Name must have at least two words';
    return false;
}

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email address';
        return false;
    }

    // Validate message
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        return false;
    }

    // Form is valid, save data to local storage
    saveDataLocally(name, email, message);

    // Redirect to confirmation.html
    window.location.href = 'confirmation.html';

    return false; // Prevent the form from submitting traditionally
}

function saveDataLocally(name, email, message) {
    // Create an object to represent the form data
    var formData = {
        name: name,
        email: email,
        message: message,
    };

    // Convert the object to a JSON string and save to local storage
    localStorage.setItem('formData', JSON.stringify(formData));

}
///////////////////////////////////// returning data from local storage to confirmation page ////////////////////////////////////////

// Retrieve data from local storage
var storedData = localStorage.getItem('formData');
// Display the stored data
if (storedData) {
    var parsedData = JSON.parse(storedData);
    document.getElementById('storedName').textContent = parsedData.name;
    document.getElementById('storedEmail').textContent = parsedData.email;
    document.getElementById('storedMessage').textContent = parsedData.message;
                                                     
} else {
    document.getElementById('storedData').textContent = "No data stored.";
}

// Register/Login Form validation
// Form validation
function validateForm1() {
    // Reset previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('mobileError').textContent = '';

    // Get form values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var mobile = document.getElementById('mobile').value.trim();

    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        return false;
    }
    
    // Regular expression to check if the name contains only letters
    var namePattern = /^[a-zA-Z ]+$/;
    
    if (!namePattern.test(name)) {
        document.getElementById('nameError').textContent = 'Name must contain only letters';
        return false;
    }
    
    // Counts the number of words
    var wordCount = name.trim().split(/\s+/).length;
    
    if (wordCount < 2) {
        document.getElementById('nameError').textContent = 'Name must have at least two ajfdlkjsa; words';
        return false;
    }

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email address';
        return false;
    }

    // Validate password
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        return false;
    }
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        return false;
    }

    // Validate mobile (optional field)
    if (mobile !== '') {
        var mobileRegex = /^[0-9]{11}$/; // Allow 11 digits
        if (!mobileRegex.test(mobile)) {
            document.getElementById('mobileError').textContent = 'Mobile number must contain only digits (10-15 characters)';
            return false;
        }
    }

    // Form is valid, save data to local storage
    saveDataLocally(name, email, password, mobile);

    // Redirect to confirmation.html
    window.location.href = 'registrationconfirm.html';

    return false; // Prevent the form from submitting traditionally

    // Form is valid
    // alert('Form is valid!');
    // return true;
}

// Save data locally (optional feature for testing purposes)
function saveDataLocally(name, email, password, mobile) {
    var formData = {
        name: name,
        email: email,
        password: password,
        mobile: mobile
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Data saved to local storage!');
}

// Confirmation page: Retrieve data from local storage
var storedData = localStorage.getItem('formData');
if (storedData) {
    var parsedData = JSON.parse(storedData);
    document.getElementById('storedName').textContent = parsedData.name;
    document.getElementById('storedEmail').textContent = parsedData.email;
    document.getElementById('storedPassword').textContent = parsedData.password;
    document.getElementById('storedMobile').textContent = parsedData.mobile;
} else {
    console.log("No data stored.");
}
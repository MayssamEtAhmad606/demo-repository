
$(document).ready(function() {

    $('#showLoginForm').on('click', function(event) {
        event.preventDefault();
        $('#loginForm').show();
        $('#registerForm').hide();
    });

    $('#showRegisterForm').on('click', function(event) {
        event.preventDefault();
        $('#loginForm').hide();
        $('#registerForm').show();
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        if (username === "user" && password === "user") {
            window.location.href = "../homepage/home.html";
        } else if (username === "admin" && password === "admin") {
            window.location.href = "admin.html";
        } else {
            alert("Invalid username or password.");
        }
    });


    $('#registerForm').on('submit', function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const age = $('#age').val();
        const gender = $('#gender').val();
        const password = $('#passwordRegister').val(); 

        if (!name || !email || !age || !gender || !password) {
            alert("Please fill out all the fields.");
        } else if (!isValidEmail(email)) {
            alert("Please enter a valid email.");
        } else if (!isValidAge(age)) {
            alert("Please enter a valid age between 0 and 100.");
        } else if (!isValidPassword(password)) {
            alert("Password must be at least 8 characters long.");
        } else {
            alert("Registration successful! Name: " + name + ", Email: " + email + ", Age: " + age + ", Gender: " + gender);
            $('#registerForm')[0].reset(); 
            $('#registerForm').hide();
            $('#loginForm').show(); 
        }
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidAge(age) {
        return age >= 0 && age <= 100;
    }

    function isValidPassword(password) {
        return password.length >= 8;
    }
});

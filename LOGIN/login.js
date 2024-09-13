

    $('#showLoginForm').on('click', function(event) {
        event.preventDefault(); // stp relode auto
        $('#loginForm').show(); // affiché 
        $('#registerForm').hide(); // n'est pas affiché 
    });

    $('#showRegisterForm').on('click', function(event) {
        event.preventDefault();   // stp relode auto
        $('#loginForm').hide(); // n'est pas affiché 
        $('#registerForm').show(); // affiché 
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();  // // stop relode auto 
////// condition for next page 
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
            alert("please fill out all the fields.");
        } else if (!isValidEmail(email)) {
            alert("please enter a valid email.");
        } else if (!isValidAge(age)) {
            alert("please enter a valid age between 0 and 100.");
        } else if (!isValidPassword(password)) {
            alert("password must be at least 8 characters long.");
        } else {
            alert("registration successful! Name: " + name + ", Email: " + email + ", Age: " + age + ", Gender: " + gender);
            $('#registerForm')[0].reset(); 
            $('#registerForm').hide();
            $('#loginForm').show(); 
        }
    });

/// condition valid Age 
    function isValidAge(age) {
        return age >= 0 && age <= 100;
    }
/// condition valid password 
    function isValidPassword(password) {
        return password.length >= 8;
    }

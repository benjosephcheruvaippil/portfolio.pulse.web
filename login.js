$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if (username === '' || password === '') {
            $('#errorMessage').text('Please enter both username and password').show();
        } else {

            var isValid = Login(username, password);
            if (isValid) {
                $('#errorMessage').hide();
                window.location.href = "index.html";
            }
            else {
                $('#errorMessage').text('Username or password is incorrect').show();
            }
        }
    });
});


function Login(userName, passWord) {
    //userName=encodeURIComponent(userName)
    const url = `${CONFIG.BASE_URL}/api/auth/getToken?email=${encodeURIComponent(userName)}&password=${encodeURIComponent(passWord)}`; // Use base URL from config.js

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': `Bearer ${CONFIG.API_KEY}`, // If you have an API key or token
        },
    })
        .then(response => {
            console.log(response); // Process the API data
            // Add your logic to display data in the dashboard
            //$('#dashboard-content').html(JSON.stringify(data)); // Example of displaying the data

            if (response != null) {
                return true;
            }
            else {
                return false;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        return false;
}
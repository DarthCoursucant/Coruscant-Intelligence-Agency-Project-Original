document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello There...");

    const loginForm = document.querySelector("login-form");
    const usernameInput = document.getElementById("#username");
    const passwordInput = document.getElementById("#password");
    const loginButton = document.querySelector("submit-button");
        
    // this is the issue for login 
    // Setting default values for the username and password
    usernameInput.value = "Shmi-Skywalker";
    passwordInput.value = "Tattoine";

    const checkFormValidity = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        console.log("username: ", username, "password: ", password, "returned after validation");
        return username && password;
    };

    const updateLoginButtonOpacity = () => {
        if (checkFormValidity()) {
            loginButton.style.opacity = 1; 
        } else {
            loginButton.style.opacity = 0.5; 
        }
    };

    // Update button opacity based on default values
    updateLoginButtonOpacity();

    usernameInput.addEventListener("input", updateLoginButtonOpacity);
    passwordInput.addEventListener("input", updateLoginButtonOpacity);


    //login button login is not working 
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Login button clicked");
        console.log("General Grevious?");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("username: ", username);
        console.log("password: ", password);

        if (checkFormValidity()) {
            console.log("Roger, Roger, Please Wait");
            getToken(username, password);

        } 
        

        // Add logic to check if login usrname and password are correct
        
        else {
            console.error("Enter Username And Password You Must, Young Padawan.");
        }
    });

    async function getToken(username, password) {
        try {
            const loginData = {
                "email": username,
                "password": password
            };
            console.log("Login Data:", loginData)
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(loginData),
            };

            const response = await fetch(`https://v2.api.noroff.dev/auth/login`, options);
            console.log("Response after login:", response); 
            if (response.ok=== true) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem("username", data.data.name);
                localStorage.setItem("token", data.data.accessToken);

                window.location.href = "admin-page.html";
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});


if (response.ok == true ) {
    const data = response.json();
    console.log(data);
    localStorage.setItem("username", data.data.name);
    localStorage.setItem("token", data.data.accessToken);

    window.location.href = "admin-page.html"; 
}
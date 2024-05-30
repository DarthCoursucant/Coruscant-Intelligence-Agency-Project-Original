
document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello There...");

    const loginForm = document.querySelector("form.login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector("#login-form-button a");

    // Setting default values for the username and password
    usernameInput.value = "Shmi-Skywalker";
    passwordInput.value = "Tatooine";

    const checkFormValidity = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
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

    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("General Grevious?");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("username: ", username);
        console.log("password: ", password);

        if (checkFormValidity()) {
            console.log("Roger, Roger, Please Wait");
            getToken(username, password);
        } else {
            console.error("Enter Username And Password You Must, Young Padawan.");
        }
    });

    async function getToken(username, password) {
        try {
            const loginData = {
                email: username,
                password: password
            };

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            };

            const response = await fetch(`https://v2.api.noroff.dev/auth/login`, options);
            if (response.ok) {
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


if (response.ok) {
    const data = await response.json();
    console.log(data);
    localStorage.setItem("username", data.data.name);
    localStorage.setItem("token", data.data.accessToken);

    window.location.href = "admin.html"; 
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("Trying to sneak a peak?...");

    const loginForm = document.querySelector("form.login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = loginForm.querySelector("button[type='submit']");

    // Set default username and password
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

    loginButton.style.opacity = checkFormValidity() ? 1 : 0.5;

    usernameInput.addEventListener("input", updateLoginButtonOpacity);
    passwordInput.addEventListener("input", updateLoginButtonOpacity);

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Trying to Login, don't interrupt");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("username: ", username);
        console.log("password: ", password);

        if (username === "Shmi-Skywalker" && password === "Tatooine") {
            console.log("Heading out to get Token, One sec");
            getToken(username, password);
        } else {
            console.error("Invalid username or password. The correct username is 'Shmi-Skywalker' and the correct password is 'Tatooine'.");
            alert("Invalid username or password. Please try again.");
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

                // Redirect to admin.html
                window.location.href = "admin.html";
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});

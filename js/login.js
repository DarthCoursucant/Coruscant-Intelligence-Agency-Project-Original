
console.log("Here we go again...");

const loginForm = document.querySelector("form.login-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Trying to login");
    
    // Get username and password from the form
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    
    console.log("username: ", username);
    console.log("password: ", password);
    
    // Check if the credentials match
    if (username === "Shmi-Skywalker" && password === "Tatooine") {
        console.log("Correct credentials, going to get token");
        getToken(username);
    } else {
        console.error("Invalid username or password");
    }
});

async function getToken(username) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        };
        console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/login`, options); 
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            localStorage.setItem("username", username);
            localStorage.setItem("token", data.accessToken);
            window.location = "index.html"; // Automatic
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const mainTitleInput = document.getElementById("header-box");
        const mainTitleValue = mainTitleInput.value.trim();
        const blogTitle = mainTitleValue;

        const blogText = document.getElementById("message").value.trim();
        const tags = []; // No tags input in the provided HTML
        const pictureUrl = ""; // No picture URL input in the provided HTML
        const pictureAlt = ""; // No picture alt input in the provided HTML

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No access token found. Please login again.");
            }

            const postData = {
                title: blogTitle,
                body: blogText,
                tags: tags,
                media: {
                    url: pictureUrl,
                    alt: pictureAlt
                }
            };

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            };

            const response = await fetch("https://v2.api.noroff.dev/blog/posts/wervik", options);

            if (response.ok) {
                alert("Blog Post Created Successfully <3");
                window.location.href = "admin-page.html";
            } else {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].message);
            }

        } catch (error) {
            console.error(error.message);
            alert("Failed to Create Blog Post. Please try again.");
        }

    });

    document.getElementById("message").addEventListener("input", function() {
        const maxLength = 2000;
        const currentLength = this.value.length;
        const remaining = maxLength - currentLength;

        let counter = document.getElementById("blogTextCounter");
        if (!counter) {
            counter = document.createElement("div");
            counter.id = "blogTextCounter";
            this.parentNode.appendChild(counter);
        }
        counter.textContent = remaining + " characters remaining...";

        if (remaining < 0) {
            counter.style.color = "red";
        } else {
            counter.style.color = "";
        }

    });

});
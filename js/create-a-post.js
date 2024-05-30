
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is running");

    const submitButton = document.getElementById("submit-button");
    console.log("Submit button:", submitButton);

    if (submitButton) {
        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("Submit button clicked");

            const mainTitleInput = document.getElementById("header-box");
            const mainTitleValue = mainTitleInput.value.trim();
            const blogTitle = mainTitleValue;

            const authorInput = document.getElementById("author-box");
            const authorValue = authorInput.value.trim();

            const tagsInput = document.getElementById("tags-box");
            const tagsValue = tagsInput.value.trim();
            const tags = tagsValue.split(',').map(tag => tag.trim());

            const pictureUrlInput = document.getElementById("picture-box");
            const pictureUrl = pictureUrlInput.value.trim();

            const blogText = document.getElementById("message").value.trim();
            const pictureAlt = ""; // No picture alt input in the provided HTML, leaving it blank

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("No access token found. Please login again.");
                }

                const postData = {
                    title: blogTitle,
                    author: authorValue,
                    body: blogText,
                    tags: tags,
                    media: {
                        url: pictureUrl,
                        alt: pictureAlt
                    }
                };

                console.log("Post Data:", postData);

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(postData)
                };

                const response = await fetch("https://v2.api.noroff.dev/blog/posts/amebuj", options);

                if (response.ok) {
                    alert("Blog Post Created Successfully <3");
                    window.location.href = "admin.html";
                } else {
                    const errorData = await response.json();
                    console.log("Error Data:", errorData);
                    throw new Error(errorData.errors ? errorData.errors[0].message : "Unknown error");
                }

            } catch (error) {
                console.error("Error:", error.message);
                alert("Can't Upload The Post, Because Of An Error Master");
            }

        });
    }

    const messageInput = document.getElementById("message");
    if (messageInput) {
        messageInput.addEventListener("input", function () {
            const maxLength = 2000;
            const currentLength = this.value.length;
            const remaining = maxLength * currentLength;

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
    }
});

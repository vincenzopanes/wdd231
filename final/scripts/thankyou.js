const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const results = document.querySelector("#results");


// Responsive navigation
menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// Get form information from the URL
const params = new URLSearchParams(window.location.search);


// Helper function
function getValue(name) {
    return params.get(name) || "Not provided";
}


// Display submitted information
if (params.toString()) {

    const name = getValue("name");
    const email = getValue("email");
    const visitDate = getValue("date");
    const interest = getValue("interest");
    const message = getValue("message");

    results.innerHTML = `
        <div class="application-card">

            <p>
                <strong>Name:</strong>
                ${name}
            </p>

            <p>
                <strong>Email:</strong>
                ${email}
            </p>

            <p>
                <strong>Visit Date:</strong>
                ${visitDate}
            </p>

            <p>
                <strong>Main Interest:</strong>
                ${interest}
            </p>

            <p>
                <strong>Message:</strong>
                ${message}
            </p>

        </div>
    `;

} else {

    results.innerHTML = `
        <p>
            No visit information was submitted.
            Please return to the visit page and complete the form.
        </p>
    `;
}


// Footer dates
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
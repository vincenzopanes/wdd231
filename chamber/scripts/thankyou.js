const params = new URLSearchParams(window.location.search);

const results = document.querySelector("#results");

if (results) {
    results.innerHTML = `
        <p><strong>First Name:</strong> ${params.get("first")}</p>
        <p><strong>Last Name:</strong> ${params.get("last")}</p>
        <p><strong>Email:</strong> ${params.get("email")}</p>
        <p><strong>Mobile Phone:</strong> ${params.get("phone")}</p>
        <p><strong>Business Name:</strong> ${params.get("organization")}</p>
        <p><strong>Submitted:</strong> ${params.get("timestamp")}</p>
    `;
}
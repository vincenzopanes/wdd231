 const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

document.querySelectorAll(".open-modal").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modal = document.getElementById(link.dataset.modal);

        if (modal) {
            modal.showModal();
        }
    });
});

document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
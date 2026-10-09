const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

function getContactData() {
    return {
        id: Date.now(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        service: document.getElementById("service").value,
        message: document.getElementById("message").value.trim()
    };
}

function showSuccessMessage() {
    contactMessage.classList.remove("d-none");

    setTimeout(function () {
        contactMessage.classList.add("d-none");
    }, 3000);
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const contactData = getContactData();
    console.log("Contact Data:", contactData);

    contactForm.reset();
    showSuccessMessage();
});

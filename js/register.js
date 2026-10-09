const registerForm = document.getElementById("registerForm");
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerConfirmPassword = document.getElementById("registerConfirmPassword");
const registerMessage = document.getElementById("registerMessage");

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("nuvoraUsers")) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("nuvoraUsers", JSON.stringify(users));
}

function showMessage(message, type) {
    registerMessage.textContent = message;
    registerMessage.className = `alert alert-${type}`;
}

function emailAlreadyExists(users, email) {
    return users.some(function (user) {
        return user.email === email;
    });
}

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = registerName.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
        showMessage("Please complete all fields.", "danger");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "danger");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Password and confirmation password do not match.", "danger");
        return;
    }

    const users = getUsers();

    if (emailAlreadyExists(users, email)) {
        showMessage("This email is already registered.", "danger");
        return;
    }

    users.push({
        id: Date.now(),
        name,
        email,
        password
    });

    saveUsers(users);
    showMessage("Account created successfully. Redirecting to login...", "success");
    registerForm.reset();

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});

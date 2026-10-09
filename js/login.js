const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("nuvoraUsers")) || [];
    } catch {
        return [];
    }
}

function showMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = `alert alert-${type}`;
}

function findUser(users, email, password) {
    return users.find(function (user) {
        return user.email === email && user.password === password;
    });
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    if (!email || !password) {
        showMessage("Please enter your email and password.", "danger");
        return;
    }

    const user = findUser(getUsers(), email, password);

    if (!user) {
        showMessage("Invalid email or password.", "danger");
        return;
    }

    const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    localStorage.setItem("nuvoraCurrentUser", JSON.stringify(currentUser));
    showMessage("Login successful. Redirecting...", "success");

    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1000);
});

// Hàm đăng nhập người dùng
function loginUser(e) {
    e.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const errorSpan = document.getElementById("login-error");
    const errorBox = errorSpan.parentElement;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Login success
        localStorage.setItem("loggedInUser", email);
        window.location.href = "../Home/home.html";
    } else {
        // Login fail
        errorSpan.textContent = "Email hoặc mật khẩu sai, vui lòng thử lại!";
        errorBox.style.display = "flex";
        emailInput.classList.add("error");
        passwordInput.classList.add("error");
    }
}

window.onload = function () {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
        window.location.href = "../Home/home.html";
    }
};

function loginUser(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        window.location.href = "home.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

window.onload = function () {
    const loggedUser = localStorage.getItem("loggedInUser") || sessionStorage.getItem("loggedInUser");
    if (loggedUser) {
        window.location.href = "../Home/home.html";
    }
}

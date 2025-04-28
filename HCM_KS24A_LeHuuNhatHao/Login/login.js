// Hàm đăng nhập người dùng
function loginUser(e) {
    e.preventDefault(); // Ngăn hành động mặc định của form

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Xóa lỗi cũ (nếu có)
    document.querySelector("#login-error").textContent = "Email hoặc mật khẩu không đúng!";
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Đăng nhập thành công
        localStorage.setItem("loggedInUser", email);
        window.location.href = "../Home/home.html";
    } else {
        // Sai thông tin đăng nhập
        document.querySelector("#login-error").textContent = "Email hoặc mật khẩu sai, vui lòng thử lại!";
        emailInput.classList.add("error");
        passwordInput.classList.add("error");
    }
}

// Tự động chuyển hướng nếu đã đăng nhập
window.onload = function () {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
        window.location.href = "../Home/home.html";
    }
};

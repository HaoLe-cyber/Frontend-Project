// Khởi tạo dữ liệu mặc định để hỗ trợ test bài
function initDefaultUsers() {
    if (!localStorage.getItem("users")) {
        const defaultUsers = [
            {
                username: "admin",
                password: "Admin123",
                email: "adminaccount@gmail.com",
                adminRole: true
            },
            {
                username: "user1",
                password: "Userpassword1",
                email: "useraccount1@gmail.com",
                adminRole: false
            }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}
initDefaultUsers();

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
    const adminRole = users.find(user => user.adminRole == true);

    if (user) {
        localStorage.setItem("loggedInUser", email);
        if (user.adminRole === true) {
            window.location.href = "../category-manage/category.html";
        } else {
            window.location.href = "../Home/home.html";
        }
    }
    else {
        // Login fail
        errorSpan.textContent = "Email hoặc mật khẩu sai, vui lòng thử lại!";
        errorBox.style.display = "flex";
        emailInput.classList.add("error");
        passwordInput.classList.add("error");
    }
}

window.onload = function () {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser && adminRole == false) {
        window.location.href = "../Home/home.html";
    } else if (loggedUser && adminRole == true) {
        window.location.href = "../category-manage/category.html";
    }
};

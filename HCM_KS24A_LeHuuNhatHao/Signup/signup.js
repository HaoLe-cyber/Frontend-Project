// Gán sự kiện kiểm tra theo thời gian thực cho các trường nhập liệu
document.querySelector("#register-username").addEventListener("input", checkUsername);
document.querySelector("#register-email").addEventListener("input", checkEmail);
document.querySelector("#register-password").addEventListener("input", checkPassword);
document.querySelector("#register-confirm-password").addEventListener("input", checkConfirmPassword);

// Hàm kiểm tra tên đăng nhập
function checkUsername() {
    const usernameInput = document.querySelector("#register-username");
    const username = usernameInput.value.trim();
    const errorSpan = document.getElementById("username-error");
    const errorBox = errorSpan.parentElement;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isNameExist = users.some(user => user.username === username);

    if (isNameExist) {
        errorSpan.textContent = "Tên đăng nhập đã tồn tại!";
        errorBox.style.display = "flex";
        usernameInput.classList.add("error");
    } else {
        errorSpan.textContent = "";
        errorBox.style.display = "none";
        usernameInput.classList.remove("error");
    }
}

// Hàm kiểm tra email
function checkEmail() {
    const emailInput = document.querySelector("#register-email");
    const email = emailInput.value.trim();
    const errorSpan = document.getElementById("email-error");
    const errorBox = errorSpan.parentElement;

    if (!validateEmail(email)) {
        errorSpan.textContent = "Email không hợp lệ!";
        errorBox.style.display = "flex";
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isEmailExist = users.some(user => user.email === email);

        if (isEmailExist) {
            errorSpan.textContent = "Email đã tồn tại!";
            errorBox.style.display = "flex";
        } else {
            errorSpan.textContent = "";
            errorBox.style.display = "none";
        }
    }
}

// Hàm kiểm tra mật khẩu
function checkPassword() {
    const passwordInput = document.querySelector("#register-password");
    const password = passwordInput.value.trim();
    const errorSpan = document.getElementById("password-error");
    const errorBox = errorSpan.parentElement;

    if (!validatePassword(password)) {
        errorSpan.textContent = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.";
        errorBox.style.display = "flex";
    } else {
        errorSpan.textContent = "";
        errorBox.style.display = "none";
    }
}

// Hàm kiểm tra xác nhận mật khẩu
function checkConfirmPassword() {
    const password = document.querySelector("#register-password").value.trim();
    const confirmPassword = document.querySelector("#register-confirm-password").value.trim();
    const errorSpan = document.getElementById("confirm-password-error");
    const errorBox = errorSpan.parentElement;

    if (password !== confirmPassword) {
        errorSpan.textContent = "Mật khẩu và xác nhận mật khẩu không khớp!";
        errorBox.style.display = "flex";
    } else {
        errorSpan.textContent = "";
        errorBox.style.display = "none";
    }
}

// Hàm đăng ký người dùng
function registerUser(e) {
    e.preventDefault();

    const username = document.querySelector("#register-username").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value.trim();
    const confirmPassword = document.querySelector("#register-confirm-password").value.trim();

    // Check tất cả các trường
    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (!validatePassword(password)) {
        alert("Mật khẩu không đủ mạnh!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const isNameExist = users.some(user => user.username === username);
    const isEmailExist = users.some(user => user.email === email);

    if (isNameExist || isEmailExist) {
        alert("Tên đăng nhập hoặc email đã tồn tại!");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Quay lại đăng nhập.");
    window.location.href = "../Login/login.html";
}

// Hàm validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Hàm validate mật khẩu
function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

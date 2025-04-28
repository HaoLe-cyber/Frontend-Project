// Gán sự kiện kiểm tra theo thời gian thực cho các trường nhập liệu
document.querySelector("#register-username").addEventListener("input", checkUsername);
document.querySelector("#register-email").addEventListener("input", checkEmail);
document.querySelector("#register-password").addEventListener("input", checkPassword);
document.querySelector("#register-confirm-password").addEventListener("input", checkConfirmPassword);

// Hàm kiểm tra tên đăng nhập
function checkUsername() {
    const usernameInput = document.querySelector("#register-username");
    const username = usernameInput.value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isNameExist = users.some(user => user.username === username);

    if (isNameExist) {
        document.querySelector("#username-error").textContent = "Tên đăng nhập đã tồn tại!";
        usernameInput.classList.add("error");
    } else {
        document.querySelector("#username-error").textContent = "";
        usernameInput.classList.remove("error");
    }
}

// Hàm kiểm tra email
function checkEmail() {
    const email = document.querySelector("#register-email").value.trim();

    if (!validateEmail(email)) {
        document.querySelector("#email-error").textContent = "Email không hợp lệ!";
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isEmailExist = users.some(user => user.email === email);

        if (isEmailExist) {
            document.querySelector("#email-error").textContent = "Email đã tồn tại!";
        } else {
            document.querySelector("#email-error").textContent = "";
        }
    }
}

// Hàm kiểm tra mật khẩu
function checkPassword() {
    const password = document.querySelector("#register-password").value.trim();

    if (!validatePassword(password)) {
        document.querySelector("#password-error").textContent = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.";
    } else {
        document.querySelector("#password-error").textContent = "";
    }
}

// Hàm kiểm tra xác nhận mật khẩu
function checkConfirmPassword() {
    const password = document.querySelector("#register-password").value.trim();
    const confirmPassword = document.querySelector("#register-confirm-password").value.trim();

    if (password !== confirmPassword) {
        document.querySelector("#confirm-password-error").textContent = "Mật khẩu và xác nhận mật khẩu không khớp!";
    } else {
        document.querySelector("#confirm-password-error").textContent = "";
    }
}

// Hàm đăng ký người dùng (không thay đổi nhiều so với trước)
function registerUser(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const username = document.querySelector("#register-username").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value.trim();
    const confirmPassword = document.querySelector("#register-confirm-password").value.trim();

    // Kiểm tra điều kiện đăng ký (có thể vẫn giữ như trước)
    if (!username || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập, mật khẩu và xác nhận mật khẩu.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
    }

    if (!validatePassword(password)) {
        alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const isNameExist = users.some(user => user.username === username);
    const isEmailExist = users.some(user => user.email === email);

    if (isNameExist && isEmailExist) {
        alert("Tên đăng nhập và email đã tồn tại!");
        return;
    } else if (isNameExist) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    } else if (isEmailExist) {
        alert("Email đã tồn tại!");
        return;
    }

    users.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Quay lại đăng nhập.");
    window.location.href = "../Login/login.html";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // Ít nhất 8 ký tự, có chữ hoa, chữ thường và số
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}


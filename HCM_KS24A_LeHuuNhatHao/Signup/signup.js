function registerUser(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const username = document.querySelector("#register-username").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value.trim();
    const confirmPassword = document.querySelector("#register-confirm-password").value.trim();


    if (!username || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập, mật khẩu và xác nhận mật khẩu.");
        return;
    }

    if (password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự.");
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

    else {
        console.log("đã vào");

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }
        users.push({ username, password, email });
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công! Quay lại đăng nhập.");
        window.location.href = "../Login/login.html";
    }
}
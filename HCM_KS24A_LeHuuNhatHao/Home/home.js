function logOutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../Login/login.html";
}
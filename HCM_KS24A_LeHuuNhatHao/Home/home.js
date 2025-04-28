let tests = [];
let currentSearchTerm = "";
let currentSortOption = "";

// Gắn dữ liệu mẫu nếu localStorage trống
if (!localStorage.getItem("tests")) {
    tests = [];
    updateData();
} else {
    tests = JSON.parse(localStorage.getItem("tests"));
}

function updateData() {
    localStorage.setItem("tests", JSON.stringify(tests));
}

// DOM Elements
let ulEL = document.querySelector("#quiz-list");
let paginBoxEL = document.querySelector(".pagin_box");
let searchInput = document.querySelector(".search-bar");

// Phân trang
const urlParams = new URLSearchParams(window.location.search);
const targetPage = parseInt(urlParams.get('page')) || 1;

const maxItem = 4;
let curPage = targetPage;
let countPage = Math.ceil(tests.length / maxItem);

// Render Pagination
function renderPagin() {
    countPage = Math.ceil(tests.filter(test =>
        test.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
    ).length / maxItem);

    let paginHTML = ``;

    for (let i = 1; i <= countPage; i++) {
        paginHTML += `<li class="page-item ${i === curPage ? 'active' : ''}">
            <a class="page-link" href="?page=${i}">${i}</a></li>`;
    }

    paginBoxEL.innerHTML = `
        <li class="page-item ${curPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="?page=${Math.max(1, curPage - 1)}">‹</a></li>
        ${paginHTML}
        <li class="page-item ${curPage === countPage ? 'disabled' : ''}">
            <a class="page-link" href="?page=${Math.min(countPage, curPage + 1)}">›</a></li>
    `;
}

// Render Quiz Cards
function renderData() {
    let filteredTests = tests.filter(test =>
        test.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );

    if (currentSortOption === "asc") {
        filteredTests.sort((a, b) => a.plays - b.plays);
    } else if (currentSortOption === "desc") {
        filteredTests.sort((a, b) => b.plays - a.plays);
    }

    countPage = Math.ceil(filteredTests.length / maxItem);
    curPage = Math.min(curPage, countPage || 1);

    let data = filteredTests.slice((curPage - 1) * maxItem, curPage * maxItem);
    let ulHTML = "";

    for (let i = 0; i < data.length; i++) {
        ulHTML += `
        <div class="col-md-6 col-lg-6">
            <div class="card p-3 quiz-card">
                <div class="d-flex">
                    <img src="./8160b25e90a83127a613c90527e7cea2365c88ea.png" class="rounded me-3" alt="quiz img">
                    <div class="flex-grow-1">
                        <div class="text-muted mb-1">${data[i].name}</div>
                        <div class="fw-bold">Thời gian: ${data[i].time} phút</div>
                        <div class="text-muted">${data[i].plays} lượt chơi</div>
                    </div>
                    <div class="align-self-center">
                        <button class="quiz-btn" data-id="${i}">Chơi</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    ulEL.innerHTML = ulHTML;
    renderPagin();
}

// Sự kiện tìm kiếm
searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value;
    curPage = 1;
    renderData();
});

// Sự kiện sắp xếp
document.querySelectorAll("button[data-sort]").forEach(btn => {
    btn.addEventListener("click", () => {
        currentSortOption = btn.getAttribute("data-sort");
        renderData();
    });
});

// Bắt sự kiện nút "Chơi"
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("quiz-btn")) {
        const name = e.target.closest(".quiz-card").querySelector(".text-muted").textContent;
        alert(`Bắt đầu quiz: ${name}`);
        // window.location.href = `../PlayQuiz/quiz.html?quizName=${encodeURIComponent(name)}`;
    }
});

// Đăng xuất
function logOutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../Login/login.html";
}

renderData();

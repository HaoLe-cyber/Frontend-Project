function initDefaultTests() {
    if (!localStorage.getItem("tests")) {
        const defaultTests = [
            {
                id: 1,
                name: "Toán 1",
                category: "Toán học",
                time: 25,
                plays: 0,
                questions: [
                    { id: 1746411600001, content: "5 - 2 = ?", answers: [{ text: "3", isCorrect: true }, { text: "2", isCorrect: false }, { text: "4", isCorrect: false }] },
                    { id: 1746411600002, content: "3 x 3 = ?", answers: [{ text: "9", isCorrect: true }, { text: "6", isCorrect: false }, { text: "8", isCorrect: false }] },
                    { id: 1746411600003, content: "10 ÷ 2 = ?", answers: [{ text: "5", isCorrect: true }, { text: "2", isCorrect: false }, { text: "4", isCorrect: false }] }
                ]
            },
            {
                id: 2,
                name: "Vật lý 1",
                category: "Vật lý",
                time: 30,
                plays: 0,
                questions: [
                    { id: 1746411600004, content: "Vận tốc là gì?", answers: [{ text: "Quãng đường / thời gian", isCorrect: true }, { text: "Khối lượng / thể tích", isCorrect: false }, { text: "Lực / khối lượng", isCorrect: false }] },
                    { id: 1746411600005, content: "Đơn vị của lực là gì?", answers: [{ text: "N", isCorrect: true }, { text: "kg", isCorrect: false }, { text: "m/s", isCorrect: false }] },
                    { id: 1746411600006, content: "1 N bằng bao nhiêu?", answers: [{ text: "1 kg·m/s²", isCorrect: true }, { text: "1 m/s²", isCorrect: false }, { text: "1 kg·m²/s", isCorrect: false }] }
                ]
            },
            {
                id: 3,
                name: "Lịch sử 1",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            },
            {
                id: 4,
                name: "Lịch sử 2",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            },
            {
                id: 5,
                name: "Lịch sử 3",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            },
            {
                id: 6,
                name: "Lịch sử 4",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            },
            {
                id: 7,
                name: "Lịch sử 5",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            },
            {
                id: 8,
                name: "Toán 2",
                category: "Toán học",
                time: 25,
                plays: 0,
                questions: [
                    { id: 1746411600001, content: "5 - 2 = ?", answers: [{ text: "3", isCorrect: true }, { text: "2", isCorrect: false }, { text: "4", isCorrect: false }] },
                    { id: 1746411600002, content: "3 x 3 = ?", answers: [{ text: "9", isCorrect: true }, { text: "6", isCorrect: false }, { text: "8", isCorrect: false }] },
                    { id: 1746411600003, content: "10 ÷ 2 = ?", answers: [{ text: "5", isCorrect: true }, { text: "2", isCorrect: false }, { text: "4", isCorrect: false }] }
                ]
            },
            {
                id: 9,
                name: "Vật lý 2",
                category: "Vật lý",
                time: 30,
                plays: 0,
                questions: [
                    { id: 1746411600004, content: "Vận tốc là gì?", answers: [{ text: "Quãng đường / thời gian", isCorrect: true }, { text: "Khối lượng / thể tích", isCorrect: false }, { text: "Lực / khối lượng", isCorrect: false }] },
                    { id: 1746411600005, content: "Đơn vị của lực là gì?", answers: [{ text: "N", isCorrect: true }, { text: "kg", isCorrect: false }, { text: "m/s", isCorrect: false }] },
                    { id: 1746411600006, content: "1 N bằng bao nhiêu?", answers: [{ text: "1 kg·m/s²", isCorrect: true }, { text: "1 m/s²", isCorrect: false }, { text: "1 kg·m²/s", isCorrect: false }] }
                ]
            },
            {
                id: 10,
                name: "Lịch sử 6",
                category: "Lịch sử",
                time: 15,
                plays: 0,
                questions: [
                    { id: 1746411600007, content: "Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1954", isCorrect: false }, { text: "1930", isCorrect: false }] },
                    { id: 1746411600008, content: "Chiến tranh thế giới thứ hai kết thúc năm nào?", answers: [{ text: "1945", isCorrect: true }, { text: "1939", isCorrect: false }, { text: "1950", isCorrect: false }] },
                    { id: 1746411600009, content: "Ngày Quốc khánh Việt Nam là ngày nào?", answers: [{ text: "2/9", isCorrect: true }, { text: "30/4", isCorrect: false }, { text: "1/5", isCorrect: false }] }
                ]
            }
        ];
        localStorage.setItem("tests", JSON.stringify(defaultTests));
    }
}
initDefaultTests();

let currentSearchTerm = "";
let currentSortOption = "";

// LocalStorage init
if (!localStorage.getItem("tests")) {
    localStorage.setItem("tests", JSON.stringify(tests));
} else {
    tests = JSON.parse(localStorage.getItem("tests"));
}

function updateData() {
    localStorage.setItem("tests", JSON.stringify(tests));
}

let ulEL = document.querySelector("tbody");

function addTest(name) {
    let test = {
        id: tests.length + 1,
        name: name,
        category: "Chưa phân loại", // hoặc gán giá trị hợp lý khác
        length: 0,
        time: "00:00"
    };
    tests.push(test);
    updateData();
    renderData();
}

function deleteTest(index) {
    tests.splice(index, 1);
    updateData();
    renderData();
}


// Phân trang
const urlParams = new URLSearchParams(window.location.search);
const targetPage = parseInt(urlParams.get('page')) || 1;

const maxItem = 5;
const countPage = Math.ceil(tests.length / maxItem);
let curPage = targetPage;

let paginBoxEL = document.querySelector(".pagin_box");

function renderPagin() {
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

// Hàm render danh sách bài test có kết hợp tìm kiếm và sắp xếp
function renderData() {
    let filteredTests = tests.filter(test =>
        test.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );

    if (currentSortOption === "name") {
        filteredTests.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortOption === "time") {
        filteredTests.sort((a, b) => a.time.localeCompare(b.time));
    }

    const countPage = Math.ceil(filteredTests.length / maxItem);
    curPage = Math.min(curPage, countPage || 1);

    let data = filteredTests.slice((curPage - 1) * maxItem, curPage * maxItem);
    let ulHTML = "";

    for (let i = 0; i < data.length; i++) {
        ulHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].category}</td>
            <td>${data[i].questions.length}</td>
            <td>${data[i].time} phút</td>
            <td>
                <button class="btn-edit" data-id="${data[i].id}">Sửa</button>
                <button class="btn-delete" onclick="deleteTest(${tests.findIndex(t => t.id === data[i].id)})">Xoá</button>
            </td>
        </tr>`;
    }

    ulEL.innerHTML = ulHTML;
    renderPagin();
}


let testModal = new bootstrap.Modal(document.querySelector('#testModal'));
let deleteModal = new bootstrap.Modal(document.querySelector('#confirmDeleteModal'));

// Mở modal thêm
document.querySelector(".btn-primary").addEventListener("click", () => {
    document.querySelector("#testModalLabel").innerText = "Thêm bài test";
    document.querySelector("#editIndex").value = "";
    document.querySelector("#testName").value = "";
    testModal.show();
});
// Thêm danh mục
document.querySelector("#testForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#testName").value.trim();
    const index = document.querySelector("#editIndex").value;

    //Kiểm tra xem tên danh mục có rỗng hay bị trùng hay không
    if (name === "") {
        alert("Tên bài test không được để trống!");
        return;
    } else if (tests.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
        alert("Tên bài test đã tồn tại!");
        return;
    }

    if (index === "") {
        addTest(name);
    }
    // } else {
    //     editTest(parseInt(index), name);
    // }

    testModal.hide();
    renderData();
});

// Bắt sự kiện chuyển trang khi click nút chuyển trang Thêm/sửa bài test
document.querySelector(".btn-success").addEventListener("click", () => {
    window.location.href = `../test-create/test_create.html`;
});

// Bắt sự kiện chuyển trang và truyền id bài test khi click nút sửa
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
        const id = e.target.dataset.id;
        window.location.href = `../test-create/test_create.html?id=${id}`;
    }
});
// Xác nhận xoá
let deleteIndex = null;

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);
        deleteIndex = tests.findIndex(cat => cat.id === id);
        deleteModal.show();
    }
});

document.querySelector("#confirmDeleteBtn").addEventListener("click", () => {
    if (deleteIndex !== null) {
        deleteTest(deleteIndex);
        deleteModal.hide();
        deleteIndex = null;
    }
});

// Hàm đăng xuất
function logOutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../Login/login.html";
}

// Nhận sự kiện tìm kiếm
document.querySelector("#searchInput").addEventListener("input", function (e) {
    currentSearchTerm = e.target.value;
    curPage = 1; // reset về trang đầu khi tìm kiếm
    renderData();
});

// Nhận sự kiện chọn sắp xếp
document.querySelector("#sortOptions").addEventListener("change", function (e) {
    currentSortOption = e.target.value;
    renderData();
});


renderData();
renderPagin();
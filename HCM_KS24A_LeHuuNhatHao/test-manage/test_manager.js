let tests = [];

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

function editTest(index, name) {
    tests[index].name = name;
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
            <td>${data[i].length}</td>
            <td>${data[i].time}</td>
            <td>
                <button class="btn-edit" onclick="editTest(${tests.findIndex(t => t.id === data[i].id)}, '${data[i].name}')">Sửa</button>
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
    } else {
        editTest(parseInt(index), name);
    }

    testModal.hide();
    renderData();
});

// Mở modal sửa
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);
        const index = tests.findIndex(cat => cat.id === id);

        document.querySelector("#editIndex").value = index;
        document.querySelector("#testName").value = tests[index].name;
        document.querySelector("#testModalLabel").innerText = "Sửa bài test";
        testModal.show();
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

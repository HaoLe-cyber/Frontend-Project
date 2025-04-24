let categories = [];

// LocalStorage init
if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify(categories));
} else {
    categories = JSON.parse(localStorage.getItem("categories"));
}

function updateData() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

let ulEL = document.querySelector("tbody");

function addCategory(name) {
    let category = {
        id: categories.length + 1,
        name: name
    };
    categories.push(category);
    updateData();
    renderData();
}

function deleteCategory(index) {
    categories.splice(index, 1);
    updateData();
    renderData();
}

function editCategory(index, name) {
    categories[index].name = name;
    updateData();
    renderData();
}

// Phân trang
const urlParams = new URLSearchParams(window.location.search);
const targetPage = parseInt(urlParams.get('page')) || 1;

const maxItem = 5;
const countPage = Math.ceil(categories.length / maxItem);
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

function renderData() {
    let ulHTML = ``;
    let data = categories.slice((curPage - 1) * maxItem, curPage * maxItem);

    for (let i = 0; i < data.length; i++) {
        ulHTML += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>
                <button class="btn-edit" onclick="editCategory(index, name) ">Sửa</button>
                <button class="btn-delete" onclick="deleteCategory(index)">Xoá</button>
            </td>
        </tr>`;
    }

    ulEL.innerHTML = ulHTML;
}

let categoryModal = new bootstrap.Modal(document.querySelector('#categoryModal'));
let deleteModal = new bootstrap.Modal(document.querySelector('#confirmDeleteModal'));

// Mở modal thêm
document.querySelector(".btn-primary").addEventListener("click", () => {
    document.querySelector("#categoryModalLabel").innerText = "Thêm danh mục";
    document.querySelector("#editIndex").value = "";
    document.querySelector("#categoryName").value = "";
    categoryModal.show();
});
// Thêm danh mục
document.querySelector("#categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#categoryName").value.trim();
    const index = document.querySelector("#editIndex").value;

    //Kiểm tra xem tên danh mục có rỗng hay bị trùng hay không
    if (name === "") {
        alert("Tên danh mục không được để trống!");
        return;
    } else if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
        alert("Tên danh mục đã tồn tại!");
        return;
    }

    if (index === "") {
        addCategory(name);
    } else {
        editCategory(parseInt(index), name);
    }

    categoryModal.hide();
    renderData();
});

// Mở modal sửa
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);
        const index = categories.findIndex(cat => cat.id === id);

        document.querySelector("#editIndex").value = index;
        document.querySelector("#categoryName").value = categories[index].name;
        document.querySelector("#categoryModalLabel").innerText = "Sửa danh mục";
        categoryModal.show();
    }
});

// Xác  nhận xoá
let deleteIndex = null;

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);
        deleteIndex = categories.findIndex(cat => cat.id === id);
        deleteModal.show();
    }
});

document.querySelector("#confirmDeleteBtn").addEventListener("click", () => {
    if (deleteIndex !== null) {
        deleteCategory(deleteIndex);
        deleteModal.hide();
        deleteIndex = null;
    }
});

function logOutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../Login/login.html";
}


renderData();
renderPagin();

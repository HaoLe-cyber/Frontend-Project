// category.js hoàn chỉnh (fix lỗi error message + validate tên danh mục)

let categories = [
    {
        id: 1,
        name: "Tiếng anh",
        emoji: "📚",
    },
    {
        id: 2,
        name: "Sinh học",
        emoji: "🧬",
    }
];

if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify(categories));
} else {
    categories = JSON.parse(localStorage.getItem("categories"));
}

function updateData() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

let ulEL = document.querySelector("tbody");

function addCategory(name, emoji) {
    let category = {
        id: categories.length + 1,
        name: name,
        emoji: emoji
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

function editCategory(index, name, emoji) {
    categories[index].name = name;
    categories[index].emoji = emoji;
    updateData();
    renderData();
}

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
            <td>${data[i].emoji} ${data[i].name}</td>
            <td>
                <button class="btn-edit">Sửa</button>
                <button class="btn-delete">Xoá</button>
            </td>
        </tr>`;
    }

    ulEL.innerHTML = ulHTML;
}

let categoryModal = new bootstrap.Modal(document.querySelector('#categoryModal'));
let deleteModal = new bootstrap.Modal(document.querySelector('#confirmDeleteModal'));

// Validate form
const categoryNameInput = document.querySelector("#categoryName");
const categoryError = document.querySelector(".error-message");
const categoryErrorMsg = document.querySelector("#category-name-error");
const saveButton = document.querySelector("#categoryForm button[type='submit']");

function validateCategoryName() {
    const name = categoryNameInput.value.trim();
    const index = document.querySelector("#editIndex").value;
    let errorMessage = "";

    if (name.length === 0) {
        errorMessage = "Tên danh mục không được để trống.";
    } else if (name.length < 6) {
        errorMessage = "Tên danh mục phải có ít nhất 6 ký tự.";
    } else {
        const isDuplicate = categories.some((cat, idx) =>
            cat.name.toLowerCase() === name.toLowerCase() && idx != index
        );
        if (isDuplicate) {
            errorMessage = "Tên danh mục đã tồn tại.";
        }
    }

    if (errorMessage) {
        categoryError.style.display = "flex";
        categoryErrorMsg.textContent = errorMessage;
        saveButton.disabled = true;
    } else {
        categoryError.style.display = "none";
        categoryErrorMsg.textContent = "";
        saveButton.disabled = false;
    }
}

categoryNameInput.addEventListener("input", validateCategoryName);

function resetModalForm() {
    document.querySelector("#editIndex").value = "";
    categoryNameInput.value = "";
    document.querySelector("#categoryEmoji").value = "";
    categoryError.style.display = "none";
    categoryErrorMsg.textContent = "";
    saveButton.disabled = false;
}

// Mở modal thêm
document.querySelector(".btn-primary.mb-3").addEventListener("click", () => {
    document.querySelector("#categoryModalLabel").innerText = "Thêm danh mục";
    resetModalForm();
    categoryModal.show();
});

// Mở modal sửa
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);
        const index = categories.findIndex(cat => cat.id === id);

        document.querySelector("#editIndex").value = index;
        categoryNameInput.value = categories[index].name;
        document.querySelector("#categoryEmoji").value = categories[index].emoji;
        document.querySelector("#categoryModalLabel").innerText = "Sửa danh mục";

        validateCategoryName();
        categoryModal.show();
    }
});

// Xử lý submit
document.querySelector("#categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = categoryNameInput.value.trim();
    const emoji = document.querySelector("#categoryEmoji").value.trim();
    const index = document.querySelector("#editIndex").value;

    if (index === "") {
        addCategory(name, emoji);
    } else {
        editCategory(parseInt(index), name, emoji);
    }

    categoryModal.hide();
});

// Xử lý xoá
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

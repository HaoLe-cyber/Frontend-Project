let tests = [];

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

// Hàm render list categories từ localStorage
function renderCategories() {
    const categories = [...new Set(tests.map(test => test.category))];
    const categoryList = document.querySelector("#category-list");
    categoryList.innerHTML = categories.map(category => `<li>${category}</li>`).join("");
}

function addTest(name, category, time) {
    const newTest = {
        id: tests.length + 1,
        name: name,
        category: category,
        time: time,
        plays: 0,
        questions: []
    };
    tests.push(newTest);
    updateData();
}




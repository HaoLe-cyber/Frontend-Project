
let tests = [];
let currentEditingQuestionId = null;

if (!localStorage.getItem("tests")) {
    tests = [];
    updateData();
} else {
    tests = JSON.parse(localStorage.getItem("tests"));
}

function updateData() {
    localStorage.setItem("tests", JSON.stringify(tests));
}

function loadCategories() {
    const categorySelect = document.getElementById('category');
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];

    categorySelect.innerHTML = '<option selected disabled>Chọn danh mục</option>';

    savedCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name || category;
        option.textContent = category.name || category;
        categorySelect.appendChild(option);
    });
}

function renderQuestions() {
    const tbody = document.querySelector(".question-section tbody");
    tbody.innerHTML = "";

    if (tests.length === 0) return;

    const questions = tests[tests.length - 1].questions || [];

    questions.forEach((question, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.content}</td>
            <td>
                <button class="btn btn-edit btn-sm" data-id="${question.id}">Sửa</button>
                <button class="btn btn-delete btn-sm">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const editButtons = tbody.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const questionId = parseInt(this.getAttribute('data-id'));
            openEditQuestionModal(questionId);
        });
    });

    // const deleteButtons = tbody.querySelectorAll('.btn-delete');
    // deleteButtons.forEach(button => {
    //     button.addEventListener('click', function () {
    //         const index = parseInt(this.getAttribute('data-index'));
    //         if (confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
    //             tests[tests.length - 1].questions.splice(index, 1);
    //             updateData();
    //             renderQuestions();
    //         }
    //     });
    // });
}

document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    renderQuestions();

    document.querySelector("#saveTestBtn").addEventListener("click", function () {
        const name = document.querySelector("#testName").value.trim();
        const category = document.querySelector("#category").value;
        const time = parseInt(document.querySelector("#time").value);

        if (!name || category === "Chọn danh mục" || isNaN(time) || time <= 0) {
            alert("Vui lòng điền đủ thông tin hợp lệ!");
            return;
        }

        if (tests.length === 0 || (tests[tests.length - 1].questions || []).length === 0) {
            alert("Vui lòng thêm ít nhất 1 câu hỏi trước khi lưu bài test!");
            return;
        }

        const currentTest = tests[tests.length - 1];
        currentTest.name = name;
        currentTest.category = category;
        currentTest.time = time;
        updateData();

        alert("Đã lưu bài test thành công!");
        document.querySelector("#testForm").reset();
        document.querySelector("#time").value = 15;
        renderQuestions();
    });

    document.getElementById('openAddQuestionModal').addEventListener('click', function () {
        const name = document.getElementById("testName").value.trim();
        const category = document.getElementById("category").value;
        const time = parseInt(document.getElementById("time").value);

        if (!name || category === "Chọn danh mục" || isNaN(time) || time <= 0) {
            alert("Vui lòng điền đủ thông tin hợp lệ trước khi thêm câu hỏi!");
            return;
        }

        if (tests.length === 0 || !tests[tests.length - 1].questions) {
            addTest(name, category, time);
        }

        const addQuestionModal = new bootstrap.Modal(document.getElementById('addQuestionModal'));
        addQuestionModal.show();
    });

    document.getElementById('addAnswerBtn').addEventListener('click', function () {
        createAnswerInput();
    });

    document.getElementById('questionForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const questionContent = document.getElementById('questionContent').value.trim();
        const answersListDiv = document.getElementById('answersList');
        const answerRows = answersListDiv.querySelectorAll('.d-flex');

        if (!questionContent || answerRows.length < 2) {
            alert('Cần ít nhất 2 câu trả lời!');
            return;
        }

        const questionAnswers = [];
        let hasCorrect = false;

        answerRows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            const textInput = row.querySelector('input[type="text"]');
            if (textInput.value.trim()) {
                questionAnswers.push({
                    text: textInput.value.trim(),
                    isCorrect: checkbox.checked
                });
                if (checkbox.checked) hasCorrect = true;
            }
        });

        if (!hasCorrect) {
            alert('Phải chọn ít nhất 1 câu trả lời đúng!');
            return;
        }

        const currentTest = tests[tests.length - 1];

        if (currentEditingQuestionId) {
            const question = currentTest.questions.find(q => q.id === currentEditingQuestionId);
            if (question) {
                question.content = questionContent;
                question.answers = questionAnswers;
                alert('Đã cập nhật câu hỏi thành công!');
            }
        } else {
            const newQuestion = {
                id: Date.now(),
                content: questionContent,
                answers: questionAnswers
            };
            currentTest.questions.push(newQuestion);
            alert('Đã thêm câu hỏi thành công!');
        }

        updateData();
        renderQuestions();

        document.getElementById('questionForm').reset();
        document.getElementById('answersList').innerHTML = '';
        currentEditingQuestionId = null;

        const modal = bootstrap.Modal.getInstance(document.getElementById('addQuestionModal'));
        modal.hide();
    });
});

function createAnswerInput() {
    const answerDiv = document.createElement('div');
    answerDiv.className = "d-flex align-items-center mb-2";
    answerDiv.innerHTML = `
        <input type="checkbox" name="correctAnswer" class="form-check-input me-2">
        <input type="text" class="form-control me-2" placeholder="Nhập câu trả lời" required>
        <button type="button" class="btn btn-danger btn-sm btn-delete-answer">&times;</button>
    `;

    answerDiv.querySelector('.btn-delete-answer').addEventListener('click', function () {
        answerDiv.remove();
    });

    document.getElementById('answersList').appendChild(answerDiv);
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

function openEditQuestionModal(questionId) {
    const currentTest = tests.length > 0 ? tests[tests.length - 1] : null;

    if (!currentTest || !currentTest.questions || currentTest.questions.length === 0) {
        alert('Không tìm thấy bài test hoặc không có câu hỏi!');
        return;
    }

    const question = currentTest.questions.find(q => q.id === questionId);

    if (!question) {
        alert('Không tìm thấy câu hỏi!');
        return;
    }

    currentEditingQuestionId = questionId;

    document.getElementById('questionForm').reset();
    document.getElementById('answersList').innerHTML = '';
    document.getElementById('questionContent').value = question.content;

    question.answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.className = "d-flex align-items-center mb-2";
        answerDiv.innerHTML = `
            <input type="checkbox" name="correctAnswer" class="form-check-input me-2" ${answer.isCorrect ? "checked" : ""}>
            <input type="text" class="form-control me-2" value="${answer.text}" required>
            <button type="button" class="btn btn-danger btn-sm btn-delete-answer">&times;</button>
        `;
        answerDiv.querySelector('.btn-delete-answer').addEventListener('click', function () {
            answerDiv.remove();
        });
        document.getElementById('answersList').appendChild(answerDiv);
    });

    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addQuestionModal'));
    modal.show();
}

// Hàm xóa câu hỏi
function deleteQuestion(index) {
    const currentTest = tests[tests.length - 1];
    if (!currentTest || !currentTest.questions) return;

    currentTest.questions.splice(index, 1);
    updateData();
    renderQuestions();
}


// Modal xác nhận xóa câu hỏi
let deleteModal = new bootstrap.Modal(document.querySelector('#confirmDeleteModal'));

let deleteIndex = null;

// Mở modal xác nhận xoá
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-delete")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.children[0].textContent);

        const currentTest = tests[tests.length - 1];
        if (!currentTest || !currentTest.questions) {
            alert("Không tìm thấy bài test hoặc danh sách câu hỏi!");
            return;
        }

        deleteIndex = currentTest.questions.findIndex(q => q.id === id);
        deleteModal.show();
    }
});


document.querySelector("#confirmDeleteBtn").addEventListener("click", () => {
    if (deleteIndex !== null) {
        deleteQuestion(deleteIndex);
        deleteModal.hide();
        deleteIndex = null;
    }
});
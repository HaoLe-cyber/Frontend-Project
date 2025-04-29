const tests = JSON.parse(localStorage.getItem('tests'));
if (!tests || tests.length === 0) {
    alert('Không tìm thấy dữ liệu bài kiểm tra trong localStorage!');
    throw new Error("Không có dữ liệu tests.");
}

const currentTest = tests[0]; // Bạn có thể thay bằng chọn theo id nếu cần
const questions = Object.values(currentTest.questions);
let currentQuestionIndex = 0;

const navContainer = document.querySelector("aside .d-grid");
const mainElement = document.querySelector("main");

const renderQuestionNav = () => {
    navContainer.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-secondary btn-sm';
        btn.textContent = i + 1;
        btn.addEventListener('click', () => {
            currentQuestionIndex = i;
            renderQuestion(i);
            updateActiveNavButton(i);
        });
        navContainer.appendChild(btn);
    }
};

const updateActiveNavButton = (activeIndex) => {
    const buttons = navContainer.querySelectorAll('button');
    buttons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === activeIndex) {
            btn.classList.add('active');
        }
    });
};

const renderQuestion = (index) => {
    const q = questions[index];
    const answersHTML = q.answers.map((ans, i) => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="option${i}" data-index="${i}">
            <label class="form-check-label" for="option${i}">${ans.text}</label>
        </div>
    `).join('');

    mainElement.innerHTML = `
        <h2>${currentTest.category}</h2>
        <div class="mb-4">
            <h5>Câu hỏi ${index + 1} trên ${questions.length}:</h5>
            <p>${q.content}</p>
            ${answersHTML}
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-success mt-3" id="submitBtn">Hoàn thành</button>
                <div class="d-flex gap-2">
                    <button class="btn btn-secondary" id="prevBtn">Trước</button>
                    <button class="btn btn-primary" id="nextBtn">Tiếp</button>
                </div>
            </div>
        </div>
    `;
    updateActiveNavButton(index);
    attachEventListeners();
};

const attachEventListeners = () => {
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('submitBtn')?.addEventListener('click', () => {
        alert('Bạn đã hoàn thành (chưa tính điểm)');
    });
};

// Khởi tạo giao diện
renderQuestionNav();
renderQuestion(currentQuestionIndex);

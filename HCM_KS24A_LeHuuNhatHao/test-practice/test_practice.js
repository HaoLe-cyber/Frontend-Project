const tests = JSON.parse(localStorage.getItem('tests'));
if (!tests || tests.length === 0) {
    alert('Không tìm thấy dữ liệu bài kiểm tra trong localStorage!');
    throw new Error("Không có dữ liệu tests.");
}

const urlParams = new URLSearchParams(window.location.search);
const testId = parseInt(urlParams.get("testId"));
const currentTest = tests.find(t => t.id === testId);

if (!currentTest) {
    alert("Không tìm thấy bài test!");
    throw new Error("Bài test không tồn tại");
}

// Tăng lượt chơi + lưu lại vào localStorage
currentTest.plays = (currentTest.plays || 0) + 1;
localStorage.setItem("tests", JSON.stringify(tests));

const questions = Object.values(currentTest.questions);
let currentQuestionIndex = 0;
const userAnswers = {}; // Lưu lựa chọn của người dùng

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
    const savedAnswer = userAnswers[index] || [];

    const answersHTML = q.answers.map((ans, i) => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="option${i}" data-index="${i}" ${savedAnswer.includes(i) ? 'checked' : ''}>
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

// Các sự kiện
const attachEventListeners = () => {
    // Lưu lại lựa chọn
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selected = Array.from(document.querySelectorAll('.form-check-input'))
                .map((cb, i) => cb.checked ? i : null)
                .filter(i => i !== null);

            userAnswers[currentQuestionIndex] = selected;

            // Đánh dấu nút đã trả lời
            const navBtn = navContainer.querySelectorAll('button')[currentQuestionIndex];
            if (selected.length > 0) {
                navBtn.classList.add('btn-outline-success');
            } else {
                navBtn.classList.remove('btn-outline-success');
            }
        });
    });

    // Điều hướng câu tiếp theo
    document.querySelector('#nextBtn')?.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }
    });

    // Điều hướng câu trước đó
    document.querySelector('#prevBtn')?.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
        }
    });

    // Tính điểm và hiển thị kết quả
    document.querySelector('#submitBtn')?.addEventListener('click', () => {
        let correct = 0;

        questions.forEach((q, idx) => {
            const correctIndices = q.answers
                .map((ans, i) => ans.isCorrect ? i : null)
                .filter(i => i !== null);

            const selected = userAnswers[idx] || [];

            const isCorrect = correctIndices.length === selected.length &&
                correctIndices.every(i => selected.includes(i));

            if (isCorrect) correct++;
        });

        const total = questions.length;
        const incorrect = total - correct;
        const score = Math.round((correct / total) * 100);

        document.querySelector('#resultModal .alert').innerHTML = `
            <strong>Chúc mừng!</strong> Bạn đã hoàn thành bài kiểm tra.<br>
            Điểm của bạn: <strong>${score}%</strong>
        `;
        document.querySelector('#resultModal .border').innerHTML = `
            <h6>Kết quả cụ thể</h6>
            <p>Tổng số câu hỏi: ${total}</p>
            <p>Câu trả lời đúng: ${correct}</p>
            <p>Câu trả lời sai: ${incorrect}</p>
        `;

        const modal = new bootstrap.Modal(document.querySelector('#resultModal'));
        modal.show();
    });

    // Xử lý nút "Làm lại"
    document.querySelector('#retryBtn').addEventListener('click', () => {
        // Ẩn modal
        const modalEl = document.querySelector('#resultModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        // Xóa dữ liệu câu trả lời
        for (let key in userAnswers) {
            delete userAnswers[key];
        }

        // Reset nút điều hướng (xóa màu xanh đã trả lời)
        navContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('btn-outline-success');
        });

        // Quay lại câu đầu tiên
        currentQuestionIndex = 0;
        renderQuestion(currentQuestionIndex);
    });

    // Xử lý nút "Trang chủ"
    document.querySelector('#homePageBtn').addEventListener('click', () => {
        window.location.href = '../Home/home.html';
    });
}

// Hiện thời gian chơi và bộ đếm ngược
// Khởi động đếm ngược thời gian
const timeDisplay = document.querySelector('.position-absolute');
let timeLeft = currentTest.time * 60; // chuyển phút thành giây

const updateTimerDisplay = () => {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    timeDisplay.innerHTML = `
        <p class="mb-1">Thời gian: ${currentTest.time} phút</p>
        <p>Còn lại: ${minutes}:${seconds} phút</p>
    `;
};

updateTimerDisplay(); // gọi lần đầu

const timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        alert("Hết giờ làm bài!");
        document.getElementById('submitBtn')?.click(); // tự động nộp bài
        return;
    }
    updateTimerDisplay();
}, 1000);

// Bắt đầu ứng dụng
renderQuestionNav();
renderQuestion(currentQuestionIndex);

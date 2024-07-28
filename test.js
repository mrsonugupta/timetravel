document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('test-form');
    const resultDiv = document.getElementById('result');
    const questionsDiv = document.getElementById('questions');

    // Sample questions for demonstration
    const questions = [
        { text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris' },
        { text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' }
    ];

    // Render questions
    questions.forEach((q, index) => {
        const questionHTML = `
            <div class="question-card">
                <p><strong>${index + 1}. ${q.text}</strong></p>
                ${q.options.map((option, i) => `
                    <div class="form-group">
                        <input type="radio" id="q${index}option${i}" name="q${index}" value="${option}" required>
                        <label for="q${index}option${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        questionsDiv.innerHTML += questionHTML;
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const studentName = formData.get('studentName');
        let score = 0;

        questions.forEach((q, index) => {
            const selectedOption = formData.get(`q${index}`);
            if (selectedOption === q.answer) {
                score++;
            }
        });

        resultDiv.innerHTML = `
            <p><strong>Name:</strong> ${studentName}</p>
            <p><strong>Score:</strong> ${score} / ${questions.length}</p>
        `;
        resultDiv.classList.remove('hidden');
    });
});

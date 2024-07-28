document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve user data
    const name = document.getElementById('name').value;
    const studentClass = document.getElementById('class').value;
    const subject = document.getElementById('subject').value;

    // Simulate fetching questions from a source (e.g., local storage or server)
    const questions = [
        { question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'Berlin'], answer: 'option1' },
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 'option2' }
    ];

    // Generate questions form
    const testForm = document.getElementById('testForm');
    testForm.innerHTML = ''; // Clear previous questions

    questions.forEach((q, index) => {
        testForm.innerHTML += `
            <fieldset>
                <legend>Question ${index + 1}</legend>
                <p>${q.question}</p>
                <label><input type="radio" name="q${index}" value="option1" required> ${q.options[0]}</label><br>
                <label><input type="radio" name="q${index}" value="option2" required> ${q.options[1]}</label><br>
                <label><input type="radio" name="q${index}" value="option3" required> ${q.options[2]}</label><br>
                <label><input type="radio" name="q${index}" value="option4" required> ${q.options[3]}</label>
            </fieldset>
        `;
    });

    document.getElementById('testFormSection').style.display = 'none';
    document.getElementById('testQuestionsSection').style.display = 'block';

    document.getElementById('testForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let score = 0;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;

        const resultMessage = `You scored ${score} out of ${totalQuestions} (${percentage}%)`;
        document.getElementById('resultMessage').textContent = resultMessage;

        document.getElementById('testQuestionsSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
    });
});

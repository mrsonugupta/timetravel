document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const question = document.getElementById('question').value;
    const options = document.getElementById('options').value.split(',');
    const answer = document.getElementById('answer').value;

    // Display the uploaded question
    const questionList = document.getElementById('questionList');
    const questionItem = document.createElement('div');
    questionItem.classList.add('question-item');
    questionItem.innerHTML = `
        <h3>${question}</h3>
        <ul>
            ${options.map(option => `<li>${option}</li>`).join('')}
        </ul>
        <p><strong>Correct Answer:</strong> ${answer}</p>
    `;
    questionList.appendChild(questionItem);

    // Clear form fields
    document.getElementById('question').value = '';
    document.getElementById('options').value = '';
    document.getElementById('answer').value = '';

    alert('Question uploaded successfully!');
});

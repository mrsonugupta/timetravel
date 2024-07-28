document.addEventListener('DOMContentLoaded', function() {
    // Get student data from localStorage
    const studentName = localStorage.getItem('studentName') || 'Student';
    const results = JSON.parse(localStorage.getItem('results')) || [];

    // Display student name
    document.getElementById('student-name').textContent = studentName;

    // Display test results
    const resultsDiv = document.getElementById('results');
    if (results.length > 0) {
        resultsDiv.innerHTML = results.map((result, index) => `
            <div class="result-card">
                <p><strong>Test ${index + 1}:</strong></p>
                <p>Score: ${result.score} / ${result.totalQuestions}</p>
                <p>Date: ${result.date}</p>
            </div>
        `).join('');
    } else {
        resultsDiv.innerHTML = '<p>No test results available.</p>';
    }
});

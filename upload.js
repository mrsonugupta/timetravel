document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const question = formData.get('question');
        const options = [
            formData.get('option1'),
            formData.get('option2'),
            formData.get('option3'),
            formData.get('option4')
        ];
        const answer = formData.get('answer');

        console.log('Question:', question);
        console.log('Options:', options);
        console.log('Correct Answer:', answer);

        // Here you would typically send this data to your backend server
        alert('Question uploaded successfully!');
    });
});

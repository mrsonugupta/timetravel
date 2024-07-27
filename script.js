document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');
    const taskList = document.getElementById('tasks');
    const timerList = document.getElementById('timers');
    const alarmForm = document.getElementById('alarmForm');
    const alarmTime = document.getElementById('alarmTime');
    const alarmIcon = document.getElementById('alarmIcon');
    const alarmFormContainer = document.getElementById('alarmFormContainer');
    let timers = {};

    // Request notification permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = taskInput.value;
        const taskDueDate = dueDate.value;
        const taskPriority = priority.value;

        if (taskText && taskDueDate && taskPriority) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('p-4', 'bg-gray-100', 'border', 'border-gray-300', 'rounded-lg', 'flex', 'justify-between', 'items-center', 'relative');
            taskItem.classList.add(`border-${getPriorityColor(taskPriority)}`);
            taskItem.innerHTML = `
                <span>${taskText} - Due: ${new Date(taskDueDate).toLocaleString()}</span>
                <button class="delete-btn absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            `;
            
            // Add event listener for delete button
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                taskItem.classList.add('fade-out');
                setTimeout(() => {
                    taskItem.remove();
                    stopTimer(taskText);  // Stop timer if task is deleted
                }, 300);
            });

            taskList.appendChild(taskItem);

            // Add timer
            const endTime = new Date(taskDueDate).getTime();
            startTimer(taskText, endTime);

            // Clear form
            taskInput.value = '';
            dueDate.value = '';
            priority.value = '';
        }
    });

    function startTimer(taskText, endTime) {
        const timerItem = document.createElement('li');
        timerItem.classList.add('flex', 'items-center', 'p-4', 'bg-gray-100', 'border', 'border-gray-300', 'rounded-lg', 'relative');
        timerItem.innerHTML = `
            <span>${taskText}</span>
            <span class="ml-4 font-bold text-gray-700" id="time-${taskText.replace(/\s+/g, '')}">--:--:--</span>
            <button class="delete-btn absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
        `;
        timerList.appendChild(timerItem);

        function updateTimer() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                timerItem.querySelector('.ml-4').textContent = "Time's Up!";
                stopTimer(taskText); // Stop timer when time is up
                notifyUser(taskText); // Notify user when time is up
            } else {
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                timerItem.querySelector('.ml-4').textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        }

        const interval = setInterval(updateTimer, 1000);

        function stopTimer(taskText) {
            clearInterval(interval);
            delete timers[taskText];
        }

        timers[taskText] = { endTime, interval };
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'low': return 'green-500';
            case 'medium': return 'yellow-500';
            case 'high': return 'red-500';
            default: return 'gray-300';
        }
    }

    function notifyUser(taskText) {
        if (Notification.permission === 'granted') {
            new Notification('Task Reminder', {
                body: `Time's up for ${taskText}!`,
                icon: 'https://example.com/notification-icon.png'
            });
        }
    }

    // Toggle alarm form visibility
    alarmIcon.addEventListener('click', () => {
        alarmFormContainer.classList.toggle('hidden');
    });

    // Handle alarm form submission
    alarmForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const alarmDateTime = new Date(alarmTime.value).getTime();
        const currentTime = new Date().getTime();
        
        if (alarmDateTime > currentTime) {
            const timeToAlarm = alarmDateTime - currentTime;
            
            setTimeout(() => {
                notifyUser('Alarm Alert');
                alarmFormContainer.classList.add('hidden');
            }, timeToAlarm);
        } else {
            alert('Please choose a future time.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const titleElement = document.getElementById('typing-title');
    const subtitleElement = document.getElementById('typing-subtitle');
    const mainTitle = "ARGI Projects";
    const subtitle = "Explore our innovative technology and automation solutions.";
    
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.classList.add('typing-cursor');

    const typeText = async (element, text, speed) => {
        let i = 0;
        element.textContent = '';
        element.appendChild(cursor);
        
        return new Promise(resolve => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    const char = document.createTextNode(text.charAt(i));
                    element.insertBefore(char, cursor);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    };

    const startTyping = async () => {
        await typeText(titleElement, mainTitle, 75);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await typeText(subtitleElement, subtitle, 40);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        cursor.remove();
    };

    startTyping();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.projeto-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.textContent.toLowerCase();

            projects.forEach(project => {
                const status = project.dataset.status;

                if (filter === 'todos' || status.includes(filter.replace('em desenvolvimento', 'desenvolvimento'))) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});
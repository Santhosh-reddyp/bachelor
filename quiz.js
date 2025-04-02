document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What was your bachelor's degree?",
            type: "radio",
            options: ["B.Tech", "B.Sc", "BBA", "MBBS", "BA LLB", "B.Com", "B.A", "B.Pharm"],
            key: "degree",
            required: true
        },
        {
            question: "What was your specialization/focus area?",
            type: "radio",
            options: {
                "B.Tech": ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
                "B.Sc": ["Mathematics", "Physics", "Chemistry", "Biology", "Agriculture"],
                "BBA": ["Finance", "Marketing", "HR", "General Management"],
                "MBBS": ["General Medicine"],
                "BA LLB": ["Corporate Law", "Criminal Law", "Constitutional Law"],
                "B.Com": ["Accounting", "Taxation", "Finance"],
                "B.A": ["Economics", "History", "Political Science", "Psychology"],
                "B.Pharm": ["Pharmaceutical Chemistry", "Pharmacology"]
            },
            key: "specialization",
            required: true
        },
        {
            question: "What are your primary interests?",
            type: "checkbox",
            options: ["Technology", "Healthcare", "Business", "Law", "Research", "Creative Arts", "Public Service"],
            key: "interests",
            required: true
        },
        {
            question: "Preferred work environment?",
            type: "radio",
            options: ["Office", "Field Work", "Remote", "Hybrid", "Laboratory", "Hospital"],
            key: "environment",
            required: true
        },
        {
            question: "Do you prefer working with?",
            type: "radio",
            options: ["People", "Data", "Machines", "Animals", "Plants", "Ideas"],
            key: "work_preference",
            required: true
        },
        {
            question: "Preferred location for work/study?",
            type: "radio",
            options: ["Andhra Pradesh", "Other Indian State", "Abroad", "Anywhere"],
            key: "location",
            required: true
        },
        {
            question: "Are you more interested in?",
            type: "radio",
            options: ["Career (Job)", "Higher Education", "Both", "Not Sure"],
            key: "path_preference",
            required: true
        },
        {
            question: "Expected salary range?",
            type: "radio",
            options: ["2-5 LPA", "5-10 LPA", "10-15 LPA", "15+ LPA"],
            key: "salary",
            required: true
        },
        {
            question: "Years willing to spend on further education?",
            type: "radio",
            options: ["None (start working)", "1-2 years", "3-4 years", "5+ years"],
            key: "education_duration",
            required: true
        },
        {
            question: "What skills do you already have?",
            type: "checkbox",
            options: ["Programming", "Data Analysis", "Communication", "Leadership", "Research", "Clinical Skills", "Legal Knowledge"],
            key: "skills",
            required: true
        },
        {
            question: "What industries interest you?",
            type: "checkbox",
            options: ["IT/Software", "Healthcare", "Agriculture", "Education", "Government", "Manufacturing", "Finance"],
            key: "industries",
            required: true
        },
        {
            question: "Your preferred work style?",
            type: "radio",
            options: ["Structured tasks", "Creative projects", "Research-oriented", "People-oriented", "Technical problem-solving"],
            key: "work_style",
            required: true
        },
        {
            question: "How important is job stability?",
            type: "radio",
            options: ["Very important", "Somewhat important", "Neutral", "Not important"],
            key: "stability",
            required: true
        },
        {
            question: "Willingness to relocate?",
            type: "radio",
            options: ["Willing to relocate anywhere", "Prefer to stay in Andhra", "Open to nearby states", "Not willing to relocate"],
            key: "relocate",
            required: true
        },
        {
            question: "Your long-term career goals?",
            type: "text",
            key: "goals",
            required: false
        }
    ];

    const form = document.getElementById('career-quiz');
    const questionsContainer = document.getElementById('questions-container');
    let currentDegree = '';

    // Display all questions
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <h3>${index + 1}. ${question.question}${question.required ? '<span class="required">*</span>' : ''}</h3>
            <div class="options-container" id="options-${index}"></div>
        `;
        
        questionsContainer.appendChild(questionElement);
        renderOptions(index, question);
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {};
        
        questions.forEach(question => {
            if (question.type === 'checkbox') {
                const selected = Array.from(document.querySelectorAll(`input[name="${question.key}"]:checked`)).map(el => el.value);
                formData[question.key] = selected;
            } else if (question.type === 'radio') {
                const selected = document.querySelector(`input[name="${question.key}"]:checked`);
                if (selected) formData[question.key] = selected.value;
            } else {
                formData[question.key] = document.getElementById(`text-${question.key}`).value;
            }
        });

        localStorage.setItem('quizResponses', JSON.stringify(formData));
        window.location.href = 'results.html';
    });

    // Handle degree change to update specialization options
    document.addEventListener('change', function(e) {
        if (e.target.name === 'degree') {
            currentDegree = e.target.value;
            const specQuestion = questions.find(q => q.key === 'specialization');
            const specContainer = document.getElementById('options-1');
            specContainer.innerHTML = '';
            renderOptions(1, specQuestion);
        }
    });

    function renderOptions(index, question) {
        const optionsContainer = document.getElementById(`options-${index}`);
        
        if (question.type === 'radio') {
            const options = question.options instanceof Array ? question.options : question.options[currentDegree] || [];
            
            options.forEach(option => {
                const optionId = `${question.key}-${option.replace(/\s+/g, '-').toLowerCase()}`;
                optionsContainer.innerHTML += `
                    <div class="option">
                        <input type="radio" id="${optionId}" name="${question.key}" value="${option}" required="${question.required}">
                        <label for="${optionId}">${option}</label>
                    </div>
                `;
            });
        } 
        else if (question.type === 'checkbox') {
            question.options.forEach(option => {
                const optionId = `${question.key}-${option.replace(/\s+/g, '-').toLowerCase()}`;
                optionsContainer.innerHTML += `
                    <div class="option">
                        <input type="checkbox" id="${optionId}" name="${question.key}" value="${option}">
                        <label for="${optionId}">${option}</label>
                    </div>
                `;
            });
        }
        else {
            optionsContainer.innerHTML = `
                <textarea id="text-${question.key}" name="${question.key}" rows="4"></textarea>
            `;
        }
    }
});
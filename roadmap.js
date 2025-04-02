document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const roadmapTitle = document.getElementById('roadmap-title');
    const careerTitle = document.getElementById('career-title');
    const careerDescription = document.getElementById('career-description');
    const timeline = document.getElementById('timeline');
    const resourceList = document.getElementById('resource-list');
    const institutionsList = document.getElementById('institutions-list');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pathId = urlParams.get('path');
    const pathType = urlParams.get('type'); // 'career' or 'education'
    
    // Get user education from localStorage
    const userEducation = JSON.parse(localStorage.getItem('quizResponses')) || {};
    
    // Define roadmaps data with Andhra Pradesh focus
    const roadmaps = {
        // Career roadmaps
        'software-developer': {
            title: 'Software Developer',
            description: 'A software developer designs, codes, and tests software applications. With Andhra Pradesh emerging as an IT hub with places like Visakhapatnam and Tirupati developing tech parks, this is a promising career.',
            type: 'career',
            steps: [
                {
                    title: 'Entry Level: Junior Developer',
                    description: 'Start as a junior developer in companies like Tech Mahindra, Wipro or local startups in Andhra Pradesh.',
                    duration: '1-2 years',
                    skills: ['Programming fundamentals', 'Java/Python', 'Basic database skills', 'Problem solving']
                },
                {
                    title: 'Mid Level: Software Developer',
                    description: 'Work on complex projects in companies with development centers in AP like Infosys, TCS or HCL.',
                    duration: '2-3 years',
                    skills: ['System design', 'Web development', 'API development', 'Debugging']
                },
                {
                    title: 'Senior Level: Senior Developer',
                    description: 'Lead projects in AP-based companies or work remotely for national/international firms.',
                    duration: '3+ years',
                    skills: ['Cloud computing', 'Microservices', 'Mentoring juniors', 'Architecture']
                }
            ],
            resources: [
                'AP Skill Development Corporation courses in software development',
                'Online Learning: NPTEL courses from IITs, Coursera',
                'Coding Platforms: LeetCode, HackerRank for practice',
                'Local Meetups: Vizag Tech Meetups, Tirupati Developer Community'
            ],
            institutions: [
                {
                    name: 'Indian Institute of Information Technology (IIIT), Sri City',
                    programs: ['B.Tech/M.Tech in Computer Science', 'Industry training programs']
                },
                {
                    name: 'Andhra University College of Engineering, Visakhapatnam',
                    programs: ['Computer Science degrees', 'Software development certifications']
                },
                {
                    name: 'JNTU Kakinada',
                    programs: ['Computer Science programs', 'Industry-oriented training']
                }
            ]
        },
        
        'data-scientist': {
            title: 'Data Scientist',
            description: 'Data Scientists analyze large data sets to identify trends. With Andhra Pradesh government focusing on data-driven governance, opportunities are growing in Visakhapatnam and Amaravati.',
            type: 'career',
            steps: [
                {
                    title: 'Entry Level: Data Analyst',
                    description: 'Start with data analysis roles in AP-based companies or government projects.',
                    duration: '1-2 years',
                    skills: ['SQL', 'Python/R', 'Basic statistics', 'Data visualization']
                },
                {
                    title: 'Mid Level: Data Scientist',
                    description: 'Work on machine learning projects in industries like healthcare, agriculture which are focus areas in AP.',
                    duration: '2-3 years',
                    skills: ['Machine learning', 'Advanced Python', 'Data pipelines', 'Model deployment']
                },
                {
                    title: 'Senior Level: Senior Data Scientist',
                    description: 'Lead data teams in AP government initiatives or private companies.',
                    duration: '3+ years',
                    skills: ['Deep learning', 'Big data technologies', 'Project management', 'Stakeholder communication']
                }
            ],
            resources: [
                'AP Skill Development courses in Data Science',
                'Online Learning: NPTEL "Data Science for Engineers" course',
                'Books: "Python for Data Analysis" by Wes McKinney',
                'Competitions: Participate in Smart AP hackathons'
            ],
            institutions: [
                {
                    name: 'Indian Institute of Technology (IIT), Tirupati',
                    programs: ['Data Science certifications', 'AI/ML courses']
                },
                {
                    name: 'Sri Venkateswara University, Tirupati',
                    programs: ['M.Sc in Data Science', 'Statistics programs']
                },
                {
                    name: 'GITAM University, Visakhapatnam',
                    programs: ['PG Program in Data Science', 'Analytics courses']
                }
            ]
        },
        
        'healthcare-administrator': {
            title: 'Healthcare Administrator',
            description: 'Healthcare administrators manage hospitals and clinics. With AP government expanding healthcare infrastructure, this is a growing field.',
            type: 'career',
            steps: [
                {
                    title: 'Entry Level: Hospital Administrator',
                    description: 'Start in government hospitals or private clinics in AP.',
                    duration: '1-2 years',
                    skills: ['Healthcare systems', 'Basic management', 'Medical terminology']
                },
                {
                    title: 'Mid Level: Department Manager',
                    description: 'Manage specific departments in hospitals like NRI Hospital or Seven Hills in Visakhapatnam.',
                    duration: '2-3 years',
                    skills: ['Team management', 'Budgeting', 'Process improvement']
                },
                {
                    title: 'Senior Level: Hospital CEO/Director',
                    description: 'Lead healthcare institutions in AP or work with government health programs.',
                    duration: '5+ years',
                    skills: ['Strategic planning', 'Policy implementation', 'Leadership']
                }
            ],
            resources: [
                'AP Medical and Health Department training programs',
                'Books: "Healthcare Management" by Sakharkar',
                'Workshops by AP Hospital Association',
                'Online courses in Public Health Management'
            ],
            institutions: [
                {
                    name: 'Andhra Medical College, Visakhapatnam',
                    programs: ['Hospital Administration courses']
                },
                {
                    name: 'NTR University of Health Sciences, Vijayawada',
                    programs: ['MHA - Master of Hospital Administration']
                },
                {
                    name: 'GITAM Institute of Medical Sciences',
                    programs: ['Healthcare management short-term courses']
                }
            ]
        },
        
        // Education roadmaps
        'mtech-cs': {
            title: 'M.Tech in Computer Science',
            description: 'Advanced degree that deepens knowledge in computer science. Andhra Pradesh has excellent institutions for technical education.',
            type: 'education',
            steps: [
                {
                    title: 'Preparation Stage',
                    description: 'Prepare for GATE exam or AP PGECET for admission in AP colleges.',
                    duration: '6-12 months',
                    activities: ['Study core CS subjects', 'Solve previous papers', 'Research AP colleges']
                },
                {
                    title: 'First Year: Core Courses',
                    description: 'Study advanced subjects in institutions like IIIT Sri City or JNTU.',
                    duration: '1 year',
                    subjects: ['Advanced Algorithms', 'Machine Learning', 'Cloud Computing', 'Electives']
                },
                {
                    title: 'Second Year: Specialization',
                    description: 'Focus on specialization and complete thesis/project.',
                    duration: '1 year',
                    activities: ['Research work', 'Internship in AP tech companies', 'Thesis submission']
                },
                {
                    title: 'Placement',
                    description: 'Campus placements in AP or national companies.',
                    outcome: ['Software Engineer', 'Research Associate', 'Technical Consultant']
                }
            ],
            resources: [
                'AP PGECET preparation materials',
                'NPTEL online courses for GATE preparation',
                'Coaching centers in Vijayawada/Vizag for GATE',
                'Previous year question papers from AP universities'
            ],
            institutions: [
                {
                    name: 'Indian Institute of Technology (IIT), Tirupati',
                    specializations: ['AI & ML', 'Data Science', 'Cyber Security']
                },
                {
                    name: 'JNTU Kakinada',
                    specializations: ['Computer Science', 'Networking', 'Software Engineering']
                },
                {
                    name: 'Andhra University, Visakhapatnam',
                    specializations: ['Computer Science', 'Information Technology']
                }
            ]
        },
        
        'mba': {
            title: 'MBA (Master of Business Administration)',
            description: 'Comprehensive business education preparing for management roles. AP has several good B-schools.',
            type: 'education',
            steps: [
                {
                    title: 'Preparation Stage',
                    description: 'Prepare for ICET (AP state MBA entrance) or CAT/XAT.',
                    duration: '6-12 months',
                    activities: ['Quantitative aptitude', 'Verbal ability', 'Logical reasoning']
                },
                {
                    title: 'First Year: Core Subjects',
                    description: 'Study fundamental business disciplines in AP B-schools.',
                    duration: '1 year',
                    subjects: ['Marketing', 'Finance', 'Operations', 'HR', 'Business Strategy']
                },
                {
                    title: 'Second Year: Specialization',
                    description: 'Focus on chosen specialization like Finance, Marketing etc.',
                    duration: '1 year',
                    activities: ['Summer internship', 'Live projects with AP industries', 'Placement preparation']
                }
            ],
            resources: [
                'AP ICET preparation books',
                'Mock tests from local coaching centers',
                'Business newspapers like Eenadu Business',
                'Case studies from AP-based companies'
            ],
            institutions: [
                {
                    name: 'Indian Institute of Management (IIM), Visakhapatnam',
                    specializations: ['Finance', 'Marketing', 'Operations']
                },
                {
                    name: 'Andhra University School of Management',
                    specializations: ['Finance', 'HR', 'Marketing']
                },
                {
                    name: 'GITAM School of International Business',
                    specializations: ['International Business', 'Finance']
                }
            ]
        },
        
        'mpharm': {
            title: 'M.Pharm (Master of Pharmacy)',
            description: 'Advanced degree in pharmaceutical sciences. AP has a growing pharmaceutical industry in Visakhapatnam and Kakinada.',
            type: 'education',
            steps: [
                {
                    title: 'Preparation Stage',
                    description: 'Prepare for GPAT or AP PGECET for admission.',
                    duration: '6-12 months',
                    activities: ['Study pharmaceutical subjects', 'Solve previous papers']
                },
                {
                    title: 'First Year: Core Subjects',
                    description: 'Study advanced pharmaceutical sciences.',
                    duration: '1 year',
                    subjects: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy']
                },
                {
                    title: 'Second Year: Specialization',
                    description: 'Focus on chosen specialization and research project.',
                    duration: '1 year',
                    activities: ['Research work', 'Industry training', 'Thesis submission']
                }
            ],
            resources: [
                'GPAT preparation materials',
                'AP PGECET pharmacy syllabus',
                'Industrial visits to AP-based pharma companies',
                'Research papers from AP pharmaceutical colleges'
            ],
            institutions: [
                {
                    name: 'Andhra University College of Pharmaceutical Sciences',
                    specializations: ['Pharmaceutics', 'Pharmacology']
                },
                {
                    name: 'GITAM Institute of Pharmacy',
                    specializations: ['Pharmaceutical Analysis', 'Pharmacy Practice']
                },
                {
                    name: 'Vignan Pharmacy College, Guntur',
                    specializations: ['Industrial Pharmacy', 'Quality Assurance']
                }
            ]
        }
    };
    
    // Display roadmap based on path ID
    function displayRoadmap() {
        const roadmap = roadmaps[pathId];
        
        if (!roadmap) {
            // Handle invalid path ID
            careerTitle.textContent = 'Roadmap Not Found';
            careerDescription.textContent = 'The requested roadmap is not available.';
            return;
        }
        
        // Set page title and description
        document.title = `${roadmap.title} Roadmap - Andhra Career Pathfinder`;
        roadmapTitle.textContent = `Your path to ${roadmap.title} in Andhra Pradesh`;
        careerTitle.textContent = roadmap.title;
        careerDescription.textContent = roadmap.description;
        
        // Display timeline
        displayTimeline(roadmap);
        
        // Display resources
        displayResources(roadmap.resources);
        
        // Display institutions
        displayInstitutions(roadmap.institutions);
    }
    
    function displayTimeline(roadmap) {
        let html = '';
        
        if (roadmap.type === 'career') {
            roadmap.steps.forEach((step, index) => {
                html += `
                    <div class="timeline-item">
                        <div class="timeline-marker">${index + 1}</div>
                        <div class="timeline-content">
                            <h3>${step.title}</h3>
                            <div class="timeline-duration">${step.duration}</div>
                            <p>${step.description}</p>
                            
                            <div class="timeline-skills">
                                <h4>Key Skills to Develop:</h4>
                                <ul>
                                    ${step.skills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else if (roadmap.type === 'education') {
            roadmap.steps.forEach((step, index) => {
                html += `
                    <div class="timeline-item">
                        <div class="timeline-marker">${index + 1}</div>
                        <div class="timeline-content">
                            <h3>${step.title}</h3>
                            ${step.duration ? `<div class="timeline-duration">${step.duration}</div>` : ''}
                            <p>${step.description}</p>
                            
                            <div class="timeline-details">
                                ${step.subjects ? `
                                    <h4>Subjects:</h4>
                                    <ul>
                                        ${step.subjects.map(subject => `<li>${subject}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                
                                ${step.activities ? `
                                    <h4>Key Activities:</h4>
                                    <ul>
                                        ${step.activities.map(activity => `<li>${activity}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                
                                ${step.outcome ? `
                                    <h4>Career Outcomes:</h4>
                                    <ul>
                                        ${step.outcome.map(out => `<li>${out}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        timeline.innerHTML = html;
    }
    
    function displayResources(resources) {
        let html = '';
        
        resources.forEach(resource => {
            html += `<li>${resource}</li>`;
        });
        
        resourceList.innerHTML = html;
    }
    
    function displayInstitutions(institutions) {
        let html = '';
        
        institutions.forEach(inst => {
            html += `
                <div class="institution-card">
                    <h4>${inst.name}</h4>
                    
                    ${inst.programs ? `
                        <div class="programs">
                            <h5>Programs Offered:</h5>
                            <ul>
                                ${inst.programs.map(program => `<li>${program}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${inst.specializations ? `
                        <div class="specializations">
                            <h5>Specializations Available:</h5>
                            <ul>
                                ${inst.specializations.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${inst.highlights ? `
                        <div class="highlights">
                            <h5>Highlights:</h5>
                            <ul>
                                ${inst.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        institutionsList.innerHTML = html;
    }
    
    // Initialize the page
    displayRoadmap();
});
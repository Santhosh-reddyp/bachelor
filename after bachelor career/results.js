document.addEventListener('DOMContentLoaded', function() {
    // Get user responses from localStorage
    const userResponses = JSON.parse(localStorage.getItem('quizResponses'));
    
    // Process responses and generate recommendations
    const recommendations = generateRecommendations(userResponses);
    
    // Display recommendations
    displayRecommendations(recommendations);
    
    function generateRecommendations(responses) {
        // This would contain logic to match user responses with career/education options
        // Return top 3 recommendations
        
        // Sample logic:
        const allOptions = [
            { 
                title: "Software Developer", 
                type: "career",
                matchScore: calculateMatchScore(responses, ["B.Tech", "Computer Science"], ["Technology", "Programming"])
            },
            { 
                title: "Data Scientist", 
                type: "career",
                matchScore: calculateMatchScore(responses, ["B.Tech", "B.Sc"], ["Technology", "Data Analysis"])
            },
            { 
                title: "MBA", 
                type: "education",
                matchScore: calculateMatchScore(responses, ["B.Tech", "BBA", "B.Com"], ["Business", "Leadership"])
            },
            // More options...
        ];
        
        // Sort by match score and return top 3
        return allOptions.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
    }
    
    function calculateMatchScore(responses, degrees, interests) {
        // Calculate how well this option matches user responses
        let score = 0;
        
        if (degrees.includes(responses.degree)) score += 30;
        if (interests.some(i => responses.interests.includes(i))) score += 20;
        // More matching criteria...
        
        return score;
    }
    
    function displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations-container');
        
        recommendations.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <h3>${index + 1}. ${rec.title}</h3>
                <p>${rec.type === 'career' ? 'Career Path' : 'Higher Education'}</p>
                <a href="roadmap.html?path=${encodeURIComponent(rec.title.toLowerCase().replace(/ /g, '-'))}&type=${rec.type}" class="cta-button">View Roadmap</a>
            `;
            container.appendChild(card);
        });
    }
});
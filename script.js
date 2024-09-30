const form = document.getElementById('campaign-form');
const responseContainer = document.getElementById('response-container');
const API_URL = '18.191.132.231:5000';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const customerData = {
        Age: parseInt(document.getElementById('age').value),
        Income: parseInt(document.getElementById('income').value),
        Engagement_Rate: parseFloat(document.getElementById('engagement-rate').value),
    };
    const prompt = document.getElementById('prompt').value;
    const metrics = {
        CTR: parseFloat(document.getElementById('ctr').value),
        conversion_rate: parseFloat(document.getElementById('conversion-rate').value),
        engagement_rate: parseFloat(document.getElementById('engagement-rate-metrics').value),
        bounce_rate: parseFloat(document.getElementById('bounce-rate').value),
    };

    const data = {
        customer_data: customerData,
        prompt: prompt,
        metrics: metrics,
    };

    fetch(`${API_URL}/process_campaign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        const segment = data.segment;
        const generatedContent = data.generated_content;
        const optimization = data.optimization;
        const performanceSuggestions = data.performance_suggestions;

        const responseHtml = `
            <h2>Results</h2>
            <p>Segment: ${segment}</p>
            <p>Generated Content: ${generatedContent}</p>
            <p>Optimization: ${JSON.stringify(optimization)}</p>
            <p>Performance Suggestions: ${JSON.stringify(performanceSuggestions)}</p>
        `;

        responseContainer.innerHTML = responseHtml;
    })
    .catch((error) => console.error('Error:', error));
});
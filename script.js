// Simulated documentation fetcher
const docSources = {
    segment: "https://segment.com/docs/",
    mparticle: "https://docs.mparticle.com/",
    lytics: "https://docs.lytics.com/",
    zeotap: "https://docs.zeotap.com/home/en-us/"
};

const fetchDocs = async (cdp) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const docs = {
                segment: {
                    "set up a new source": "Go to Sources, click 'Add Source,' select type, and follow the wizard. See docs.",
                    "create an audience": "Navigate to Audiences, click 'Create Audience,' define criteria, and save."
                },
                mparticle: {
                    "create a user profile": "Use User Profiles, input data, and configure identity resolution.",
                    "set up an integration": "Go to Connections, select output, configure keys, and map data."
                },
                lytics: {
                    "build an audience segment": "In Audiences, click 'Create Segment,' set criteria, and save.",
                    "configure a data connector": "Go to Data, select 'Add Connector,' and follow the setup."
                },
                zeotap: {
                    "integrate my data": "Use Data Integration portal, upload data or connect via API, map fields.",
                    "create a campaign": "Go to Campaigns, click 'New Campaign,' select audience, configure targeting."
                }
            };
            resolve(docs[cdp] || {});
        }, 1000);
    });
};

let chatHistory = [];

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim().toLowerCase();
    if (!message) return;

    addMessage('user', message);
    input.value = '';

    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'block';

    const response = await processQuestion(message);
    typingIndicator.style.display = 'none';
    addMessage('bot', response);
}

function addMessage(type, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatHistory.push({ type, text });
}

async function processQuestion(question) {
    // Greeting handling
    if (question.match(/^(hello|hi|hey)(\s|$)/i)) {
        return "Hello! How can I assist you with Segment, mParticle, Lytics, or Zeotap today?";
    }

    // Size check
    if (question.length > 500) {
        return "Your question is too long. Please simplify it to a concise 'how-to' question about Segment, mParticle, Lytics, or Zeotap.";
    }

    // Relevance check
    if (!question.match(/how/i)) {
        return "Please ask a 'how-to' question related to Segment, mParticle, Lytics, or Zeotap.";
    }

    // Extract CDP
    const cdpMatch = question.match(/(segment|mparticle|lytics|zeotap)/i);
    const cdp = cdpMatch ? cdpMatch[0].toLowerCase() : null;
    if (!cdp) {
        return "Please specify a CDP (Segment, mParticle, Lytics, or Zeotap) in your question.";
    }

    // Extract task
    let task = question.replace(/how\s+(can\s+|do\s+|to\s+)?/i, '').replace(cdp, '').trim();
    task = normalizeTask(task);

    // Fetch documentation
    const docs = await fetchDocs(cdp);
    let response = findMatchingResponse(docs, task);

    if (response) {
        return `${response} For more details, visit ${docSources[cdp]}.`;
    }

    // Cross-CDP comparison
    if (question.includes('compare') || question.includes('difference')) {
        return await compareCDPs(cdp, task, question);
    }

    // Advanced question
    if (question.includes('advanced') || question.includes('configure')) {
        return await handleAdvancedQuestion(cdp, task, docs);
    }

    return `I couldn’t find specific steps for "${task}" in ${cdp}. Try checking ${docSources[cdp]} or rephrasing your question (e.g., "How do I integrate my data in Zeotap?").`;
}

function normalizeTask(task) {
    return task.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .replace('a ', '')
        .replace('with', '')
        .replace('in in', 'in')
        .trim();
}

function findMatchingResponse(docs, task) {
    for (let key in docs) {
        const normalizedKey = normalizeTask(key);
        if (normalizedKey.includes(task) || task.includes(normalizedKey) ||
            (task.includes('integrate') && normalizedKey.includes('integrate')) ||
            (task.includes('configure') && normalizedKey.includes('integrate')) ||
            (task.includes('set up') && normalizedKey.includes('set up')) ||
            (task.includes('build') && normalizedKey.includes('build'))) {
            return docs[key];
        }
    }
    return null;
}

async function compareCDPs(cdp1, task, question) {
    // Extract the actual task for comparison by removing comparison keywords
    let cleanTask = task.replace(/(compare|difference|to|for)/g, '').trim();
    cleanTask = normalizeTask(cleanTask);

    let comparison = `Comparing how to ${cleanTask}:\n\n`;
    const docs1 = await fetchDocs(cdp1);
    comparison += `- ${cdp1}: ${findMatchingResponse(docs1, cleanTask) || 'No info available.'} (See ${docSources[cdp1]})\n`;

    const otherCDPs = ['segment', 'mparticle', 'lytics', 'zeotap'].filter(cdp => cdp !== cdp1);
    for (let cdp of otherCDPs) {
        const docs = await fetchDocs(cdp);
        comparison += `- ${cdp}: ${findMatchingResponse(docs, cleanTask) || 'No info available.'} (See ${docSources[cdp]})\n`;
    }
    return comparison;
}

async function handleAdvancedQuestion(cdp, task, docs) {
    const baseResponse = findMatchingResponse(docs, task);
    if (baseResponse) {
        return `${baseResponse} For advanced configuration, you might need to use ${cdp.charAt(0).toUpperCase() + cdp.slice(1)}’s API or custom settings. Check ${docSources[cdp]}advanced/ for detailed guides.`;
    }
    return `I couldn’t find basic steps for "${task}" in ${cdp}. For advanced integrations, explore API options or expert guides at ${docSources[cdp]}advanced/.`;
}

document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
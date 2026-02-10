const chatSection = document.getElementById('chatSection');
const messagesDiv = document.getElementById('messages');
const placeholder = document.getElementById('placeholder');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const themeToggle = document.getElementById('themeToggle');

// YOUR BACKEND URL
const BACKEND_URL = 'https://anne-io.onrender.com/chat';

let chatHistory = [];

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Remove placeholder on first message
    if (placeholder) placeholder.remove();

    // Append User Message
    appendMessage('me', text);
    userInput.value = '';

    // Show "typing..."
    const typingId = showTypingIndicator();

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: text, 
                history: chatHistory 
            })
        });

        const data = await response.json();
        
        // Remove typing and show Anne's reply
        removeTypingIndicator(typingId);
        appendMessage('anne', data.reply);

        // Update History for context
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: data.reply });
        
        // Keep history short for performance
        if (chatHistory.length > 10) chatHistory.shift();

    } catch (error) {
        removeTypingIndicator(typingId);
        appendMessage('anne', 'network issue yaarr.. check your connection?');
        console.error('Error:', error);
    }
}

function appendMessage(sender, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${sender}`;
    
    // Minimalist iOS style bubble
    wrapper.innerHTML = `
        <div class="bubble">${text}</div>
        <button class="copy-btn" onclick="copyText(this, \`${text.replace(/`/g, "\\`")}\`)">copy</button>
    `;
    
    messagesDiv.appendChild(wrapper);
    scrollToBottom();
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper anne`;
    wrapper.id = id;
    wrapper.innerHTML = `<div class="bubble" style="opacity: 0.5;">typing...</div>`;
    messagesDiv.appendChild(wrapper);
    scrollToBottom();
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    chatSection.scrollTo({
        top: chatSection.scrollHeight,
        behavior: 'smooth'
    });
}

function copyText(btn, text) {
    navigator.clipboard.writeText(text);
    btn.innerText = 'copied!';
    setTimeout(() => btn.innerText = 'copy', 2000);
}

// UI Functionalities
document.getElementById('menuBtn').onclick = () => {
    document.getElementById('dropdownMenu').classList.toggle('hidden');
};

document.getElementById('refreshBtn').onclick = () => {
    chatHistory = [];
    messagesDiv.innerHTML = '';
    location.reload();
};

themeToggle.onclick = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    themeToggle.innerText = isDark ? 'Light Mode' : 'Dark Mode';
};

// Listeners
sendBtn.onclick = sendMessage;
userInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};


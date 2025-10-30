// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.querySelector('.chat-input button');
    const suggestedPrompts = document.getElementById('suggested-prompts');
    const mainPrompt = document.getElementById('main-prompt');

    // Toggle chat window
    function toggleChat() {
        chatWindow.classList.toggle('active');
        chatIcon.style.display = chatWindow.classList.contains('active') ? 'none' : 'block';
        closeIcon.style.display = chatWindow.classList.contains('active') ? 'block' : 'none';
        
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    }

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            const responses = [
                "I'm here to help with any questions you have about our services.",
                "Thanks for your message! How can I assist you today?",
                "I'll get back to you with more information shortly.",
                "That's a great question! Let me find that information for you."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, false);
        }, 1000);
    }

    // Event listeners
    chatToggle.addEventListener('click', toggleChat);
    
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Handle suggested prompts
    function selectQuickReply(type) {
        let message = '';
        switch(type) {
            case 'services':
                message = 'Tell me more about your services';
                break;
            case 'demo':
                message = 'I want to book a demo';
                break;
            case 'pricing':
                message = 'What are your pricing plans?';
                break;
            case 'support':
                message = 'I need support with my account';
                break;
            default:
                message = type;
        }
        
        // Hide suggested prompts after selection
        suggestedPrompts.style.display = 'none';
        mainPrompt.style.display = 'none';
        
        // Add user message
        addMessage(message, true);
        
        // Simulate bot response
        setTimeout(() => {
            addMessage("Thanks for your interest! Let me get that information for you.", false);
        }, 1000);
    }

    // Initialize chat with welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your AiViqo assistant. How can I help you today?", false);
    }, 500);
});

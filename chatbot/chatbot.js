// AiViqo Chatbot Knowledge Base and Logic
class AiViqoChatbot {
    constructor() {
        this.isOpen = false;
        this.currentFlow = null;
        this.userContext = {};
        this.responses = this.initializeResponses();
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkFirebaseAvailability();
    }

    checkFirebaseAvailability() {
        // Check if Firebase is properly loaded
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded');
            return false;
        }
        
        // Check if Firestore is available
        if (!firebase.firestore) {
            console.warn('Firestore not available');
            return false;
        }
        
        // Check if our db instance is available
        if (!window.db) {
            console.warn('Firestore instance not initialized');
            return false;
        }
        
        console.log('Firebase and Firestore are properly initialized');
        return true;
    }

    bindEvents() {
        // Lead form submission
        const leadForm = document.getElementById('lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', (e) => this.handleLeadSubmission(e));
        }
        
        // Demo form submission
        const demoForm = document.getElementById('demo-form');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => this.handleDemoSubmission(e));
        }
        
        // Demo service selection
        const demoService = document.getElementById('demo-service');
        if (demoService) {
            demoService.addEventListener('change', (e) => this.handleDemoServiceChange(e));
        }
        
        // Back button functionality for mobile
        const backIcon = document.getElementById('back-icon');
        if (backIcon) {
            backIcon.addEventListener('click', () => this.handleBackButton());
        }
        
        // Check device size and update UI accordingly
        this.updateUIForDeviceSize();
        window.addEventListener('resize', () => this.updateUIForDeviceSize());
    }

    // New function to handle Book Demo button click
    openChatAndRequestDemo() {
        // Open the chatbot if it's not already open
        if (!this.isOpen) {
            this.toggleChat();
        }
        
        // Wait for chat to open, then directly show demo form
        setTimeout(() => {
            this.addBotMessage("Great! I'd love to help you book a demo. Let me open the demo request form for you.");
            this.showDemoModal();
        }, 500);
    }

    initializeResponses() {
        return {
            greetings: [
                "Hi! I'm your AiViqo Assistant. How can I help you today?",
                "Hello! Welcome to AiViqo. What would you like to know about our AI automation services?",
                "Hey there! I'm here to help you discover how AiViqo can automate your business processes. What interests you?"
            ],
            services: {
                general: "AiViqo specializes in 5 core areas:\n\n🔧 **AI Workflow Automation** - Automate repetitive tasks and connect your tools\n\n💬 **AI Voice & Chat Agents** - Build intelligent agents for customer interaction\n\n📱 **WhatsApp & Instagram Bots** - Fully automated messaging with custom logic\n\n☁️ **SaaS Automation** - Integrate and automate your favorite platforms\n\n🤖 **Custom Chatbot Builders** - Tailored chatbots for websites and apps\n\nWhich service interests you most?",
                
                'workflow-automation': "Our **AI Workflow Automation** service helps you:\n\n✅ Automate repetitive tasks\n✅ Connect CRMs, sheets, forms, and emails\n✅ Create custom workflows\n✅ Save hours of manual work daily\n\nTypical automation takes 1-2 weeks to implement. Would you like to book a demo to see how this works for your business?",
                
                'voice-chat-agents': "Our **AI Voice & Chat Agents** can:\n\n🗣️ Speak with leads naturally\n❓ Answer customer questions 24/7\n📅 Book appointments automatically\n🎯 Qualify leads intelligently\n\nThese agents integrate with your existing systems. Interested in seeing a live demo?",
                
                'whatsapp-instagram': "Our **WhatsApp & Instagram Bot** services include:\n\n📲 Automated DM responses\n🎯 Custom business logic\n📊 Lead qualification\n🔄 CRM integration\n⚡ Instant customer support\n\nPerfect for e-commerce and service businesses. Want to see how this could work for you?",
                
                'saas-automation': "Our **SaaS Automation** connects your tools:\n\n🔗 Zapier-style integrations\n📈 Advanced workflow logic\n🎯 Custom API connections\n⚡ Real-time data sync\n📊 Automated reporting\n\nWe work with 100+ popular platforms. What tools do you currently use?",
                
                'custom-chatbot': "Our **Custom Chatbot** solutions offer:\n\n🎨 Tailored design & personality\n🧠 Advanced AI logic\n🔗 Multi-platform deployment\n📊 Analytics & insights\n🔄 CRM integration\n\nBuilt for websites, apps, and messaging platforms. Ready to get started?"
            },
            
            about: "**About AiViqo:**\n\n🚀 We're a next-gen AI automation agency that helps businesses save time, reduce manual work, and grow faster using smart AI tools.\n\n👨‍💼 **Founded by:** Adnan Fida\n\n**Our Expert Team:**\n• Shahzaib Azizwani - AI Automation Specialist\n• Muhammad Jameel - AI Automation Expert\n\n🌟 We've helped 100+ businesses automate their processes and scale efficiently. What automation challenge can we solve for you?",
            
            pricing: "Our pricing depends on the specific automation you need:\n\n💼 **Consultation:** Free initial assessment\n🔧 **Simple Automations:** Starting from $500\n🤖 **Custom Chatbots:** Starting from $1,000\n🚀 **Complex Workflows:** Custom pricing\n\nEach project includes setup, testing, and 30-day support. Would you like a personalized quote? I can collect some details and have our team prepare a custom proposal.",
            
            demo: "Great! I'd love to book a demo for you. Our demos typically cover:\n\n✅ Live automation examples\n✅ Custom solution walkthrough  \n✅ ROI analysis for your business\n✅ Implementation timeline\n\n📅 **Available:** Mon-Sat, 10 AM - 10 PM (PKT)\n\nI can open our booking calendar for you to schedule directly. Would you like to book your appointment now?",
            
            timeline: "Here are typical timelines for our services:\n\n⚡ **Simple Automations:** 3-7 days\n🤖 **Custom Chatbots:** 1-2 weeks\n🔧 **Workflow Automation:** 1-2 weeks\n🎯 **Complex Systems:** 2-4 weeks\n\nAll projects include testing and revisions. The exact timeline depends on your specific requirements. Want to discuss your project?",
            
            technology: "We use cutting-edge AI technology:\n\n🤖 **OpenAI GPT Models** for natural conversations\n🧠 **Custom AI Models** for specific use cases\n⚡ **API Integrations** with 100+ platforms\n🔗 **Webhook Systems** for real-time processing\n☁️ **Cloud Infrastructure** for scalability\n\nOur solutions are built to be reliable, scalable, and future-proof. Any specific tech questions?",
            
            support: "**AiViqo Support:**\n\n📧 **Email:** info@aiviqo.com\n⏰ **Hours:** Mon-Sat, 10 AM - 10 PM (PKT)\n🌐 **Website:** aiviqo.com\n\n**What we offer:**\n✅ Free consultation\n✅ Technical support\n✅ Custom solutions\n✅ Implementation guidance\n\nWould you like me to connect you with a human specialist right now?",
            
            contact: "**Get in Touch:**\n\n📧 **Email:** info@aiviqo.com\n🌐 **Website:** aiviqo.com\n⏰ **Business Hours:** Mon-Sat, 9 AM - 10 PM (PKT)\n\n**Quick Actions:**\n• Book a free consultation\n• Get a custom quote\n• Speak with our team\n\nWhat would you prefer?",
            
            offTopic: "I'm an AI assistant for AiViqo, specializing in AI automation services. I can help you with:\n\n🔧 **Our Services** - AI workflow automation, chatbots, voice agents\n📅 **Booking Demos** - Schedule consultations\n💰 **Pricing Information** - Get cost estimates\n🏢 **About AiViqo** - Learn about our team and company\n\nFor other topics, I'd recommend reaching out to our team directly at info@aiviqo.com. How can I help you with AiViqo's services?"
        };
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');
        const mainPrompt = document.getElementById('main-prompt');
        const suggestedPrompts = document.getElementById('suggested-prompts');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.add('active');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            
            // Hide initial elements when chat is active
            if (mainPrompt) mainPrompt.style.display = 'none';
            if (suggestedPrompts) suggestedPrompts.style.display = 'none';
            
            // Track chat opened
            if (window.analytics) {
                window.analytics.logEvent('chat_opened');
            }
        } else {
            chatWindow.classList.remove('active');
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            
            // Show initial elements when chat is closed
            if (mainPrompt) mainPrompt.style.display = 'block';
            if (suggestedPrompts) suggestedPrompts.style.display = 'flex';
            
            // Track chat closed
            if (window.analytics) {
                window.analytics.logEvent('chat_closed');
            }
        }
    }

    openChat(flow = null) {
        if (!this.isOpen) {
            this.toggleChat();
        }
        
        if (flow) {
            this.currentFlow = flow;
            setTimeout(() => {
                if (flow === 'demo') {
                    this.addBotMessage(this.responses.demo);
                    this.showQuickReplies(['collect-lead', 'pricing', 'support']);
                }
            }, 500);
        }
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            // Clean message from markdown formatting
            const cleanMessage = message.replace(/\*\*/g, '').replace(/\*/g, '');
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p></p>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            
            // Start typing effect
            this.typeMessage(messageDiv.querySelector('p'), cleanMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, Math.random() * 1000 + 500);
    }

    typeMessage(element, message, index = 0) {
        if (index < message.length) {
            // Handle line breaks
            if (message.substr(index, 1) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += message.charAt(index);
            }
            
            // Scroll to bottom as we type
            const messagesContainer = document.getElementById('chat-messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Random typing speed for more natural feel
            const typingSpeed = Math.random() * 30 + 20;
            setTimeout(() => this.typeMessage(element, message, index + 1), typingSpeed);
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }



    showQuickReplies(replies) {
        const suggestedPromptsContainer = document.getElementById('suggested-prompts');
        if (!suggestedPromptsContainer) return;
        
        suggestedPromptsContainer.innerHTML = '';
        
        const replyButtons = {
            'collect-lead': 'Get Started',
            'demo': 'Book Demo',
            'pricing': 'Get Pricing',
            'services': 'Our Services',
            'support': 'Contact Support',
            'about': 'About Us',
            'human': 'Talk to Human',
            'book-calendly': 'Book Appointment',
            'error': 'What\'s causing this error?',
            'contrast': 'Is contrast strong enough?'
        };
        
        replies.forEach(reply => {
            if (replyButtons[reply]) {
                const button = document.createElement('button');
                button.className = 'suggested-prompt';
                button.innerHTML = replyButtons[reply];
                button.onclick = () => this.selectQuickReply(reply);
                suggestedPromptsContainer.appendChild(button);
            }
        });
    }

    selectQuickReply(type) {
        // Add user message
        const replyTexts = {
            'services': 'Tell me about your services',
            'demo': 'I want to book a demo',
            'pricing': 'What are your prices?',
            'support': 'I need support',
            'about': 'Tell me about AiViqo',
            'collect-lead': 'I want to get started',
            'book-calendly': 'I want to book an appointment',
            'human': 'I want to talk to a human'
        };
        
        this.addUserMessage(replyTexts[type] || type);
        this.processUserInput(type);
    }

    processUserInput(input) {
        const lowerInput = input.toLowerCase();
        
        // Clear suggested prompts
        const suggestedPrompts = document.getElementById('suggested-prompts');
        if (suggestedPrompts) {
            suggestedPrompts.innerHTML = '';
        }
        
        // Service-specific responses
        if (lowerInput.includes('service') || input === 'services') {
            this.addBotMessage(this.responses.services.general);
            this.showQuickReplies(['demo', 'pricing', 'collect-lead']);
            return;
        }
        
        if (lowerInput.includes('workflow') || lowerInput.includes('automation')) {
            this.addBotMessage(this.responses.services['workflow-automation']);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        if (lowerInput.includes('chatbot') || lowerInput.includes('chat')) {
            this.addBotMessage(this.responses.services['custom-chatbot']);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        if (lowerInput.includes('whatsapp') || lowerInput.includes('instagram')) {
            this.addBotMessage(this.responses.services['whatsapp-instagram']);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        if (lowerInput.includes('voice') || lowerInput.includes('agent')) {
            this.addBotMessage(this.responses.services['voice-chat-agents']);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        if (lowerInput.includes('saas')) {
            this.addBotMessage(this.responses.services['saas-automation']);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        // General responses
        if (lowerInput.includes('price') || lowerInput.includes('cost') || input === 'pricing') {
            this.addBotMessage(this.responses.pricing);
            this.showQuickReplies(['collect-lead', 'demo', 'services']);
            return;
        }
        
        if (lowerInput.includes('demo') || input === 'demo') {
            this.showDemoModal();
            return;
        }
        
        if (lowerInput.includes('about') || lowerInput.includes('company') || input === 'about') {
            this.addBotMessage(this.responses.about);
            this.showQuickReplies(['services', 'demo', 'collect-lead']);
            return;
        }
        
        if (lowerInput.includes('founder') || lowerInput.includes('adnan') || lowerInput.includes('fida') || lowerInput.includes('who founded') || lowerInput.includes('who started')) {
            this.addBotMessage("**AiViqo Founder:**\n\n👨‍💼 **Adnan Fida** - Founder & CEO of AiViqo\n\nAdnan founded AiViqo to help businesses harness the power of AI automation. Under his leadership, we've helped 100+ companies streamline their operations and scale efficiently.\n\n🌟 Want to learn more about our team or services?");
            this.showQuickReplies(['about', 'services', 'demo']);
            return;
        }
        
        if (lowerInput.includes('team') || lowerInput.includes('members') || lowerInput.includes('shahzaib') || lowerInput.includes('jameel') || lowerInput.includes('who works')) {
            this.addBotMessage("**Meet the AiViqo Team:**\n\n👨‍💼 **Adnan Fida** - Founder & CEO\n\n🤖 **Shahzaib Azizwani** - AI Automation Specialist\nExpert in workflow automation and AI integrations\n\n⚡ **Muhammad Jameel** - AI Automation Expert\nSpecializes in custom AI solutions and chatbot development\n\nTogether, we've automated processes for 100+ businesses. Ready to see what we can do for you?");
            this.showQuickReplies(['services', 'demo', 'collect-lead']);
            return;
        }
        
        if (lowerInput.includes('support') || lowerInput.includes('help') || input === 'support') {
            this.addBotMessage(this.responses.support);
            this.showQuickReplies(['human', 'services', 'demo']);
            return;
        }
        
        if (lowerInput.includes('contact') || input === 'contact') {
            this.addBotMessage("📧 **Direct Contact:**\n\nEmail: info@aiviqo.com\n\nOur team will respond within 24 hours. You can also book a demo or schedule a call through our calendar.");
            this.showQuickReplies(['book-calendly', 'demo', 'services']);
            return;
        }
        
        if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('timeline')) {
            this.addBotMessage(this.responses.timeline);
            this.showQuickReplies(['demo', 'collect-lead', 'pricing']);
            return;
        }
        
        if (lowerInput.includes('technology') || lowerInput.includes('openai') || lowerInput.includes('model')) {
            this.addBotMessage(this.responses.technology);
            this.showQuickReplies(['services', 'demo', 'collect-lead']);
            return;
        }
        
        if (lowerInput.includes('start') || input === 'collect-lead') {
            this.showLeadModal();
            return;
        }
        
        if (lowerInput.includes('book') && (lowerInput.includes('appointment') || lowerInput.includes('calendar') || lowerInput.includes('schedule') || lowerInput.includes('meeting'))) {
            this.showCalendlyModal();
            return;
        }
        
        if (input === 'book-calendly') {
            this.showCalendlyModal();
            return;
        }
        
        if (lowerInput.includes('human') || lowerInput.includes('person') || input === 'human') {
            this.addBotMessage("I'll connect you with our team right away!\n\n📧 **Email us:** info@aiviqo.com\n⏰ **Available:** Mon-Sat, 10 AM - 10 PM (PKT)\n\nOr share your contact details and we'll reach out within an hour!");
            this.showQuickReplies(['collect-lead', 'services']);
            return;
        }
        
        // Greetings
        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            this.addBotMessage(this.responses.greetings[Math.floor(Math.random() * this.responses.greetings.length)]);
            this.showQuickReplies(['services', 'demo', 'pricing', 'about']);
            return;
        }
        
        // Check for off-topic questions
        const offTopicKeywords = [
            'weather', 'sports', 'politics', 'news', 'music', 'movies', 'food', 'travel', 
            'health', 'fitness', 'education', 'entertainment', 'gaming', 'shopping', 'fashion',
            'beauty', 'technology', 'science', 'history', 'art', 'literature', 'philosophy',
            'religion', 'politics', 'economics', 'finance', 'investment', 'real estate',
            'cooking', 'recipes', 'restaurants', 'hotels', 'vacation', 'tourism'
        ];
        
        const isOffTopic = offTopicKeywords.some(keyword => lowerInput.includes(keyword));
        
        if (isOffTopic) {
            this.addBotMessage(this.responses.offTopic);
            this.showQuickReplies(['services', 'demo', 'pricing', 'about']);
            return;
        }
        
        // Default response for unrecognized input
        this.addBotMessage("I'd be happy to help! Here are some things I can assist you with:\n\n🔧 **Our Services** - Learn about AI automation solutions\n📅 **Book Demo** - Schedule a free consultation\n💰 **Pricing** - Get cost estimates\n🏢 **About Us** - Learn about AiViqo\n🆘 **Support** - Get technical help\n\nWhat interests you most?");
        this.showQuickReplies(['services', 'demo', 'pricing', 'support']);
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            
            setTimeout(() => {
                this.processUserInput(message);
            }, 500);
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    showLeadModal() {
        const modal = document.getElementById('lead-modal');
        modal.classList.add('active');
        this.addBotMessage("Perfect! I've opened a form for you. Please fill in your details so our team can provide you with a personalized solution.");
    }

    showCalendlyModal() {
        const modal = document.getElementById('calendly-modal');
        modal.classList.add('active');
        this.addBotMessage("Great! I've opened our booking calendar for you. You can schedule your appointment directly with our team. The calendar will show available time slots for a 30-minute consultation.");
    }

    showDemoModal() {
        const modal = document.getElementById('demo-modal');
        modal.classList.add('active');
        this.addBotMessage("Perfect! I've opened a demo request form for you. Please fill in your details so our team can prepare a personalized demo for your business.");
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }

    async handleLeadSubmission(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('lead-name').value,
            email: document.getElementById('lead-email').value,
            business: document.getElementById('lead-business').value,
            service: document.getElementById('lead-service').value,
            contact: document.getElementById('lead-contact').value,
            timestamp: new Date(),
            type: 'lead'
        };
        
                try {
            // Save to Firestore
            await this.saveToFirestore(formData);
            
            // Track analytics
            if (window.analytics) {
                window.analytics.logEvent('lead_submitted', {
                    service: formData.service,
                    business_type: formData.business,
                    contact_method: formData.contact
                });
            }
            
            // Send email notification
            const emailResult = await window.sendEmailNotification(formData, 'lead');
            console.log('Email notification result:', emailResult);
            
            // Close modal
            this.closeModal('lead-modal');
            
            // Thank user
            this.addBotMessage(`Thank you, ${formData.name}! 🎉\n\nYour information has been received. Our team will contact you within 24 hours via ${formData.contact}.\n\n**Next Steps:**\n1. We'll review your requirements\n2. Prepare a custom solution\n3. Schedule a demo call\n4. Provide a detailed proposal\n\nAnything else I can help you with today?`);
            
            this.showQuickReplies(['services', 'pricing', 'support']);
            
            // Reset form
            document.getElementById('lead-form').reset();
            
        } catch (error) {
            console.error('Error saving lead:', error);
            const errorMessage = error.message || 'Unknown error occurred';
            this.addBotMessage(`Sorry, there was an error saving your information: ${errorMessage}\n\nPlease try again or contact us directly at info@aiviqo.com`);
        }
    }

    handleDemoServiceChange(event) {
        const customServiceGroup = document.getElementById('custom-service-group');
        if (event.target.value === 'other') {
            customServiceGroup.style.display = 'block';
        } else {
            customServiceGroup.style.display = 'none';
        }
    }

    async handleDemoSubmission(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('demo-name').value,
            email: document.getElementById('demo-email').value,
            company: document.getElementById('demo-company').value,
            service: document.getElementById('demo-service').value,
            customService: document.getElementById('demo-custom-service').value,
            companyType: document.getElementById('demo-company-type').value,
            description: document.getElementById('demo-description').value,
            timestamp: new Date(),
            type: 'demo'
        };
        
                try {
            // Save to Firestore
            await this.saveToFirestore(formData);
            
            // Track analytics
            if (window.analytics) {
                window.analytics.logEvent('demo_requested', {
                    service: formData.service,
                    company_type: formData.companyType,
                    has_custom_service: !!formData.customService
                });
            }
            
            // Send email notification
            const emailResult = await window.sendEmailNotification(formData, 'demo');
            console.log('Email notification result:', emailResult);
            
            // Close modal
            this.closeModal('demo-modal');
            
            // Thank user
            const firstName = formData.name.split(' ')[0];
            this.addBotMessage(`Thank you, ${firstName}! I've received your demo request and our team will contact you within 24 hours to schedule your personalized demo.`);
            
            // Clear form
            document.getElementById('demo-form').reset();
            document.getElementById('custom-service-group').style.display = 'none';
            
        } catch (error) {
            console.error('Error saving demo:', error);
            const errorMessage = error.message || 'Unknown error occurred';
            this.addBotMessage(`Sorry, there was an error saving your demo request: ${errorMessage}\n\nPlease try again or contact us directly at info@aiviqo.com`);
        }
    }

    async saveToFirestore(data) {
        try {
            // Check if Firestore is available
            if (!window.db || !this.checkFirebaseAvailability()) {
                console.warn('Firestore not available, using fallback storage');
                // Fallback to localStorage for demo purposes
                this.saveToLocalStorage(data);
                return { id: 'local_' + Date.now() };
            }
            
            // Clean and validate data before sending
            const cleanData = this.cleanDataForFirestore(data);
            
            // Add server timestamp if Firebase is available
            if (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue) {
                cleanData.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
            }
            
            // Save to Firestore
            const docRef = await window.db.collection('leads').add(cleanData);
            console.log('Document written with ID: ', docRef.id);
            return docRef;
        } catch (error) {
            console.error('Error adding document: ', error);
            
            // If Firestore fails, fallback to localStorage
            console.log('Falling back to localStorage due to Firestore error');
            this.saveToLocalStorage(data);
            return { id: 'local_' + Date.now() };
        }
    }

    // Fallback storage method
    saveToLocalStorage(data) {
        try {
            const leads = JSON.parse(localStorage.getItem('aiviqo_leads') || '[]');
            leads.push({
                ...data,
                id: 'local_' + Date.now(),
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('aiviqo_leads', JSON.stringify(leads));
            console.log('Data saved to localStorage as fallback');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    cleanDataForFirestore(data) {
        // Remove any undefined or null values that might cause Firestore errors
        const cleanData = {};
        
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null) {
                // Convert Date objects to ISO strings for better Firestore compatibility
                if (data[key] instanceof Date) {
                    cleanData[key] = data[key].toISOString();
                } else {
                    cleanData[key] = data[key];
                }
            }
        });
        
        return cleanData;
    }

    async sendEmailNotification(data, type) {
        const subject = type === 'demo' ? 'New Demo Request - AiViqo' : 'New Lead Request - AiViqo';
        
        let body = '';
        if (type === 'demo') {
            body = `
New Demo Request Received:

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Service: ${data.service}
Custom Service: ${data.customService || 'N/A'}
Company Type: ${data.companyType || 'N/A'}
Description: ${data.description || 'N/A'}

Submitted at: ${data.timestamp.toLocaleString()}
            `;
        } else {
            body = `
New Lead Request Received:

Name: ${data.name}
Email: ${data.email}
Business Type: ${data.business || 'N/A'}
Service: ${data.service || 'N/A'}
Contact Method: ${data.contact || 'N/A'}

Submitted at: ${data.timestamp.toLocaleString()}
            `;
        }
        
        const emailData = {
            to: 'advortexmain@gmail.com',
            subject: subject,
            body: body,
            type: type
        };
        
        console.log('Email notification data:', emailData);
        
        // For now, we'll log the email data
        // In production, you would send this to your email service
        // Example: await fetch('/api/send-email', { 
        //     method: 'POST', 
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(emailData) 
        // });
        
        // You can also use services like EmailJS, SendGrid, or your own email server
    }

    handleBackButton() {
        // On mobile, back button should go back to main chat interface
        if (window.innerWidth < 768) {
            // Show main prompt and suggested prompts
            const mainPrompt = document.getElementById('main-prompt');
            const suggestedPrompts = document.getElementById('suggested-prompts');
            
            if (mainPrompt) mainPrompt.style.display = 'block';
            if (suggestedPrompts) suggestedPrompts.style.display = 'flex';
            
            // Clear chat messages
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.innerHTML = '';
            }
            
            // Reset current flow
            this.currentFlow = null;
        } else {
            // On desktop, close the chat
            if (this.isOpen) {
                this.toggleChat();
            }
        }
    }

    updateUIForDeviceSize() {
        const chatWindow = document.getElementById('chat-window');
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');
        const mainPrompt = document.getElementById('main-prompt');
        const suggestedPrompts = document.getElementById('suggested-prompts');
        const backIcon = document.getElementById('back-icon');

        if (chatWindow && chatIcon && closeIcon && mainPrompt && suggestedPrompts && backIcon) {
            if (window.innerWidth < 768) { // For mobile screens
                chatWindow.classList.add('mobile-view');
                chatIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                backIcon.style.display = 'block';
                mainPrompt.style.display = 'none';
                suggestedPrompts.style.display = 'none';
            } else {
                chatWindow.classList.remove('mobile-view');
                chatIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                backIcon.style.display = 'none';
                mainPrompt.style.display = 'block';
                suggestedPrompts.style.display = 'flex';
            }
        }
    }
}

// Initialize chatbot
const chatbot = new AiViqoChatbot();

// Global functions for HTML onclick events
function toggleChat() {
    chatbot.toggleChat();
}

function openChat(flow) {
    chatbot.openChat(flow);
}

function selectQuickReply(type) {
    chatbot.selectQuickReply(type);
}

function sendMessage() {
    chatbot.sendMessage();
}

function handleKeyPress(event) {
    chatbot.handleKeyPress(event);
}

function closeModal(modalId) {
    chatbot.closeModal(modalId);
}

// Global function for Book Demo button
function openChatAndRequestDemo() {
    chatbot.openChatAndRequestDemo();
}

// Auto-initialize chatbot on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be ready before initializing chatbot
    const checkFirebaseReady = () => {
        if (window.db && window.analytics) {
            console.log('Firebase ready, initializing chatbot');
            // Initialize chatbot - no need to show quick replies initially
            // They will show when the chat is opened
        } else {
            console.log('Waiting for Firebase to be ready...');
            setTimeout(checkFirebaseReady, 200);
        }
    };
    
    checkFirebaseReady();
});


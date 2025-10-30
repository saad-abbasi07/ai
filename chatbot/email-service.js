// EmailJS Configuration for sending notifications
// You'll need to sign up at https://www.emailjs.com/ and get your credentials

// EmailJS configuration - Update these with your actual credentials
const EMAILJS_CONFIG = {
    serviceId: 'service_default', // Replace with your EmailJS service ID
    templateId: 'template_default', // Replace with your EmailJS template ID
    userId: 'user_default' // Replace with your EmailJS user ID
};

// Function to send email notification
async function sendEmailNotification(data, type) {
    try {
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not loaded, skipping email notification');
            return { success: true, message: 'EmailJS not available' };
        }
        
        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.userId);
        
        const templateParams = {
            to_email: 'advortexmain@gmail.com',
            subject: type === 'demo' ? 'New Demo Request - AiViqo' : 'New Lead Request - AiViqo',
            name: data.name || 'N/A',
            email: data.email || 'N/A',
            company: data.company || data.business || 'N/A',
            service: data.service || 'N/A',
            contact_method: data.contact || 'N/A',
            custom_service: data.customService || 'N/A',
            company_type: data.companyType || 'N/A',
            description: data.description || 'N/A',
            timestamp: data.timestamp ? data.timestamp.toLocaleString() : new Date().toLocaleString(),
            type: type
        };
        
        // For now, just log the email data instead of sending
        // This prevents the 400 error while still capturing the information
        console.log('Email notification data (not sent):', templateParams);
        
        // Uncomment the following lines when you have proper EmailJS credentials
        /*
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return response;
        */
        
        return { success: true, message: 'Email data logged (EmailJS not configured)' };
        
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't throw error, just log it
        return { success: false, message: error.message };
    }
}

// Export for use in chatbot
window.sendEmailNotification = sendEmailNotification; 
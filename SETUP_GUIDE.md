# AiViqo Chatbot Setup Guide

## 🔥 Firebase Firestore Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "aiviqo-chatbot"
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

### 3. Get Firebase Configuration
1. In Firebase Console, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Register app with name: "AiViqo Chatbot"
5. Copy the config object

### 4. Update Firebase Config
Replace the values in `chatbot/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
```

## 📧 EmailJS Setup (for Email Notifications)

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for free account
3. Verify your email

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook"
4. Connect your email account
5. Note the Service ID

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** {{subject}}

**Body:**
```
New {{type}} Request - AiViqo

Name: {{name}}
Email: {{email}}
Company: {{company}}
Service: {{service}}
Contact Method: {{contact_method}}
Custom Service: {{custom_service}}
Company Type: {{company_type}}
Description: {{description}}

Submitted at: {{timestamp}}

---
This is an automated notification from AiViqo Chatbot.
```

4. Save template and note the Template ID

### 4. Get User ID
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. Copy your Public Key (User ID)

### 5. Update EmailJS Config
Replace the values in `chatbot/email-service.js`:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'your-emailjs-service-id',
    templateId: 'your-emailjs-template-id', 
    userId: 'your-emailjs-user-id'
};
```

## 🔒 Security Rules (Firestore)

Add these security rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{document} {
      allow read, write: if true; // For development
      // For production, add proper authentication
    }
  }
}
```

## 📊 Data Structure

Your Firestore will have a `leads` collection with documents like:

**Lead Document:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "business": "E-commerce",
  "service": "AI Workflow Automation",
  "contact": "Email",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "type": "lead"
}
```

**Demo Document:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Tech Corp",
  "service": "Custom Chatbot",
  "customService": "AI-powered customer support",
  "companyType": "SaaS",
  "description": "Need chatbot for website",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "type": "demo"
}
```

## 🚀 Testing

1. Start your local server
2. Open the website
3. Test the chatbot forms
4. Check Firebase Console for new documents
5. Check your email for notifications

## 📱 Notifications

You'll receive email notifications at `advortexmain@gmail.com` for:
- New lead submissions
- New demo requests
- All form data included

## 🔧 Troubleshooting

### Firebase Issues:
- Check browser console for errors
- Verify Firebase config is correct
- Ensure Firestore is enabled

### EmailJS Issues:
- Check EmailJS dashboard for delivery status
- Verify template variables match
- Test with EmailJS playground

### Common Errors:
- "Firebase not initialized" → Check config
- "Email not sent" → Check EmailJS credentials
- "Permission denied" → Check Firestore rules

## 📈 Monitoring

Monitor your leads in:
1. **Firebase Console** → Firestore Database
2. **EmailJS Dashboard** → Email Logs
3. **Browser Console** → For debugging

## 🔄 Production Deployment

For production:
1. Update Firestore security rules
2. Use environment variables for configs
3. Set up proper email service
4. Add error monitoring
5. Test thoroughly before launch 
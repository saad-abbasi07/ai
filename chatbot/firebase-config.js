// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjou-7FACBpzVKcP8q47neBZlx63QlR5s",
    authDomain: "aiviqo-bca2b.firebaseapp.com",
    projectId: "aiviqo-bca2b",
    storageBucket: "aiviqo-bca2b.firebasestorage.app",
    messagingSenderId: "824162703638",
    appId: "1:824162703638:web:1b5f7beff865683ba39837",
    measurementId: "G-MQ6FPP5NJ3"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Initialize Firestore with proper settings
let db;
try {
    db = firebase.firestore();
    
    // Enable offline persistence without overriding settings
    db.enablePersistence({ synchronizeTabs: true })
        .then(() => {
            console.log('Firestore offline persistence enabled');
        })
        .catch((err) => {
            if (err.code === 'failed-precondition') {
                console.log('Multiple tabs open, persistence can only be enabled in one tab at a time');
            } else if (err.code === 'unimplemented') {
                console.log('The current browser does not support persistence');
            }
        });
    
    console.log('Firestore initialized successfully');
} catch (error) {
    console.error('Firestore initialization error:', error);
    db = null;
}

// Initialize Analytics
let analytics;
try {
    analytics = firebase.analytics();
    console.log('Analytics initialized successfully');
} catch (error) {
    console.error('Analytics initialization error:', error);
    analytics = null;
}

// Export for use in chatbot with a small delay to ensure proper initialization
setTimeout(() => {
    window.db = db;
    window.analytics = analytics;
    console.log('Firebase globals set for chatbot use');
}, 100);

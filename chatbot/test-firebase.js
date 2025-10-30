// Test Firebase Connection
// Add this to your HTML temporarily to test the connection

function testFirebaseConnection() {
    console.log('Testing Firebase connection...');
    
    if (window.db) {
        console.log('✅ Firestore is connected!');
        
        // Test write
        window.db.collection('test').add({
            test: true,
            timestamp: new Date(),
            message: 'Firebase connection test successful'
        }).then((docRef) => {
            console.log('✅ Test document written with ID: ', docRef.id);
            
            // Test read
            return window.db.collection('test').doc(docRef.id).get();
        }).then((doc) => {
            if (doc.exists) {
                console.log('✅ Test document read successfully:', doc.data());
            } else {
                console.log('❌ Test document not found');
            }
        }).catch((error) => {
            console.error('❌ Firebase test failed:', error);
        });
    } else {
        console.error('❌ Firestore not initialized');
    }
}

// Run test when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testFirebaseConnection, 2000); // Wait for Firebase to initialize
});

// Export for manual testing
window.testFirebaseConnection = testFirebaseConnection; 
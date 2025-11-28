const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (do this once at app startup)
// const serviceAccount = require('./path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

/**
 * Send FCM notification to Android device
 * @param {string} deviceToken - The FCM device token
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Optional data payload
 * @returns {Promise} - Firebase messaging response
 */
async function sendFCMNotification(deviceToken, title, body, data = {}) {
  const message = {
    token: deviceToken,
    notification: {
      title: title,
      body: body,
    },
    data: data,
    android: {
      priority: 'high',
      notification: {
        sound: 'default',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent FCM notification:', response);
    return response;
  } catch (error) {
    console.error('Error sending FCM notification:', error);
    throw error;
  }
}

// app.post('/api/test', (req, res) => {
//   const payload = req.body;

//   console.log('📦 Test API hit!', payload);
//   console.log('📦 Webhook hit from Shiprocket');


module.exports = { sendFCMNotification };
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./geochat-841c4-firebase-adminsdk-fbsvc-a87cf7a06a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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

// let deviceToken = "dwJZinH5QtSbXMqwavnY6t:APA91bH4Zp-xP8s7iXCODIZGtKKrzAOQv5MEecSEcHoAza-r0A9qs44P4PPSXkVN-ZRbh-3RREi6uGEhudnN_P6nWZt1et9sK0oQNh7WUuLh45ehSx_JUo0"
let deviceToken = "cWcSFUalS12cxUG4sCG4e8:APA91bHdVfJyR4nLx1CiczKC1dYIAHQTkFi2JNMTp4jQ-VFYqlJ2dK-JnUFukRzkCle8Xu5uhv7T7A0loG7EUQX5FwXfutlTY2qRAydRF0yTh89JPG9GJPY"
sendFCMNotification(deviceToken, "Test Title", "This is a test notification body", { key1: 'value1', key2: 'value2' });

module.exports = { sendFCMNotification };
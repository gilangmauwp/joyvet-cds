// Firebase project configuration — client-side by design (Firebase security enforced via Firestore rules).
// Replace the placeholder values below with your actual Firebase project config.
// See README.md §1 for setup instructions.

export const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId:             "REPLACE_WITH_YOUR_APP_ID",
};

// Application constants
export const APP_VERSION = '2.0.0';
export const BACKUP_INTERVAL_DAYS = 7; // Show overdue-backup banner after this many days

// Firebase project configuration — client-side by design (Firebase security enforced via Firestore rules).
// Replace the placeholder values below with your actual Firebase project config.
// See README.md §1 for setup instructions.

export const firebaseConfig = {
  apiKey:            "AIzaSyC3qxnhwretjGqXkYt4O_Q6Xpv4fl0G-CA",
  authDomain:        "joyvet-care.firebaseapp.com",
  projectId:         "joyvet-care",
  storageBucket:     "joyvet-care.firebasestorage.app",
  messagingSenderId: "300223001036",
  appId:             "1:300223001036:web:7c1f1647e1f79e69306d69",
};

// Application constants
export const APP_VERSION = '2.0.0';
export const BACKUP_INTERVAL_DAYS = 7; // Show overdue-backup banner after this many days

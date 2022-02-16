import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJZqMng6Pfd55ePGzjJgqYFHep9ynduBU',
  authDomain: 'fir-testapp-2dcf7.firebaseapp.com',
  projectId: 'fir-testapp-2dcf7',
  storageBucket: 'fir-testapp-2dcf7.appspot.com',
  messagingSenderId: '148546050541',
  appId: '1:148546050541:web:733bbd4f3c303fb7e7efe4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };

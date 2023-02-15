// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAFOU7sxbSV8ZEW6OIKmNn6-OrBpsivYiY",
  authDomain: "kfm247-8bfab.firebaseapp.com",
  databaseURL: "https://kfm247-8bfab-default-rtdb.firebaseio.com",
  projectId: "kfm247-8bfab",
  storageBucket: "kfm247-8bfab.appspot.com",
  messagingSenderId: "209586149489",
  appId: "1:209586149489:web:809bbcf303b66f7cc1e3d0",
  measurementId: "G-GE7RNF4H74",
};

// Initialize Firebase
const app = isSupported().then(() => {
  initializeApp(firebaseConfig);
});
const messaging = isSupported().then(() => {
  getMessaging(app);
});

export const getDeviceToken = async () => {
  try {
    const data = await getToken(messaging, {
      vapidKey:
        "BEiemo-EEsLmFx0hrj5D9h__ThXdNIMuaoNdr7wI6I3AQ1-XhGgikmQP0n6_frICKtznlob412OJlALmD8LRh-A",
    });

    if (data) {
      console.log({ tokenData: data });
      return data;
    }
  } catch (error) {
    console.log({ tokenError: error });
    return "";
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Substitua as informações abaixo pelas credenciais do seu projeto Firebase
// 1. Crie um projeto em https://console.firebase.google.com/
// 2. Adicione um app Web e ative a autenticação por Email/Senha
// 3. Copie o firebaseConfig e cole aqui:
const firebaseConfig = {
  apiKey: "AIzaSyDP1_ktaPCAZYRKEMCegaouGlaXFs9tsRY",
  authDomain: "lab-track-ueg.firebaseapp.com",
  projectId: "lab-track-ueg",
  storageBucket: "lab-track-ueg.firebasestorage.app",
  messagingSenderId: "635888953371",
  appId: "1:635888953371:web:a4340501470f7fe000f0be",
  measurementId: "G-C7JQ9RM8KH"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  console.warn("Firebase não configurado. Substitua as credenciais no arquivo firebase.js");
}

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword, onAuthStateChanged };

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Substitua as informações abaixo pelas credenciais do seu projeto Firebase
// 1. Crie um projeto em https://console.firebase.google.com/
// 2. Adicione um app Web e ative a autenticação por Email/Senha
// 3. Copie o firebaseConfig e cole aqui:
const firebaseConfig = {
  apiKey: "AIzaSyDP1_ktapCAZYRKEMCegaouGLaxFs9tsRY",
  authDomain: "lab-track-ueg.firebaseapp.com",
  projectId: "lab-track-ueg",
  storageBucket: "lab-track-ueg.firebasestorage.app",
  messagingSenderId: "635888953371",
  appId: "1:635888953371:web:a4340501470f7fe000f0be"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (e) {
  console.warn("Firebase não configurado. Substitua as credenciais no arquivo firebase.js");
}

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };

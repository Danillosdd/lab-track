import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Substitua as informações abaixo pelas credenciais do seu projeto Firebase
// 1. Crie um projeto em https://console.firebase.google.com/
// 2. Adicione um app Web e ative a autenticação por Email/Senha
// 3. Copie o firebaseConfig e cole aqui:
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "COLE_SEU_AUTH_DOMAIN_AQUI",
  projectId: "COLE_SEU_PROJECT_ID_AQUI",
  storageBucket: "COLE_SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "COLE_SEU_SENDER_ID_AQUI",
  appId: "COLE_SEU_APP_ID_AQUI"
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

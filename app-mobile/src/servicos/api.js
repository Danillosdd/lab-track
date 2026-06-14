import axios from 'axios';

// Para emulador Android use 10.0.2.2; para celular fisico troque para o IP da sua maquina.
const api = axios.create({
  baseURL: 'http://10.0.2.2:8082/mcontroller',
});

export default api;

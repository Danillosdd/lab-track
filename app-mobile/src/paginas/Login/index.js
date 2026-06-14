import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../servicos/firebase';
import styles from './style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha o email e a senha.');
      return;
    }
    
    // Se o auth não existir (configuração vazia), avança para testes sem Firebase.
    if (!auth) {
      Alert.alert('Modo Teste', 'O Firebase não está configurado. Entrando no modo offline para testes.');
      navigation.replace('ListarMaterial');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('ListarMaterial');
    } catch (error) {
      Alert.alert('Erro no Login', 'Email ou senha inválidos. Verifique suas credenciais.');
    }
  }

  async function handleCadastro() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha o email e a senha para se cadastrar.');
      return;
    }

    if (!auth) {
      Alert.alert('Erro', 'Configure as credenciais do Firebase no arquivo src/servicos/firebase.js primeiro.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Agora você pode logar.');
    } catch (error) {
      Alert.alert('Erro no Cadastro', 'Não foi possível cadastrar. A senha deve ter no mínimo 6 caracteres.');
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>LabTrack</Text>
        <Text style={styles.subtitle}>Controle de Inventário</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#5A6A85"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#5A6A85"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.textoBotaoEntrar}>Entrar no sistema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastro} activeOpacity={0.8}>
          <Text style={styles.textoBotaoCadastrar}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

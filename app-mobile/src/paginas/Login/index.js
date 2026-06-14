import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, signInWithEmailAndPassword } from '../../servicos/firebase';
import styles from './style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  async function handleLogin() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha o email e a senha.');
      return;
    }
    
    if (!auth) {
      Alert.alert('Modo Teste', 'O Firebase não está configurado. Entrando no modo offline.');
      navigation.replace('ListarMaterial');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('ListarMaterial');
    } catch (error) {
      Alert.alert('Erro no Login', 'Email ou senha inválidos. Verifique suas credenciais.');
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={require('../../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>LabTrack</Text>
        <Text style={styles.subtitle}>Gestão de Inventário de Laboratório</Text>
      </Animated.View>

      <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
        <Text style={styles.label}>Email de acesso</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#5A6A85" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="email@address.com"
            placeholderTextColor="#5A6A85"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Senha de segurança</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#5A6A85" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sua senha secreta"
            placeholderTextColor="#5A6A85"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.botaoEntrar, loading && { opacity: 0.7 }]} 
          onPress={handleLogin} 
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.textoBotaoEntrar}>{loading ? 'Acessando...' : 'Entrar no sistema'}</Text>
          {!loading && <Ionicons name="arrow-forward" size={20} color="#0B1120" />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => navigation.navigate('Cadastro')} activeOpacity={0.8} disabled={loading}>
          <Text style={styles.textoBotaoCadastrar}>Primeiro acesso? <Text style={{color: '#00B4D8'}}>Criar conta</Text></Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

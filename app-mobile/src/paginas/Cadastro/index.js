import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, createUserWithEmailAndPassword } from '../../servicos/firebase';
import styles from './style';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  async function handleCadastro() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha o email e a senha para se cadastrar.');
      return;
    }

    if (!auth) {
      Alert.alert('Erro', 'Configure as credenciais do Firebase no arquivo src/servicos/firebase.js primeiro.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Você já pode entrar com suas credenciais.');
      navigation.goBack(); // Volta para a tela de login
    } catch (error) {
      Alert.alert('Erro no Cadastro', 'Não foi possível cadastrar. Verifique se o e-mail é válido e a senha tem no mínimo 6 caracteres.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Ionicons name="person-add-outline" size={64} color="#00B4D8" />
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Registre-se para acessar o inventário</Text>
      </Animated.View>

      <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
        <Text style={styles.label}>Email de acesso</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#5A6A85" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: profissional@laboratorio.com"
            placeholderTextColor="#5A6A85"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Senha (Mínimo 6 caracteres)</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#5A6A85" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha segura"
            placeholderTextColor="#5A6A85"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.botaoCadastrar, loading && { opacity: 0.7 }]} 
          onPress={handleCadastro} 
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.textoBotaoCadastrar}>{loading ? 'Criando conta...' : 'Concluir Cadastro'}</Text>
          {!loading && <Ionicons name="checkmark-circle-outline" size={20} color="#0B1120" />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()} activeOpacity={0.8} disabled={loading}>
          <Text style={styles.textoBotaoVoltar}>Já tem conta? <Text style={{color: '#00B4D8'}}>Fazer login</Text></Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

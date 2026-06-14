import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from '../../servicos/firebase';
import styles from './style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalErroVisivel, setModalErroVisivel] = useState(false);
  const [tituloErro, setTituloErro] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  function mostrarErro(titulo, mensagem) {
    setTituloErro(titulo);
    setMensagemErro(mensagem);
    setModalErroVisivel(true);
  }

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace('ListarMaterial');
        }
      });
      return unsubscribe;
    }
  }, [fadeAnim, navigation]);

  async function handleLogin() {
    if (email === '' || senha === '') {
      mostrarErro('Atenção', 'Preencha o email e a senha para continuar.');
      return;
    }
    
    if (!auth) {
      mostrarErro('Modo Teste', 'O Firebase não está configurado. Entrando no modo offline.');
      setTimeout(() => {
        setModalErroVisivel(false);
        navigation.replace('ListarMaterial');
      }, 2000);
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('ListarMaterial');
    } catch (error) {
      mostrarErro('Erro no Login', 'Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
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
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} activeOpacity={0.7} style={{ padding: 4 }}>
            <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={22} color="#5A6A85" />
          </TouchableOpacity>
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

      <Modal visible={modalErroVisivel} transparent animationType="fade" onRequestClose={() => setModalErroVisivel(false)}>
        <TouchableWithoutFeedback onPress={() => setModalErroVisivel(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(11, 17, 32, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: '#131D35', borderRadius: 20, padding: 24, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#1E2D4A' }}>
                <Ionicons name="warning-outline" size={48} color="#FF4D4D" style={{marginBottom: 16}} />
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' }}>{tituloErro}</Text>
                <Text style={{ fontSize: 15, color: '#8899B4', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
                  {mensagemErro}
                </Text>
                <TouchableOpacity 
                  style={{ backgroundColor: '#00B4D8', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
                  onPress={() => setModalErroVisivel(false)}
                  activeOpacity={0.8}
                >
                  <Text style={{ color: '#0B1120', fontSize: 16, fontWeight: '700' }}>Entendido</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
}

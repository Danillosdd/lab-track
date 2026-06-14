import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Animated, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, createUserWithEmailAndPassword } from '../../servicos/firebase';
import styles from './style';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [mensagemModal, setMensagemModal] = useState('');
  const [iconeModal, setIconeModal] = useState('warning-outline');
  const [corModal, setCorModal] = useState('#FF4D4D');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  function mostrarModal(titulo, mensagem, tipo = 'erro') {
    setTituloModal(titulo);
    setMensagemModal(mensagem);
    if (tipo === 'sucesso') {
      setIconeModal('checkmark-circle-outline');
      setCorModal('#00C896');
    } else {
      setIconeModal('warning-outline');
      setCorModal('#FF4D4D');
    }
    setModalVisivel(true);
  }

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  async function handleCadastro() {
    if (email === '' || senha === '') {
      mostrarModal('Atenção', 'Preencha o email e a senha para se cadastrar.', 'erro');
      return;
    }

    if (!auth) {
      mostrarModal('Erro', 'Configure as credenciais do Firebase no arquivo src/servicos/firebase.js primeiro.', 'erro');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      mostrarModal('Sucesso', 'Conta criada com sucesso! Você já pode entrar com suas credenciais.', 'sucesso');
      setTimeout(() => {
        setModalVisivel(false);
        navigation.goBack();
      }, 2500);
    } catch (error) {
      console.log("Erro completo Firebase: ", error);
      
      let mensagem = 'Não foi possível cadastrar.';
      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este e-mail já está cadastrado!';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'E-mail inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagem = 'A senha precisa ter pelo menos 6 caracteres.';
      } else {
        mensagem = error.message; // Mostra o erro real se for outro
      }
      
      mostrarModal('Erro no Cadastro', mensagem, 'erro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            placeholder="email@address.com"
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
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} activeOpacity={0.7} style={{ padding: 4 }}>
            <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={22} color="#5A6A85" />
          </TouchableOpacity>
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

      <Modal visible={modalVisivel} transparent animationType="fade" onRequestClose={() => setModalVisivel(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(11, 17, 32, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: '#131D35', borderRadius: 20, padding: 24, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#1E2D4A' }}>
                <Ionicons name={iconeModal} size={48} color={corModal} style={{marginBottom: 16}} />
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' }}>{tituloModal}</Text>
                <Text style={{ fontSize: 15, color: '#8899B4', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
                  {mensagemModal}
                </Text>
                <TouchableOpacity 
                  style={{ backgroundColor: '#00B4D8', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
                  onPress={() => setModalVisivel(false)}
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
    </TouchableWithoutFeedback>
  );
}

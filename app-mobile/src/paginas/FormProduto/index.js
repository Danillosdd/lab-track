import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import api from '../../servicos/api';
import styles from './style';

function dataAtualISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatarDataParaBR(dataISO) {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

function formatarDataParaISO(dataBR) {
  if (!dataBR) return '';
  const partes = dataBR.split('/');
  if (partes.length === 3) {
    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  }
  return dataBR;
}

function aplicarMascaraData(texto) {
  let v = texto.replace(/\D/g, ''); // Remove o que não for número
  if (v.length > 8) v = v.slice(0, 8); // Limita a 8 dígitos

  if (v.length >= 5) {
    v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
  } else if (v.length >= 3) {
    v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  }
  return v;
}

function parseDataBR(dataBR) {
  if (!dataBR || dataBR.length !== 10) return new Date();
  const partes = dataBR.split('/');
  if (partes.length === 3) {
    return new Date(`${partes[2]}-${partes[1]}-${partes[0]}T12:00:00Z`);
  }
  return new Date();
}

export default function FormProduto({ navigation, route }) {
  const modo = route.params?.modo || 'incluir';
  const produto = route.params?.produto;

  const [descricao, setDescricao] = useState(produto?.descricao || '');
  const [setor, setSetor] = useState(produto?.setor || '');
  const [valorUnitario, setValorUnitario] = useState(
    produto?.valorUnitario ? String(produto.valorUnitario).replace('.', ',') : ''
  );
  const [quantidade, setQuantidade] = useState(
    produto?.quantidade ? String(produto.quantidade) : ''
  );
  const [dataEntrada, setDataEntrada] = useState(
    produto?.dataEntrada ? formatarDataParaBR(produto.dataEntrada) : formatarDataParaBR(dataAtualISO())
  );
  const [emUso, setEmUso] = useState(produto?.emUso ?? true);
  const [imagemUrl, setImagemUrl] = useState(produto?.imagemUrl || '');
  const [salvando, setSalvando] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const total = useMemo(() => {
    const val = Number(valorUnitario.replace(',', '.'));
    const qtd = Number(quantidade);
    if (!isNaN(val) && !isNaN(qtd)) {
      return (val * qtd).toFixed(2).replace('.', ',');
    }
    return '0,00';
  }, [valorUnitario, quantidade]);

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      const iso = selectedDate.toISOString().slice(0, 10);
      setDataEntrada(formatarDataParaBR(iso));
    }
  };

  async function selecionarImagem() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão', 'Permita acesso à galeria para selecionar a foto.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagemUrl(resultado.assets[0].uri);
    }
  }

  async function tirarFoto() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão', 'Permita acesso à câmera para tirar a foto.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagemUrl(resultado.assets[0].uri);
    }
  }

  const tituloBotao = useMemo(
    () => (modo === 'alterar' ? 'Salvar alterações' : 'Cadastrar material'),
    [modo]
  );

  async function salvar() {
    if (!descricao || !setor || !valorUnitario || !quantidade || !dataEntrada) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    if (dataEntrada.length !== 10) {
      Alert.alert('Atenção', 'Data de entrada inválida (use o formato DD/MM/AAAA).');
      return;
    }

    const payload = {
      descricao,
      setor,
      valorUnitario: Number(valorUnitario.replace(',', '.')),
      quantidade: Number(quantidade),
      dataEntrada: formatarDataParaISO(dataEntrada),
      emUso,
      imagemUrl,
    };

    if (Number.isNaN(payload.valorUnitario) || Number.isNaN(payload.quantidade)) {
      Alert.alert('Atenção', 'Valor unitário e quantidade precisam ser numéricos.');
      return;
    }

    if (payload.valorUnitario <= 0 || payload.quantidade < 0) {
      Alert.alert('Atenção', 'Informe valores válidos para valor unitário e quantidade.');
      return;
    }

    setSalvando(true);
    try {
      if (modo === 'alterar' && produto?.id) {
        await api.put(`/materiais/${produto.id}`, payload);
      } else {
        await api.post('/materiais', payload);
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível salvar o material agora.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.sectionTitle}>Informações básicas</Text>

      <View style={styles.grupo}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Béquer 500ml"
          placeholderTextColor="#5A6A85"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Data de entrada</Text>
        <View style={styles.inputContainerIcon}>
          <TextInput
            style={styles.inputWithIcon}
            value={dataEntrada}
            onChangeText={(t) => setDataEntrada(aplicarMascaraData(t))}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#5A6A85"
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputIcon}>
            <Ionicons name="calendar-outline" size={24} color="#00B4D8" />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={parseDataBR(dataEntrada)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Setor</Text>
        <TextInput
          style={styles.input}
          value={setor}
          onChangeText={setSetor}
          placeholder="Ex: Química Analítica"
          placeholderTextColor="#5A6A85"
        />
      </View>

      <Text style={styles.sectionTitle}>Valores e quantidades</Text>

      <View style={styles.grupo}>
        <Text style={styles.label}>Valor unitário (R$)</Text>
        <TextInput
          style={styles.input}
          value={valorUnitario}
          onChangeText={setValorUnitario}
          keyboardType="numeric"
          placeholder="Ex: 19,90"
          placeholderTextColor="#5A6A85"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          placeholder="Ex: 10"
          placeholderTextColor="#5A6A85"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Valor total (R$)</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={total}
          editable={false}
          placeholderTextColor="#5A6A85"
        />
      </View>

      <Text style={styles.sectionTitle}>Status e imagem</Text>

      <View style={styles.linhaSwitch}>
        <View>
          <Text style={styles.switchLabel}>Em uso</Text>
          <Text style={styles.switchSublabel}>Material está sendo utilizado?</Text>
        </View>
        <Switch
          value={emUso}
          onValueChange={setEmUso}
          trackColor={{ false: '#1E2D4A', true: '#00B4D8' + '55' }}
          thumbColor={emUso ? '#00B4D8' : '#5A6A85'}
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Foto do material</Text>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity style={[styles.botaoImagem, {flex: 1}]} onPress={tirarFoto}>
            <Ionicons name="camera" size={20} color="#00B4D8" style={{marginRight: 8}} />
            <Text style={styles.textoBotaoImagem}>Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoImagem, {flex: 1}]} onPress={selecionarImagem}>
            <Ionicons name="images" size={20} color="#00B4D8" style={{marginRight: 8}} />
            <Text style={styles.textoBotaoImagem}>Galeria</Text>
          </TouchableOpacity>
        </View>

        {imagemUrl ? <Image source={{ uri: imagemUrl }} style={styles.previewImagem} /> : null}
      </View>

      <TouchableOpacity
        style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
        onPress={salvar}
        disabled={salvando}
      >
        <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : tituloBotao}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

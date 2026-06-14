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

import api from '../../servicos/api';
import styles from './style';

function dataAtualISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function FormProduto({ navigation, route }) {
  const modo = route.params?.modo || 'incluir';
  const produto = route.params?.produto;

  const [descricao, setDescricao] = useState(produto?.descricao || '');
  const [setor, setSetor] = useState(produto?.setor || '');
  const [valorUnitario, setValorUnitario] = useState(
    produto?.valorUnitario ? String(produto.valorUnitario) : ''
  );
  const [quantidade, setQuantidade] = useState(
    produto?.quantidade ? String(produto.quantidade) : ''
  );
  const [dataEntrada, setDataEntrada] = useState(produto?.dataEntrada || dataAtualISO());
  const [emUso, setEmUso] = useState(produto?.emUso ?? true);
  const [imagemUrl, setImagemUrl] = useState(produto?.imagemUrl || '');
  const [salvando, setSalvando] = useState(false);

  async function selecionarImagem() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissao', 'Permita acesso a galeria para selecionar a foto.');
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

  const tituloBotao = useMemo(
    () => (modo === 'alterar' ? 'Salvar alteracoes' : 'Cadastrar material'),
    [modo]
  );

  async function salvar() {
    if (!descricao || !setor || !valorUnitario || !quantidade || !dataEntrada) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    const payload = {
      descricao,
      setor,
      valorUnitario: Number(valorUnitario),
      quantidade: Number(quantidade),
      dataEntrada,
      emUso,
      imagemUrl,
    };

    if (Number.isNaN(payload.valorUnitario) || Number.isNaN(payload.quantidade)) {
      Alert.alert('Atenção', 'Valor unitario e quantidade precisam ser numericos.');
      return;
    }

    if (payload.valorUnitario <= 0 || payload.quantidade < 0) {
      Alert.alert('Atenção', 'Informe valores validos para valor unitario e quantidade.');
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
      Alert.alert('Ops', 'Nao foi possivel salvar o material agora.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grupo}>
        <Text style={styles.label}>Descricao</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Setor</Text>
        <TextInput style={styles.input} value={setor} onChangeText={setSetor} />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Valor unitario</Text>
        <TextInput
          style={styles.input}
          value={valorUnitario}
          onChangeText={setValorUnitario}
          keyboardType="numeric"
          placeholder="Ex: 19.90"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Data de entrada (AAAA-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={dataEntrada}
          onChangeText={setDataEntrada}
          placeholder="2026-06-13"
        />
      </View>

      <View style={styles.linhaSwitch}>
        <Text style={styles.label}>Em uso</Text>
        <Switch value={emUso} onValueChange={setEmUso} />
      </View>

      <View style={styles.grupo}>
        <Text style={styles.label}>Foto do material</Text>
        <TouchableOpacity style={styles.botaoImagem} onPress={selecionarImagem}>
          <Text style={styles.textoBotaoImagem}>Selecionar imagem da galeria</Text>
        </TouchableOpacity>

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

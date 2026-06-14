import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../servicos/api';
import styles from './style';

export default function ListarProduto({ navigation }) {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function carregarMateriais() {
    setCarregando(true);
    try {
      const response = await api.get('/materiais');
      setLista(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Nao consegui carregar os materiais agora.');
    } finally {
      setCarregando(false);
    }
  }

  async function excluirMaterial(id) {
    try {
      await api.delete(`/materiais/${id}`);
      carregarMateriais();
    } catch (error) {
      Alert.alert('Ops', 'Nao consegui excluir este material.');
    }
  }

  function confirmarExclusao(item) {
    Alert.alert('Confirmacao', `Deseja excluir o material ${item.descricao}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluirMaterial(item.id) },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      carregarMateriais();
    }, [])
  );

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        {item.imagemUrl ? <Image source={{ uri: item.imagemUrl }} style={styles.imagem} /> : null}
        <Text style={styles.titulo}>{item.descricao}</Text>
        <Text style={styles.texto}>Setor: {item.setor}</Text>
        <Text style={styles.texto}>Valor unitario: R$ {Number(item.valorUnitario).toFixed(2)}</Text>
        <Text style={styles.texto}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.texto}>Data de entrada: {item.dataEntrada}</Text>
        <Text style={styles.texto}>Em uso: {item.emUso ? 'Sim' : 'Nao'}</Text>

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoEditar]}
            onPress={() => navigation.navigate('AlterarMaterial', { produto: item, modo: 'alterar' })}
          >
            <Text style={styles.textoBotao}>Alterar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoExcluir]}
            onPress={() => confirmarExclusao(item)}
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => navigation.navigate('IncluirMaterial', { modo: 'incluir' })}
      >
        <Text style={styles.textoBotaoNovo}>Novo material</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregarMateriais} />
        }
        ListEmptyComponent={
          !carregando ? <Text style={styles.vazio}>Nenhum material cadastrado ainda.</Text> : null
        }
      />
    </View>
  );
}

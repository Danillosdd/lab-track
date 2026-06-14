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
      Alert.alert('Ops', 'Não consegui carregar os materiais agora.');
    } finally {
      setCarregando(false);
    }
  }

  async function excluirMaterial(id) {
    try {
      await api.delete(`/materiais/${id}`);
      carregarMateriais();
    } catch (error) {
      Alert.alert('Ops', 'Não consegui excluir este material.');
    }
  }

  function confirmarExclusao(item) {
    Alert.alert(
      'Excluir material',
      `Tem certeza que deseja excluir "${item.descricao}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => excluirMaterial(item.id) },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      carregarMateriais();
    }, [])
  );

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        {item.imagemUrl ? (
          <Image source={{ uri: item.imagemUrl }} style={styles.imagem} />
        ) : null}

        <View style={styles.cardHeader}>
          <Text style={styles.titulo} numberOfLines={1}>{item.descricao}</Text>
          <View style={[styles.statusBadge, item.emUso ? styles.statusAtivo : styles.statusInativo]}>
            <Text style={item.emUso ? styles.statusTextoAtivo : styles.statusTextoInativo}>
              {item.emUso ? '● Em uso' : '○ Parado'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.texto}>Setor</Text>
          <Text style={styles.textoValor}>{item.setor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>💰</Text>
          <Text style={styles.texto}>Valor unitário</Text>
          <Text style={styles.textoValor}>R$ {Number(item.valorUnitario).toFixed(2)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📦</Text>
          <Text style={styles.texto}>Quantidade</Text>
          <Text style={styles.textoValor}>{item.quantidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📅</Text>
          <Text style={styles.texto}>Entrada</Text>
          <Text style={styles.textoValor}>{item.dataEntrada}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoEditar]}
            onPress={() => navigation.navigate('AlterarMaterial', { produto: item, modo: 'alterar' })}
          >
            <Text style={styles.textoBotaoEditar}>✏️  Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoExcluir]}
            onPress={() => confirmarExclusao(item)}
          >
            <Text style={styles.textoBotaoExcluir}>🗑️  Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <View>
          <Text style={styles.headerTitle}>Inventário</Text>
          <Text style={styles.headerSubtitle}>Materiais de laboratório</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{lista.length} itens</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => navigation.navigate('IncluirMaterial', { modo: 'incluir' })}
      >
        <Text style={styles.textoBotaoNovo}>＋  Novo material</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={carregarMateriais}
            tintColor="#00B4D8"
            colors={['#00B4D8']}
          />
        }
        ListEmptyComponent={
          !carregando ? (
            <View>
              <Text style={styles.vazioEmoji}>🧪</Text>
              <Text style={styles.vazio}>Nenhum material cadastrado ainda.</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

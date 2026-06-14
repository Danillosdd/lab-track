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
import { Ionicons } from '@expo/vector-icons';

import api from '../../servicos/api';
import styles from './style';

export default function ListarProduto({ navigation }) {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

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

  // Cálculos dos resumos
  const totalItens = lista.length;
  const emUsoCount = lista.filter(i => i.emUso).length;
  const valorTotal = lista.reduce((sum, i) => sum + (Number(i.valorUnitario) * Number(i.quantidade)), 0);

  function renderHeader() {
    return (
      <View>
        {/* Barra do topo com logo e info */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.appName}>LabTrack</Text>
              <Text style={styles.appSubtitle}>Controle de inventário</Text>
            </View>
          </View>
        </View>

        {/* Cards de resumo */}
        <View style={styles.resumoRow}>
          <View style={[styles.resumoCard, styles.resumoCard1]}>
            <Ionicons name="cube-outline" size={24} color="#00B4D8" style={{marginBottom: 6}} />
            <Text style={styles.resumoNumero}>{totalItens}</Text>
            <Text style={styles.resumoLabel}>Total</Text>
          </View>
          <View style={[styles.resumoCard, styles.resumoCard2]}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#00C896" style={{marginBottom: 6}} />
            <Text style={styles.resumoNumero}>{emUsoCount}</Text>
            <Text style={styles.resumoLabel}>Em uso</Text>
          </View>
          <View style={[styles.resumoCard, styles.resumoCard3]}>
            <Ionicons name="cash-outline" size={24} color="#F5A623" style={{marginBottom: 6}} />
            <Text style={styles.resumoNumero}>
              {valorTotal > 999 ? `${(valorTotal / 1000).toFixed(1)}k` : valorTotal.toFixed(0)}
            </Text>
            <Text style={styles.resumoLabel}>Valor (R$)</Text>
          </View>
        </View>

        {/* Botão novo material */}
        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => navigation.navigate('IncluirMaterial', { modo: 'incluir' })}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#0B1120" style={{marginRight: 6}} />
          <Text style={styles.textoBotaoNovo}>Cadastrar novo material</Text>
        </TouchableOpacity>

        {/* Título da seção */}
        {totalItens > 0 && (
          <View style={styles.secaoHeader}>
            <Text style={styles.secaoTitulo}>Materiais cadastrados</Text>
            <Text style={styles.secaoContagem}>{totalItens} {totalItens === 1 ? 'item' : 'itens'}</Text>
          </View>
        )}
      </View>
    );
  }

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
          <Ionicons name="location-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Setor</Text>
          <Text style={styles.textoValor}>{item.setor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Valor unitário</Text>
          <Text style={styles.textoValor}>R$ {Number(item.valorUnitario).toFixed(2)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="layers-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Quantidade</Text>
          <Text style={styles.textoValor}>{item.quantidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Entrada</Text>
          <Text style={styles.textoValor}>{item.dataEntrada}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.linhaBotoes}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoEditar]}
            onPress={() => navigation.navigate('AlterarMaterial', { produto: item, modo: 'alterar' })}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color="#F8FAFC" style={{marginRight: 6}} />
            <Text style={styles.textoBotaoEditar}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoExcluir]}
            onPress={() => confirmarExclusao(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color="#FF4D4D" style={{marginRight: 6}} />
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderEmpty() {
    if (carregando) return null;
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconBg}>
          <Ionicons name="flask-outline" size={48} color="#00B4D8" />
        </View>
        <Text style={styles.emptyTitle}>Nenhum material cadastrado</Text>
        <Text style={styles.emptySubtitle}>
          Toque em "Cadastrar novo material" para começar a controlar o inventário do seu laboratório.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={carregarMateriais}
            tintColor="#00B4D8"
            colors={['#00B4D8']}
          />
        }
      />
    </View>
  );
}

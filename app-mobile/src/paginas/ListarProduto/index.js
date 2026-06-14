import React, { useCallback, useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import api from '../../servicos/api';
import { auth, signOut, updatePassword } from '../../servicos/firebase';
import styles from './style';

function formatarDataParaBR(dataISO) {
  if (!dataISO || dataISO.indexOf('-') === -1) return dataISO;
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function ListarProduto({ navigation }) {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [ordenacao, setOrdenacao] = useState('recentes');

  // Modais
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [modalSairVisivel, setModalSairVisivel] = useState(false);
  const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

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
    setItemParaExcluir(item);
    setModalExcluirVisivel(true);
  }

  async function confirmarEExcluir() {
    if (!itemParaExcluir) return;
    try {
      await api.delete(`/materiais/${itemParaExcluir.id}`);
      setModalExcluirVisivel(false);
      carregarMateriais();
    } catch (error) {
      Alert.alert('Ops', 'Não consegui excluir este material.');
    }
  }

  async function handleLogout() {
    setModalSairVisivel(false);
    try {
      if (auth) await signOut(auth);
      navigation.replace('Login');
    } catch(e) {
      navigation.replace('Login');
    }
  }

  async function handleTrocarSenha() {
    if (novaSenha.length < 6) {
      Alert.alert('Atenção', 'A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmaSenha) {
      Alert.alert('Atenção', 'As senhas não conferem.');
      return;
    }
    try {
      if (auth && auth.currentUser) {
        await updatePassword(auth.currentUser, novaSenha);
        setModalSenhaVisivel(false);
        setNovaSenha('');
        setConfirmaSenha('');
        Alert.alert('Sucesso', 'Senha alterada com sucesso. Faça login novamente.', [
          { text: 'OK', onPress: async () => {
            await signOut(auth);
            navigation.replace('Login');
          }}
        ]);
      } else {
        Alert.alert('Erro', 'Você não está logado via Firebase.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Por questões de segurança, faça login novamente antes de tentar trocar a senha.');
    }
  }

  function alternarOrdenacao() {
    const modos = ['recentes', 'az', 'za', 'maiorValor'];
    const index = modos.indexOf(ordenacao);
    setOrdenacao(modos[(index + 1) % modos.length]);
  }

  useFocusEffect(
    useCallback(() => {
      carregarMateriais();
    }, [])
  );

  useEffect(() => {
    setPagina(1);
  }, [busca, ordenacao]);

  let listaFiltrada = lista.filter(item => 
    item.descricao.toLowerCase().includes(busca.toLowerCase()) || 
    item.setor.toLowerCase().includes(busca.toLowerCase())
  );

  // Ordenação
  if (ordenacao === 'az') {
    listaFiltrada.sort((a, b) => a.descricao.localeCompare(b.descricao));
  } else if (ordenacao === 'za') {
    listaFiltrada.sort((a, b) => b.descricao.localeCompare(a.descricao));
  } else if (ordenacao === 'maiorValor') {
    listaFiltrada.sort((a, b) => (b.valorUnitario * b.quantidade) - (a.valorUnitario * a.quantidade));
  } else {
    // Recentes (menor id ou data desc)
    listaFiltrada.sort((a, b) => b.id - a.id);
  }

  const listaPaginada = listaFiltrada.slice(0, pagina * 10);

  // Cálculos dos resumos
  const totalItens = listaFiltrada.length;
  const emUsoCount = listaFiltrada.filter(i => i.emUso).length;
  const valorTotal = listaFiltrada.reduce((sum, i) => sum + (Number(i.valorUnitario) * Number(i.quantidade)), 0);

  function renderHeader() {
    return (
      <View>
        {/* Barra do topo com logo e info */}
        <View style={[styles.topBar, {justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}]}>
          <View style={styles.topBarLeft}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.appName}>LabTrack</Text>
              <Text style={styles.appSubtitle}>Controle de inventário</Text>
            </View>
          </View>
          
          {/* Botões Menu */}
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setModalSenhaVisivel(true)}>
              <Ionicons name="key-outline" size={24} color="#00B4D8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalSairVisivel(true)}>
              <Ionicons name="log-out-outline" size={26} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de Busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#5A6A85" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou setor..."
            placeholderTextColor="#5A6A85"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {/* Ordenação */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16}}>
          <TouchableOpacity onPress={alternarOrdenacao} style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#131D35', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#1E2D4A'}}>
            <Ionicons name="filter" size={14} color="#00B4D8" style={{marginRight: 6}} />
            <Text style={{color: '#00B4D8', fontWeight: '600', fontSize: 13}}>
              {ordenacao === 'recentes' && 'Ordem: Mais Recentes'}
              {ordenacao === 'az' && 'Ordem: A-Z'}
              {ordenacao === 'za' && 'Ordem: Z-A'}
              {ordenacao === 'maiorValor' && 'Ordem: Maior Valor Total'}
            </Text>
          </TouchableOpacity>
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
              {valorTotal > 999 ? `${(valorTotal / 1000).toFixed(1).replace('.', ',')}k` : valorTotal.toFixed(2).replace('.', ',')}
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
          <Ionicons name="calendar-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Entrada</Text>
          <Text style={styles.textoValor}>{formatarDataParaBR(item.dataEntrada)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Setor</Text>
          <Text style={styles.textoValor}>{item.setor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Valor unitário</Text>
          <Text style={styles.textoValor}>R$ {Number(item.valorUnitario).toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="layers-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Quantidade</Text>
          <Text style={styles.textoValor}>{item.quantidade}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={16} color="#8899B4" style={{marginRight: 6}} />
          <Text style={styles.texto}>Valor total</Text>
          <Text style={styles.textoValor}>R$ {(Number(item.valorUnitario) * Number(item.quantidade)).toFixed(2).replace('.', ',')}</Text>
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
        data={listaPaginada}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReached={() => {
          if (pagina * 10 < listaFiltrada.length) {
            setPagina(pagina + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={carregarMateriais}
            tintColor="#00B4D8"
            colors={['#00B4D8']}
          />
        }
      />

      {/* Modal Excluir */}
      <Modal visible={modalExcluirVisivel} transparent animationType="fade" onRequestClose={() => setModalExcluirVisivel(false)}>
        <TouchableWithoutFeedback onPress={() => setModalExcluirVisivel(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Ionicons name="warning-outline" size={48} color="#FF4D4D" style={{marginBottom: 16}} />
                <Text style={styles.modalTitulo}>Excluir material</Text>
                <Text style={styles.modalTexto}>
                  Tem certeza que deseja excluir "{itemParaExcluir?.descricao}"? Essa ação não pode ser desfeita.
                </Text>
                <View style={styles.modalBotoes}>
                  <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalExcluirVisivel(false)}>
                    <Text style={styles.modalBotaoCancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBotaoExcluirModal} onPress={confirmarEExcluir}>
                    <Text style={styles.modalBotaoExcluirTextoModal}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Sair */}
      <Modal visible={modalSairVisivel} transparent animationType="fade" onRequestClose={() => setModalSairVisivel(false)}>
        <TouchableWithoutFeedback onPress={() => setModalSairVisivel(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Ionicons name="log-out-outline" size={48} color="#FF4D4D" style={{marginBottom: 16}} />
                <Text style={styles.modalTitulo}>Sair do Aplicativo</Text>
                <Text style={styles.modalTexto}>Deseja realmente desconectar da sua conta?</Text>
                <View style={styles.modalBotoes}>
                  <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalSairVisivel(false)}>
                    <Text style={styles.modalBotaoCancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBotaoExcluirModal} onPress={handleLogout}>
                    <Text style={styles.modalBotaoExcluirTextoModal}>Sair</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Senha */}
      <Modal visible={modalSenhaVisivel} transparent animationType="fade" onRequestClose={() => setModalSenhaVisivel(false)}>
        <TouchableWithoutFeedback onPress={() => setModalSenhaVisivel(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Ionicons name="key-outline" size={48} color="#00B4D8" style={{marginBottom: 16}} />
                <Text style={styles.modalTitulo}>Trocar Senha</Text>
                <Text style={styles.modalTexto}>Digite a nova senha para sua conta (mín. 6 caracteres).</Text>
                <View style={{ width: '100%', marginTop: 12, marginBottom: 16 }}>
                  <TextInput
                    style={{
                      backgroundColor: '#0F1A2E',
                      borderWidth: 1,
                      borderColor: '#1E2D4A',
                      borderRadius: 10,
                      padding: 12,
                      color: '#FFFFFF',
                      marginBottom: 10,
                      textAlign: 'center'
                    }}
                    placeholder="Nova senha secreta"
                    placeholderTextColor="#5A6A85"
                    secureTextEntry
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                  />
                  <TextInput
                    style={{
                      backgroundColor: '#0F1A2E',
                      borderWidth: 1,
                      borderColor: '#1E2D4A',
                      borderRadius: 10,
                      padding: 12,
                      color: '#FFFFFF',
                      textAlign: 'center'
                    }}
                    placeholder="Confirmar nova senha"
                    placeholderTextColor="#5A6A85"
                    secureTextEntry
                    value={confirmaSenha}
                    onChangeText={setConfirmaSenha}
                  />
                </View>
                <View style={styles.modalBotoes}>
                  <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalSenhaVisivel(false)}>
                    <Text style={styles.modalBotaoCancelarTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalBotaoExcluirModal, {backgroundColor: '#00B4D8'}]} onPress={handleTrocarSenha}>
                    <Text style={[styles.modalBotaoExcluirTextoModal, {color: '#0B1120'}]}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
}

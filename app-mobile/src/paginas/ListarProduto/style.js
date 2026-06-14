import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    padding: 14,
  },
  botaoNovo: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotaoNovo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dde3ef',
  },
  imagem: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#dde3ef',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    color: '#2d3a4d',
    marginBottom: 3,
  },
  linhaBotoes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  botao: {
    flex: 1,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoEditar: {
    backgroundColor: '#198754',
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6b7280',
  },
});

export default styles;

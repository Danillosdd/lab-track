import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f6fb',
    flexGrow: 1,
  },
  grupo: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d5dbe6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  botaoImagem: {
    backgroundColor: '#e7f1ff',
    borderWidth: 1,
    borderColor: '#b8d4ff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotaoImagem: {
    color: '#0d47a1',
    fontWeight: '600',
  },
  previewImagem: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#dde3ef',
  },
  botaoSalvar: {
    backgroundColor: '#0d6efd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#86b7fe',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default styles;

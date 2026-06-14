import { StyleSheet } from 'react-native';

const COLORS = {
  bg: '#0B1120',
  card: '#162032',
  cardBorder: '#1E2D4A',
  accent: '#00B4D8',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#5A6A85',
  inputBg: '#0F1A2E',
  inputBorder: '#1E2D4A',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 4,
  },
  form: {
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    color: COLORS.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  botaoEntrar: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotaoEntrar: {
    color: '#0B1120',
    fontWeight: '700',
    fontSize: 16,
  },
  botaoCadastrar: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  textoBotaoCadastrar: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
});

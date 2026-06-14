import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  bg: '#0B1120',
  card: '#162032',
  cardBorder: '#1E2D4A',
  accent: '#00B4D8',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
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
    marginBottom: 45,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 28,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  form: {
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10 },
      android: { elevation: 8 },
    }),
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    height: '100%',
  },
  botaoEntrar: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    ...Platform.select({
      ios: { shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6 },
      android: { elevation: 4 },
    }),
  },
  textoBotaoEntrar: {
    color: '#0B1120',
    fontWeight: '800',
    fontSize: 16,
    marginRight: 8,
  },
  botaoCadastrar: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 10,
  },
  textoBotaoCadastrar: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
});

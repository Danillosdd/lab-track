import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  bg: '#0B1120',
  card: '#131D35',
  cardBorder: '#1E2D4A',
  accent: '#00B4D8',
  accentDark: '#0090AD',
  text: '#FFFFFF',
  textSecondary: '#8899B4',
  textMuted: '#5A6A85',
  inputBg: '#0F1A2E',
  inputBorder: '#1E2D4A',
  success: '#00C896',
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginTop: 8,
  },
  grupo: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.accent,
  },
  inputDisabled: {
    backgroundColor: COLORS.card,
    color: COLORS.accent,
    fontWeight: '700',
    borderColor: 'transparent',
  },
  inputContainerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
  },
  inputIcon: {
    paddingRight: 14,
  },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  switchSublabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  botaoImagem: {
    backgroundColor: COLORS.accent + '15',
    borderWidth: 1.5,
    borderColor: COLORS.accent + '44',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
  },
  textoBotaoImagem: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  previewImagem: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: COLORS.inputBg,
  },
  botaoSalvar: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  botaoDesabilitado: {
    backgroundColor: COLORS.accentDark,
    opacity: 0.6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default styles;

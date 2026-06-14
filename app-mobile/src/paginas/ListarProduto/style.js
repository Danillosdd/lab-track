import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  bg: '#0B1120',
  card: '#131D35',
  cardBorder: '#1E2D4A',
  accent: '#00B4D8',
  accentDark: '#0090AD',
  danger: '#FF4757',
  dangerDark: '#E03E4D',
  success: '#00C896',
  successDark: '#00A67C',
  text: '#FFFFFF',
  textSecondary: '#8899B4',
  textMuted: '#5A6A85',
  inputBg: '#0F1A2E',
  inputBorder: '#1E2D4A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
  },
  headerArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.accent + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  botaoNovo: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
  textoBotaoNovo: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  imagem: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: COLORS.inputBg,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusAtivo: {
    backgroundColor: COLORS.success + '22',
  },
  statusInativo: {
    backgroundColor: COLORS.danger + '22',
  },
  statusTextoAtivo: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextoInativo: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  infoIcon: {
    fontSize: 14,
    width: 20,
    textAlign: 'center',
  },
  texto: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  textoValor: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 12,
  },
  linhaBotoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botao: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  botaoEditar: {
    backgroundColor: COLORS.success + '18',
    borderWidth: 1,
    borderColor: COLORS.success + '44',
  },
  botaoExcluir: {
    backgroundColor: COLORS.danger + '18',
    borderWidth: 1,
    borderColor: COLORS.danger + '44',
  },
  textoBotaoEditar: {
    color: COLORS.success,
    fontWeight: '700',
    fontSize: 13,
  },
  textoBotaoExcluir: {
    color: COLORS.danger,
    fontWeight: '700',
    fontSize: 13,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textMuted,
    fontSize: 15,
  },
  vazioEmoji: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 40,
    marginBottom: 12,
  },
});

export default styles;

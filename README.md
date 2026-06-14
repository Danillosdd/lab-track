# LabTrack

<div align="center">
  <img src="docs/icon.png" width="200" />
</div>

Aplicativo mobile em React Native (Expo) que consome API RESTful em Spring Boot (H2) para gerenciar o inventário e controle de materiais de laboratório.

## Informacoes academicas

- Disciplina: Programacao para Dispositivos Moveis
- Atividade: Atividade 4 - Aplicativo que Consuma API

---

## 📱 Estrutura do Projeto

O projeto é dividido em duas partes principais:
- 💻 `backend`: API RESTful desenvolvida em **Spring Boot (Java 17)** com banco de dados embutido **H2** (persistência em arquivo local).
- 📲 `app-mobile`: Aplicativo desenvolvido em **React Native / Expo** para gerenciamento de materiais através de um CRUD completo com interface moderna.

---

## 🧪 Objeto da Aplicação

A aplicação trabalha com o objeto `Produto` focado no tema de **Materiais de Laboratório**. Ele contém os seguintes atributos:

- `descricao` *(Texto)*: Nome do material (Ex: Tubo de Ensaio).
- `setor` *(Texto)*: Setor de uso no laboratório.
- `valorUnitario` *(Numérico)*: Preço ou custo do item.
- `quantidade` *(Numérico)*: Quantidade em estoque.
- `dataEntrada` *(Data)*: Data de registro no sistema.
- `emUso` *(Boolean)*: Status que indica se o material está alocado.
- `imagemUrl` *(Texto/URI)*: Imagem selecionada da galeria.

---

## ✅ Requisitos Atendidos

- [x] Desenvolvido em **React Native**.
- [x] Consumo de backend com persistência de objeto real.
- [x] Objeto com mais de 5 atributos incluindo texto, numérico, data e booleano.
- [x] Aplicativo autoral e individual.
- [x] **Diferencial de Interface:**
  - Layout dinâmico com feedbacks visuais (modernização "LabTrack").
  - Uso de componente `Switch` para atributo booleano (`emUso`).
  - Confirmação de segurança via `Alert` ao excluir registros.
  - Seleção nativa de imagens diretamente pela galeria do dispositivo.

---

## 🚀 Como Executar

### 1) Subir o Backend (API)
Abra um terminal e execute o Maven Wrapper gerado para rodar a aplicação:

```bash
cd backend
./mvnw spring-boot:run
```
A API estará disponível em: `http://localhost:8082/mcontroller/materiais`

### 2) Subir o App Mobile
Em um **novo terminal**, instale as dependências e inicie o Expo:

```bash
cd app-mobile
npm install
npm start
```
Após o comando, leia o QR Code gerado usando o aplicativo **Expo Go** em seu celular físico, ou pressione `a` no terminal para abrir no emulador Android.

> ⚠️ **Observação sobre o IP da API:**
> No arquivo `app-mobile/src/servicos/api.js`, por padrão está configurado `10.0.2.2` (padrão para o Emulador Android).
> Se for rodar no seu celular físico, troque esse valor para o **IP da sua máquina na rede local** (ex: `http://192.168.0.10:8082/mcontroller`).

---

## 🔗 Endpoints Usados

- `GET /mcontroller/materiais` - Listar todos os materiais
- `GET /mcontroller/materiais/{id}` - Buscar um material específico
- `POST /mcontroller/materiais` - Criar novo material
- `PUT /mcontroller/materiais/{id}` - Alterar material existente
- `DELETE /mcontroller/materiais/{id}` - Excluir material

---

## 🎥 Roteiro Rápido para Apresentação

1. **Demonstrar a API:** Mostrar o backend rodando e o endpoint retornando um JSON limpo no navegador ou terminal.
2. **Listagem:** Abrir o app e mostrar a tela inicial de materiais (ou a interface amigável de lista vazia).
3. **Inclusão:** Cadastrar um novo material preenchendo todos os tipos de campos e anexando uma imagem.
4. **Leitura:** Retornar para a lista e mostrar o novo registro renderizado, com contador atualizado.
5. **Alteração:** Entrar no modo de edição (ícone do lápis) e alterar algum dado.
6. **Exclusão:** Tocar para deletar e mostrar a tela de **Confirmação (`Alert`)** antes de remover.
7. **Destaques da UI:** Ressaltar a galeria de imagens e o componente de `Switch` (para gerir o tipo *Boolean*).

# LabTrack (Inventário de Laboratório)

<div align="center">
  <img src="docs/icon.png" width="200" />
</div>

Aplicativo mobile em React Native (Expo) que consome API RESTful em Spring Boot (H2) para gerenciar o inventário e controle de materiais de laboratório.

## Informacoes academicas

- Instituicao: UEG
- Disciplina: Programacao para Dispositivos Moveis
- Atividade: Atividade 4 - Aplicativo que Consuma API
- Professor: Heuber Gustavo Frazao de Lima
- Aluno: Danillo Araujo de Paiva

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
  - Layout dinâmico com feedbacks visuais e interface Dark Mode focada em UX moderna (Design Premium "LabTrack").
  - Sistema de busca em tempo real com barra de pesquisa para filtrar materiais por nome ou setor.
  - Paginação na listagem (Infinite Scroll) e botões de Ordenação Dinâmica (A-Z, Mais Recentes, Maior Valor).
  - Cálculo automático em tempo real do `Valor Total` do estoque com formatação monetária padrão pt-BR.
  - Uso de componente `Switch` para atributo booleano (`emUso`).
  - Uso de `Modal DatePicker` nativo para seleção de datas no iOS e Android com máscaras dinâmicas.
  - Modais customizados para Confirmação de Exclusão, Logoff e Troca de Senha.
  - Acesso e integração total com os hardwares nativos do dispositivo: **Câmera** (tirar foto na hora) e **Galeria** (selecionar imagem existente).
- [x] **Nota Bônus:** Autenticação com usuário e senha usando a base do **Firebase**.

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

1. **Autenticação (Bônus Firebase):** Mostrar as telas separadas de Login e Cadastro, registrar um novo usuário e acessá-lo.
2. **Demonstrar a API:** Mostrar o backend rodando e o endpoint retornando um JSON limpo no navegador ou terminal.
3. **Listagem:** Mostrar a tela de materiais (ou a interface amigável de lista vazia) após o login.
4. **Inclusão:** Cadastrar um novo material preenchendo todos os tipos de campos. **Destaque importante:** mostre a máscara de data digitando e, em seguida, abra o calendário clicando no ícone (*DatePicker* nativo) para selecionar a data. Por fim, anexe uma foto da galeria.
5. **Leitura, Busca e Paginação:** Retornar para a lista e mostrar o novo registro renderizado. Mostre o cálculo do "Valor Total" e digite algo na barra de pesquisa para mostrar o filtro em tempo real.
6. **Alteração:** Entrar no modo de edição (ícone do lápis) e alterar algum dado (mostre o Valor Total sendo recalculado automaticamente ao alterar o valor unitário).
7. **Exclusão:** Tocar para deletar e exibir a nova tela de **Modal Customizado** (UI elegante) antes de confirmar a exclusão.
8. **Destaques da UI/UX:** Ressaltar a Splash Screen estilizada, a fluidez do Scroll (rolagem suave otimizada), o calendário (`DatePicker`), a galeria de imagens e o cálculo instantâneo em Tela.

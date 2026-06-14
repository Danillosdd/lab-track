# Atividade 4 - Controle de Materiais de Laboratorio

Projeto da disciplina Programacao para Dispositivos Moveis (UEG).

## Estrutura

- `backend`: API REST em Spring Boot com persistencia em H2 (arquivo local)
- `app-mobile`: aplicativo React Native (Expo) com CRUD de materiais

## Objeto da aplicacao

A aplicacao trabalha com o objeto `Produto` (tema: material de laboratorio) contendo:

- `descricao` (literal)
- `setor` (literal)
- `valorUnitario` (numerico)
- `quantidade` (numerico)
- `dataEntrada` (data)
- `emUso` (boolean)
- `imagemUrl` (texto com URI da imagem)

## Requisitos atendidos

- Desenvolvido em React Native
- Consumo de backend com persistencia de objeto
- Objeto com mais de 5 atributos incluindo literal, numerico, data e boolean
- Aplicativo autoral e individual
- Diferencial de interface: uso de `Switch` (controle booleano), confirmacao por `Alert` e selecao de imagem via galeria

## Como executar

### 1) Subir o backend

```bash
cd backend
mvn spring-boot:run
```

API disponivel em: `http://localhost:8080/mcontroller/materiais`

### 2) Subir o app mobile

Em outro terminal:

```bash
cd app-mobile
npm install
npm start
```

Abra no emulador Android ou no Expo Go.

## Observacao importante sobre IP da API

No arquivo `app-mobile/src/servicos/api.js`:

- `10.0.2.2` funciona para emulador Android
- para celular fisico, troque para o IP da sua maquina na rede local, por exemplo `http://192.168.0.10:8080/mcontroller`

## Endpoints usados

- `GET /mcontroller/materiais`
- `GET /mcontroller/materiais/{id}`
- `POST /mcontroller/materiais`
- `PUT /mcontroller/materiais/{id}`
- `DELETE /mcontroller/materiais/{id}`

## Roteiro rapido para apresentacao

1. Mostrar o backend rodando e endpoint retornando JSON.
2. Abrir app e listar materiais (inicialmente vazio).
3. Cadastrar material com todos os campos.
4. Mostrar registro na lista.
5. Alterar material.
6. Excluir material com confirmacao.
7. Mostrar selecao de imagem pela galeria no cadastro e miniatura na listagem.
8. Explicar os tipos dos atributos e o uso do `Switch` para boolean.

# <img src="docs/icon.png" width="48" align="center" /> LabTrack

> Controle de Inventário de Materiais de Laboratório

Projeto da disciplina Programação para Dispositivos Móveis (UEG).

## Estrutura

- `backend`: API REST em Spring Boot com persistência em H2 (arquivo local)
- `app-mobile`: aplicativo React Native (Expo) com CRUD de materiais

## Objeto da aplicação

A aplicação trabalha com o objeto `Produto` (tema: material de laboratório) contendo:

- `descricao` (literal)
- `setor` (literal)
- `valorUnitario` (numérico)
- `quantidade` (numérico)
- `dataEntrada` (data)
- `emUso` (boolean)
- `imagemUrl` (texto com URI da imagem)

## Requisitos atendidos

- Desenvolvido em React Native
- Consumo de backend com persistência de objeto
- Objeto com mais de 5 atributos incluindo literal, numérico, data e boolean
- Aplicativo autoral e individual
- Diferencial de interface: uso de `Switch` (controle booleano), confirmação por `Alert` e seleção de imagem via galeria

## Como executar

### 1) Subir o backend

```bash
cd backend
mvn spring-boot:run
```

API disponível em: `http://localhost:8082/mcontroller/materiais`

### 2) Subir o app mobile

Em outro terminal:

```bash
cd app-mobile
npm install
npm start
```

Abra no emulador Android ou no Expo Go.

## Observação importante sobre IP da API

No arquivo `app-mobile/src/servicos/api.js`:

- `10.0.2.2` funciona para emulador Android
- para celular físico, troque para o IP da sua máquina na rede local, por exemplo `http://192.168.0.10:8082/mcontroller`

## Endpoints usados

- `GET /mcontroller/materiais`
- `GET /mcontroller/materiais/{id}`
- `POST /mcontroller/materiais`
- `PUT /mcontroller/materiais/{id}`
- `DELETE /mcontroller/materiais/{id}`

## Roteiro rápido para apresentação

1. Mostrar o backend rodando e endpoint retornando JSON.
2. Abrir app e listar materiais (inicialmente vazio).
3. Cadastrar material com todos os campos.
4. Mostrar registro na lista.
5. Alterar material.
6. Excluir material com confirmação.
7. Mostrar seleção de imagem pela galeria no cadastro e miniatura na listagem.
8. Explicar os tipos dos atributos e o uso do `Switch` para boolean.

# Sistema de Gerenciamento de Pedidos

Este é um sistema de gerenciamento de pedidos que permite visualizar e gerenciar pedidos pendentes.

## Funcionalidades

- Listar pedidos pendentes.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:GabrielaMoura25/NotasEPedidos.git
```

2. Instale as dependências:

```bash
cd NotasEPedidos
npm install
```

3. Execute o servidor:

```bash
npm start
```

4. Acesse o sistema em `http://localhost:3000`.

## Estrutura do Projeto

``` bash
src/
├── controllers/
│ └── pedidoController.ts
│  └── notaController.ts
├── models/
│ └── Pedido.ts
│ └── Nota.ts
│ └── PedidoPendente.ts
├── data/
│ └── notas/
│   └── N1.txt
│   └── ...
│ └── pedidos/
│   └── P1.txt
│   └── ...
├── services/
│ ├── pedidoService.ts
│ └── notaService.ts
├── utils/
│ └── fileUtils.ts
└── index.ts
```

## Como Usar

1. Acesse a rota `/notas` para visualizar todas as notas.
2. Acesse a rota `/pedidos` para visualizar todos os pedidos.
3. Acesse a rota `/pedidos-pendentes` para visualizar os pedidos pendentes.

## Observação

Sugiro após clonar excluir o arquivo `pedidosPendentes.txt` para gerar um novo arquivo .txt.

## Desenvolvido por

Gabriela Moura, © 2024.

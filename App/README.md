# TechStore — Carrinho de Compras

Aplicação web de carrinho de compras desenvolvida com **HTML**, **CSS** e **JavaScript** puro (sem banco de dados). Toda a lógica roda em memória no navegador, com persistência via `sessionStorage` durante a sessão.

## Requisitos implementados

| ID  | Requisito                         | Status |
|-----|-----------------------------------|--------|
| R01 | Adição de produto ao carrinho     | ✅     |
| R02 | Alteração da quantidade           | ✅     |
| R03 | Remoção de produto                | ✅     |
| R04 | Visualização dos produtos         | ✅     |
| R05 | Cálculo do subtotal               | ✅     |
| R06 | Totalizador do carrinho           | ✅     |
| R07 | Atualização automática do total   | ✅     |
| R08 | Carrinho vazio                    | ✅     |
| R09 | Persistência durante navegação    | ✅     |
| R10 | Finalização da compra             | ✅     |

## Estrutura do projeto

```
Portifolio/
├── index.html          # Página única (SPA com navegação por hash)
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   ├── data.js         # Catálogo de produtos (memória)
│   ├── cart.js         # Lógica do carrinho
│   └── app.js          # Interface e eventos
├── package.json        # Dependências e scripts
└── README.md
```

## Tecnologias

- HTML5
- CSS3 (layout responsivo, variáveis CSS)
- JavaScript (ES6+, módulo IIFE)
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)
- Node.js (servidor estático local incluído em `server.js`)

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)

### Passos

1. Inicie o servidor:

```bash
npm start
```

3. Acesse no navegador:

**http://localhost:3000**

## Funcionalidades

- **Produtos**: catálogo com 6 itens; clique em "Adicionar" para incluir no carrinho (quantidade inicial = 1).
- **Carrinho**: visualize nome, preço unitário, quantidade e subtotal de cada item; altere quantidades com +/- ou remova itens.
- **Total**: atualizado automaticamente a cada alteração.
- **Carrinho vazio**: mensagem amigável quando não há itens.
- **Navegação**: páginas Produtos, Carrinho e Sobre — o carrinho persiste ao trocar de página (mesma sessão).
- **Finalizar Compra**: botão no resumo do pedido; exibe confirmação e limpa o carrinho.

## Arquitetura

O carrinho é gerenciado pelo módulo `Cart` (`js/cart.js`), que mantém os itens em um `Map` em memória e sincroniza com `sessionStorage` a cada operação. A UI reage ao evento customizado `cart:updated` para re-renderizar automaticamente.

## Licença

MIT

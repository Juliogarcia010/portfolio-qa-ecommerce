Feature: Totalizador do carrinho
  Como um usuário
  Quero verificar se o valor total da compra está de acordo com a soma dos subtotais de cada produto
  Para efetuar corretamente minhas compras

  Regra: O carrinho exibirá o valor total da compra, correspondente à soma dos subtotais de todos os produtos
    Scenario: Validar que o valor total da compra está sendo alterada automaticamente conforme a quantidade de todos os produtos
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       And um dos produtos com mais de uma unidade adicionada
       When acessar a tela de carrinho com produtos adicionados
       And clicar uma vez na caixa “+” de um produto
       Then o valor total da compra será alterado com a soma do produto adicionado 
    
    
    Scenario: Validar que o valor total da compra está sendo alterada automaticamente conforme a quantidade de todos os produtos
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       And um dos produtos com mais de uma unidade adicionada
       When acessar a tela de carrinho com produtos adicionados
       And clicar uma vez na caixa “-” de um produto
       Then o valor total da compra será alterado com a subtração do produto adicionado 
    
    
    Scenario: Validar que o valor total da compra está sendo alterada automaticamente conforme a quantidade de todos os produtos
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       And um dos produtos com mais de uma unidade adicionada
       When acessar a tela de carrinho com produtos adicionados
       And clicar uma vez na caixa “Remover” de um produto
       Then o valor total da compra será alterado com a remoção do produto adicionado 

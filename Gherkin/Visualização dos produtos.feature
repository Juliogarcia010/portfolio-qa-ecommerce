Feature: Visualização dos produtos
  Como um usuário
  Quero visualizar os produtos no carrinho 
  Para saber se meus itens estão de acordo com minha escolha

  Regra: O carrinho exibirá a lista de produtos adicionados, contendo nome, preço, quantidade e subtotal de cada item
    Scenario: Validar que os produtos adicionados apresentam informações de “nome, preço, quantidade e subtotal de cada item”.
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com produto adicionado
       When acessar a tela de carrinho com produtos adicionados
       And verificar se na caixa do produto existe informações de “Nome, preço, quantidade e subtotal de cada item”
       Then a tela do carrinho apresentará informações completas de cada produto

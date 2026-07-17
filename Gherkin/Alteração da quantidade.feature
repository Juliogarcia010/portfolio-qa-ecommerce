Feature: Alteração da quantidade
  Como usuário
  Quero alterar a quantidade de produtos do carrinho
  Para efetuar minhas compras

  Regra: O usuário poderá aumentar ou diminuir a quantidade de cada produto no carrinho
    Scenario: Validar que a quantidade no carrinho é alterada para mais produtos
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com produto adicionado
       When acessar a tela de carrinho com produto adicionado
        And clicar uma vez na caixa “+”
        Then o carrinho apresentará um aumento na quantidade do produto
    
    Scenario: Validar que a quantidade no carrinho é alterada para menos produtos
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com produto adicionado com quantidade superior a um
       When acessar a tela de carrinho com produto adicionado
        And clicar uma vez na caixa “-”
        Then o carrinho apresentará uma diminuição na quantidade do produto

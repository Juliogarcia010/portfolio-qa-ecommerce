Feature:  Adição de produto ao carrinho
  Como usuário 
  Quero adicionar um produto ao carrinho
  Para efetuar minhas compras

  Regra: O usuário poderá adicionar produtos ao carrinho. Ao adicionar um produto, a quantidade inicial será igual a 1.
    
    Scenario: Validar que um produto é adicionado ao carrinho
        Given que eu tenha um ambiente de testes funcionando
       When acessar a tela de produto na web
        And escolher um ou mais produtos apresentados e clicar no botão “Adicionar” 
        Then o carrinho apresentará informação flutuante com o produto adicionado 
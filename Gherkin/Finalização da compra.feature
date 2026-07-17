Feature: Finalização da compra
  Como um usuário
  Quero clicar na opção “finalizar compra”
  Para efetuar minhas compras

  Regra: O usuário poderá iniciar o processo de finalização da compra a partir do carrinho, por meio de um botão de "Finalizar Compra"
    Scenario: Validar que a compra é finalizada através da opção “Finalizar compra”
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com um produto adicionado
       When acessar a tela de carrinho com produtos adicionados
       And clicar no botão “Finalizar Compra”
       And clicar no botão “Fechar” na tela flutuante 
       Then a tela do carrinho é apresentada com a informação de “Seu carrinho está vazio” após a efetivação da compra

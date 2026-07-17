Feature: Persistência durante a navegação
  Como um usuário 
  Quero garantir que meus produtos permanecerão no carrinho quando eu navegar por outras páginas na mesma sessão
  Para que eu possa efetuar minhas compras corretamente

  Regra: Os produtos permanecerão no carrinho enquanto o usuário navegar entre as páginas do site durante a mesma sessão
    Scenario: Validar que os produtos permanecerão no carrinho enquanto navegar por outras telas do site
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       When acessar a tela de carrinho com produtos adicionados
       And acessar uma outra tela do site
      And verificar se o ícone “Carrinho” do menu superior consta a informação de quantidade de produtos adicionados
     And voltar para a tela de carrinho
        Then a tela do carrinho permanecerá com as informações completas dos produtos adicionados

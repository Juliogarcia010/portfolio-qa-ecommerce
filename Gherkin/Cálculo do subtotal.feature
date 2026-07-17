Feature: Cálculo do subtotal
  Como um usuário
  Quero saber se o subtotal da compra está sendo multiplicada conforme o preço de cada produto
  Para efetuar corretamente minhas compras

  Regra: O subtotal de cada produto será calculado multiplicando o preço pela quantidade selecionada
    Scenario: Validar que o subtotal está sendo multiplicado conforme a quantidade de produtos selecionadas.
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       And um dos produtos com mais de uma unidade adicionada
       When acessar a tela de carrinho com produtos adicionados
       And verificar se o subtotal do produto está sendo multiplicado conforme a quantidade selecionada
       Then a tela do carrinho apresentará informação de subtotais multiplicados corretamente conforme a quantidade de produtos selecionadas

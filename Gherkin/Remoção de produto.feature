Feature: Remoção de produto
  Como um usuário
  Quero remover produtos do carrinho
  Para efetuar uma nova compra

  Regra: O usuário poderá remover um produto do carrinho a qualquer momento
    Scenario: Validar que um produto pode ser removido do carrinho a qualquer momento independentemente da quantidade de produtos 
       Given que eu tenha um ambiente de testes funcionando
       And um carrinho com mais de um produto adicionado
       And um dos produtos com mais de uma unidade adicionada
       When acessar a tela de carrinho com produtos adicionados
        And clicar na caixa “Remover” do produto com uma unidade adicionada
        And clicar na caixa “Remover” do produto com mais de uma unidade adicionada 
        Then a tela do carrinho apresentará informação de “Seu carrinho está vazio” 

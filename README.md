# 🌿 Calculadora de Emissão de CO2 e Compensação de Viagens

Uma aplicação web em HTML, CSS e JavaScript puro (sem frameworks) desenvolvida com auxílio do **GitHub Copilot** para calcular a pegada de carbono de viagens e estimar os custos de compensação com créditos de carbono.

---

## 🚀 Sobre o Projeto

A **Calculadora de CO2 de Viagens** permite que o usuário simule a emissão de dióxido de carbono ($CO_2$) produzida ao viajar entre cidades brasileiras ou informando uma distância manual em quilômetros.

### ✨ Funcionalidades
- 📍 **Autocompletar de Rotas:** Busca de cidades brasileiras a partir de uma base simulada.
- 📏 **Distância Manual:** Opção de digitação direta para rotas fora da base.
- 📊 **Resultado de Emissão:** Exibição da distância total e da emissão estimada em kg de $CO_2$.
- 🚲🚗🚌🚛 **Comparação entre Meios de Transporte:** Comparativo visual entre **Bicicleta**, **Carro**, **Ônibus** e **Caminhão**.
- 🌳 **Compensação Ambiental:** Cálculo da quantidade de créditos de carbono necessários (1 crédito = 1 tonelada de $CO_2$) e estimativa de custo em R$.

---

## 🧮 Como Funciona o Cálculo

1. **Fatores de Emissão por Transporte ($g\,CO_2 / km$):**
   - **Bicicleta:** $0\,g/km$ (zero emissão direta)
   - **Carro:** $120\,g/km$
   - **Ônibus:** $30\,g/km$ (por passageiro)
   - **Caminhão:** $900\,g/km$

2. **Cálculo da Emissão Total:**
   $$\text{Emissão Total (kg)} = \frac{\text{Distância (km)} \times \text{Fator de Emissão (g/km)}}{1000}$$

3. **Créditos de Carbono e Custo:**
   - $1\text{ Crédito de Carbono} = 1000\text{ kg de } CO_2\text{ (1 tonelada)}$.
   - **Valor estimado do crédito:** R$ 50,00 por tonelada.
   $$\text{Créditos Necessários} = \frac{\text{Emissão Total (kg)}}{1000}$$
   $$\text{Custo Estimado (R\$)} = \text{Créditos} \times 50.00$$

---

## 🛠️ Estrutura e Ordem de Construção dos Arquivos

O projeto foi construído em etapas modulares, uma por vez:

1. `index.html`: Estrutura HTML5 semântica separada por seções (formulário de busca, resultados, comparação e compensação de carbono).
2. `style.css`: Estilização responsiva com paleta de cores em variáveis CSS e padrão BEM.
3. `js/config.js`: Constantes e fatores de conversão (emissões e valor do crédito de carbono).
4. `js/routes.js`: Base de dados simulada contendo rotas pré-cadastradas entre cidades brasileiras.
5. `js/calculator.js`: Funções puras de cálculo de emissão, distância e custo de compensação.
6. `js/ui.js`: Gerenciamento do DOM, autocompletar, alternância de visibilidade e renderização de cards.
7. `js/app.js`: Script principal com os escutadores de eventos (`submit`, `input`, etc.).
8. `.github/workflows/deploy.yml`: Workflow do GitHub Actions para publicação automática no GitHub Pages.

---

## 🤖 Prompts Utilizados com o GitHub Copilot

> **Prompt Inicial para Estrutura:**
> *"Crie a estrutura semântica de um index.html para uma calculadora de emissão de CO2 em viagens. Inclua um formulário com campos de origem e destino (autocompletar) e distância manual. Crie seções separadas para Resultado da Viagem, Comparação de Transportes e Créditos de Carbono, mantendo essas seções de resultado ocultas inicialmente com uma classe css `.hidden`."*

---

## 🌐 Aplicação Publicada

- **Link da Calculadora (GitHub Pages):** `https://<seu-usuario>.github.io/calculadora-co2-viagens/`
- **Link do Repositório:** `https://github.com/jAk7star/calculadora-co2-viagens.git`

---

## 📸 Demonstração / Screenshots

*(Adicione aqui um print da sua calculadora com uma viagem calculada!)*

---
*Projeto desenvolvido como parte do Desafio de Projeto da DIO com auxílio do GitHub Copilot.*

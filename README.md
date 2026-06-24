# Testes de API GraphQL com Pactum e Mocha

![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-testes-8D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Pactum](https://img.shields.io/badge/Pactum-contract%20testing-0A66C2?style=for-the-badge)
![Mochawesome](https://img.shields.io/badge/Mochawesome-relatorio-C21325?style=for-the-badge)

Projeto de testes automatizados para API GraphQL da EBAC Shop, cobrindo autenticação, mutations, queries e validação de contrato em fluxos de categorias e produtos.

Este repositório demonstra uma abordagem madura de API testing: os testes não se limitam a verificar status HTTP. Eles autenticam, criam dados, editam informações, consultam registros, validam contrato e limpam massa ao final do fluxo.

## Objetivo do projeto

O objetivo é validar fluxos GraphQL de ponta a ponta na camada de API, usando Pactum como ferramenta de requisições e Mocha como runner.

A suíte cobre:

- autenticação com mutation `authUser`;
- uso de token Bearer;
- criação de categoria;
- edição de categoria;
- consulta e validação de contrato;
- exclusão de categoria;
- criação e edição de produto;
- limpeza de dados gerados;
- geração de relatório com Mochawesome.

## Stack utilizada

| Tecnologia | Papel |
| --- | --- |
| GraphQL | API alvo dos testes |
| Pactum | Cliente/DSL para requisições e expectativas |
| Mocha | Runner da suíte |
| Mochawesome | Relatório de execução |
| JavaScript | Linguagem dos testes |
| Node.js/npm | Runtime e dependências |

## O que este projeto demonstra

| Competência | Evidência no projeto | Valor técnico |
| --- | --- | --- |
| API GraphQL | Queries e mutations com variáveis | Valida comportamento real da API |
| Autenticação | Login inicial com `authUser` e token Bearer | Simula acesso protegido |
| Fluxos CRUD | Criação, edição, consulta e exclusão | Testa ciclo de vida de dados |
| Contrato de resposta | `expectJsonSchema` | Detecta quebras estruturais |
| Evidência | Mochawesome | Facilita análise e compartilhamento |

## Cenários cobertos

| Arquivo | Cobertura |
| --- | --- |
| `tests/categories.test.js` | Login, criar categoria, editar categoria, validar contrato e deletar |
| `tests/products.test.js` | Login, criar categoria de apoio, criar produto, editar, validar contrato e deletar |

## Estratégia de teste

A suíte usa uma estratégia transacional para cada domínio:

1. Autentica com credenciais de teste.
2. Armazena o token retornado.
3. Usa o token nas chamadas protegidas.
4. Cria dados com nomes dinâmicos baseados em timestamp.
5. Edita dados criados.
6. Consulta lista e valida contrato.
7. Exclui dados criados.

Essa abordagem reduz dependência de dados estáticos e melhora rastreabilidade da execução.

## Como executar

Clone o repositório:

```bash
git clone https://github.com/DouglasAntoni0/exercicio-testes-api-graphql.git
cd exercicio-testes-api-graphql
```

Instale dependências:

```bash
npm install
```

Execute a suíte:

```bash
npm test
```

O relatório Mochawesome será gerado conforme a configuração do runner.

## Exemplo de validação de contrato

A suíte valida estrutura de resposta com schema JSON. Esse tipo de validação é importante porque uma API pode retornar status `200` e ainda assim quebrar consumidores caso o payload mude.

Exemplos de campos validados:

- lista de produtos;
- nome;
- preço;
- foto;
- estrutura de categorias;
- tipos esperados.

## Pontos de atenção

| Ponto | Risco | Ação sugerida |
| --- | --- | --- |
| API externa/ambiente alvo | Instabilidade fora do controle do teste | Validar disponibilidade antes da execução |
| Credenciais de teste | Login pode falhar se credenciais mudarem | Manter dados de teste controlados |
| Contrato GraphQL | Mudança de schema quebra expectations | Atualizar testes junto com contrato |
| Dados criados | Massa residual pode interferir | Manter cleanup quando possível |

## Resultado técnico

Este repositório mostra uma abordagem madura para API testing: o teste não se limita ao status HTTP. Ele autentica, manipula dados, valida contrato e cobre fluxos completos na camada de serviço, reduzindo dependência da UI e aumentando velocidade de diagnóstico.

## Competências evidenciadas

- Testes de API GraphQL.
- Queries e mutations.
- Pactum.
- Mocha.
- Mochawesome.
- Autenticação com token.
- Validação de contrato.
- Massa dinâmica.
- Fluxos CRUD.

## Possíveis evoluções

- Adicionar variáveis de ambiente para URL e credenciais.
- Separar schemas em arquivos dedicados.
- Criar pipeline no GitHub Actions.
- Adicionar cenários negativos.
- Validar mensagens de erro GraphQL.
- Publicar relatório como artifact.

## Diferencial para portfólio

O destaque deste repositório é mostrar domínio de uma API menos trivial que REST básico. GraphQL exige atenção a queries, mutations, variáveis, autenticação e contrato de resposta, o que fortalece a leitura técnica do perfil.

## Conclusão

Este projeto é uma vitrine forte de testes de API porque demonstra fluxo completo, contrato, autenticação e evidência. Ele mostra domínio de uma camada essencial para QA moderno: validar serviço de forma rápida, precisa e independente da interface.

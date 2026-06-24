# Testes de API GraphQL com Pactum e Mocha

![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-testes-8D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Pactum](https://img.shields.io/badge/Pactum-contract%20testing-0A66C2?style=for-the-badge)
![Mochawesome](https://img.shields.io/badge/Mochawesome-relatorio-C21325?style=for-the-badge)

Projeto de testes automatizados para API GraphQL da EBAC Shop, cobrindo autenticação, mutations, queries e validação de contrato em fluxos de categorias e produtos.

## O que este projeto demonstra

| Competência | Evidência no projeto |
| --- | --- |
| API GraphQL | Uso de queries e mutations com variáveis |
| Autenticação | Login inicial com `authUser` e uso de token Bearer |
| Fluxos CRUD | Criação, edição, consulta e exclusão de categorias e produtos |
| Contrato de resposta | Validação com `expectJsonSchema` |
| Evidência | Relatórios com Mochawesome |

## Cenários cobertos

| Arquivo | Cobertura |
| --- | --- |
| `tests/categories.test.js` | Login, criar categoria, editar categoria, validar contrato e deletar |
| `tests/products.test.js` | Login, criar categoria de apoio, criar produto, editar, validar contrato e deletar |

## Como executar

```bash
git clone https://github.com/DouglasAntoni0/exercicio-testes-api-graphql.git
cd exercicio-testes-api-graphql
npm install
npm test
```

O relatório Mochawesome será gerado conforme a configuração do runner.

## Resultado técnico

Este repositório mostra uma abordagem madura para API testing: o teste não se limita ao status HTTP. Ele autentica, manipula dados, valida contrato e cobre fluxos completos na camada de serviço, reduzindo dependência da UI e aumentando velocidade de diagnóstico.

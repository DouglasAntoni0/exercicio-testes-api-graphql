
const pactum = require('pactum');
const an_api_url = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Serviço de Produtos - Fluxo Completo', () => {
    let authToken = '';
    let categoryNameForProduct = `Cat para Produtos-${Date.now()}`;
    let productName = `Produto Teste-${Date.now()}`;

    before(async () => {
        // PARTE 1: Login
        const loginMutation = `
            mutation authUser($email: String!, $password: String!) {
                authUser(email: $email, password: $password) {
                    token
                }
            }
        `;
        console.log("Realizando login para os testes de produto...");
        const response = await pactum.spec()
            .post(an_api_url)
            .withGraphQLQuery(loginMutation)
            .withGraphQLVariables({
                "email": "aluno_ebac@qa.com",
                "password": "teste@1235"
            })
            .expectStatus(200)
            .toss();
        authToken = response.json.data.authUser.token;
        console.log("Login bem-sucedido!");

        const createCategoryMutation = `
            mutation addCategory($name: String!) {
                addCategory(name: $name) { name }
            }`;
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(createCategoryMutation)
            .withGraphQLVariables({ "name": categoryNameForProduct })
            .expectStatus(200);
        console.log(`Categoria de suporte '${categoryNameForProduct}' criada.`);
    });
    
    it('Deve adicionar um novo produto', async () => {
        const addProductMutation = `
            mutation addProduct($name: String!, $categories: [CategoryInput], $price: Float!) {
                addProduct(name: $name, categories: $categories, price: $price) {
                    name
                    price
                }
            }`;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(addProductMutation)
            .withGraphQLVariables({
                "name": productName,
                "price": 150.50,
                "categories": [
                    { "name": categoryNameForProduct }
                ]
            })
            .expectStatus(200);
    });

    it('Deve editar um produto', async () => {
        const updatedProductName = `Produto Editado-${Date.now()}`;
        const editProductMutation = `
            mutation editProduct($id: ID!, $name: String!, $price: Float!) {
                editProduct(id: $id, name: $name, price: $price) {
                    name
                    price
                }
            }
        `;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(editProductMutation)
            .withGraphQLVariables({
                "id": productName, 
                "name": updatedProductName,
                "price": 200.00
            })
            .expectStatus(200);
        
        productName = updatedProductName;
    });

    it('Deve validar o contrato ao buscar todos os produtos', async () => {
        const getProductsQuery = `
            query Products {
                Products {
                    name
                    price
                }
            }
        `;

        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(getProductsQuery)
            .expectStatus(200)
            .expectJsonSchema({
                type: 'object',
                properties: {
                    data: {
                        properties: {
                            Products: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: ['string', 'null'] },
                                        price: { type: ['number', 'null'] }
                                    }
                                }
                            }
                        }
                    }
                }
            });
    });
    
    it('Deve deletar o produto', async () => {
        const deleteProductMutation = `
            mutation deleteProduct($id: ID!) {
                deleteProduct(id: $id){
                    name
                }
            }
        `;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(deleteProductMutation)
            .withGraphQLVariables({ "id": productName })
            .expectStatus(200);
    });
});
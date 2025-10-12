
const pactum = require('pactum');
const an_api_url = 'http://lojaebac.ebaconline.art.br/graphql';

describe('Serviço de Categorias - Fluxo Completo', () => {
    let authToken = '';
    let categoryName = `Categoria Teste-${Date.now()}`;

    before(async () => {
        const loginMutation = `
            mutation authUser($email: String!, $password: String!) {
                authUser(email: $email, password: $password) {
                    token
                }
            }
        `;
        console.log("Realizando login com a mutation 'authUser'...");
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
    });
    
    it('Deve adicionar uma nova categoria', async () => {
        const createCategoryMutation = `
            mutation addCategory($name: String!) {
                addCategory(name: $name) {
                    name
                }
            }`;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(createCategoryMutation)
            .withGraphQLVariables({ "name": categoryName })
            .expectStatus(200);
    });

    it('Deve editar uma categoria', async () => {
        const updatedCategoryName = `Categoria Editada-${Date.now()}`;
        const updateCategoryMutation = `
            mutation editCategory($id: ID!, $name: String!) {
                editCategory(id: $id, name: $name) {
                    name
                }
            }`;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(updateCategoryMutation)
            .withGraphQLVariables({ "id": categoryName, "name": updatedCategoryName })
            .expectStatus(200);
        
        categoryName = updatedCategoryName;
    });

    it('Deve validar o contrato ao buscar todas as categorias', async () => {
        const getCategoriesQuery = `
            query Categories {
                Categories {
                    name
                    photo
                }
            }`;

        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(getCategoriesQuery)
            .expectStatus(200)
            .expectJsonSchema({
                type: 'object',
                properties: {
                    data: {
                        properties: {
                            Categories: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        photo: { type: ['string', 'null'] }
                                    },
                                    required: ['name', 'photo']
                                }
                            }
                        }
                    }
                }
            });
    });
    
    it('Deve deletar a categoria', async () => {
        const deleteCategoryMutation = `
            mutation deleteCategory($id: ID!) {
                deleteCategory(id: $id){
                    name
                }
            }`;
        
        await pactum.spec()
            .post(an_api_url)
            .withHeaders('Authorization', `Bearer ${authToken}`)
            .withGraphQLQuery(deleteCategoryMutation)
            .withGraphQLVariables({ "id": categoryName })
            .expectStatus(200);
    });
});
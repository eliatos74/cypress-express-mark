/// <reference types = 'cypress'/>

describe('tarefas', () => {
    it('deve cadastrar uma nova tarefa', () => {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Ler um livro de nodejs' }
        }).then(response => {
            expect(response.status).to.eq(204)
        })


        cy.visit('http://10.0.0.102:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de nodejs')

        cy.contains('button', 'Create').click()

        cy.contains('main div p', 'Ler um livro de nodejs')
    })
})
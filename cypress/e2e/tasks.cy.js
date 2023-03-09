/// <reference types = 'cypress'/>

describe('tarefas', () => {

    const taskName = 'Ler um livro de nodejs'

    it('deve cadastrar uma nova tarefa', () => {
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: taskName }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.visit('http://10.0.0.102:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(taskName)

        cy.contains('button', 'Create').click()

        cy.contains('main div p', taskName)
        
    })

    it('não deve permitir tarefa duplicada', () =>{

        const task = {
            name: 'Estudar Javascript',
            is_done: false
        }

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: task.name }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        //Dado que eu tenha uma tarefa duplicada
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: task
        }).then(response => {
            expect(response.status).to.eq(201)
        })

        //Quando façp o cadastro dessa tarefa
        cy.visit('http://10.0.0.102:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(task.name)

        cy.contains('button', 'Create').click()

        //Entao vejo a mensagem duplicada
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text','Task already exists!')

    })
})
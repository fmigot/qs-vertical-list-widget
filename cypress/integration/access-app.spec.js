describe('App E2E', () => {

    // beforeEach(() => {
    //
    // });

    context ('Connect and disconnect to app', () => {

        it('Log in', () => {
            cy.visit('/app/qs/cases');
            cy.get('[name="username"]')
                .type('fmigot');
            cy.get('[name="password"]')
                .type('mdp@2020!');
            cy.get('button[name="login"]')
                .click();
        });

        it('Log out', () => {
            cy.get('[data-testid=appBar-dropdown-actions]', {timeout: 30000})
                .click()
                .get('[data-testid=appBar-logout-action]')
                .click();
        })
    })
})

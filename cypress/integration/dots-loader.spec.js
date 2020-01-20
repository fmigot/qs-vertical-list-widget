import React from '../../jspm_packages/npm/react@15.6.2'
import PropTypes from '../../jspm_packages/npm/prop-types@15.7.2/index'
import Loader from '../../src/components/utils/Loader'

describe('DotsLoader component', () => {
    it('Mount', () => {

        cy.mount(<Loader />)
        // start testing!
        // cy.contains('Hello Spider-man!')
        // // mounted component can be selected via its name, function, or JSX
        // // e.g. '@HelloState', HelloState, or <HelloState />
        // cy.get(HelloState)
        //     .invoke('setState', { name: 'React' })
        // cy.get(HelloState)
        //     .its('state')
        //     .should('deep.equal', { name: 'React' })
        // // check if GUI has rerendered
        // cy.contains('Hello React!')
    })
})

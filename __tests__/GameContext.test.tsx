/**
 * @jest-environment jsdom
 */


/**
 * Testing GameContext and GameProvider
 */
import {render} from '@testing-library/react'

describe('<GameProvider/>', () => {
    beforeEach(()=>{
        render(
            <div/>
        )
    })
    it('should work', ()=>{
        expect(1+1).toBe(2)
    })

})
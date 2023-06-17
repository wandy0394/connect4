/**
 * @jest-environment jsdom
 */


/**
 * Testing GameContext and GameProvider
 */
import {render, cleanup} from '@testing-library/react'
import { GameProvider } from '../src/context/GameContext'
import TurnCard from '../src/components/TurnCard/TurnCard'

describe('<GameProvider/>', () => {
    beforeEach(()=>{
        render(
            <GameProvider>
                <TurnCard/>
            </GameProvider>
        )
    })

    afterEach(cleanup)
})
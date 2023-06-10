import {createContext, useContext, PropsWithChildren, useState} from 'react'
import { Player } from './connect4'
type GameContextValue = {
    board:number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    currentPlayer:Player
    playDisc:(column:number) => void
}

export const GameContext = createContext<GameContextValue | undefined>(undefined)


export function useGameContext() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('Context is undefined. Hook called uutside context provider')
    }

    return context
}

const INIT_BOARD = [
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
]

export function GameProvider({children}:PropsWithChildren<any>) {
    const [board, setBoard] = useState<number[][]>(INIT_BOARD)
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)

    function playDisc(column:number) {
        let targetCell:number = -1
        for (let i = 0; i < board[column].length; i++) {
            if (board[column][i] === Player.NONE) {
                targetCell += 1
            }
        }
        if (targetCell >= 0 && targetCell <= board[column].length) {
            const newBoard = [...board]
            newBoard[column][targetCell] = currentPlayer
            setBoard(newBoard)
            nextTurn()
        }

    }

    function popout(column:number) {

        nextTurn()
    }

    function nextTurn() {
        if (currentPlayer === Player.PLAYER1) {
            setCurrentPlayer(Player.PLAYER2)
        }
        else {
            setCurrentPlayer(Player.PLAYER1)
        }
    }

    return (
        <GameContext.Provider value={{board, setBoard, currentPlayer, playDisc}}>
            {children}
        </GameContext.Provider>
    )
}
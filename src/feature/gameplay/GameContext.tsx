import {createContext, useContext, PropsWithChildren, useState} from 'react'
import { Player } from './connect4'
type GameContextValue = {
    board:number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    currentPlayer:Player
    playDisc:(column:number) => void
    winner:Player 
    resetGame: (resetScore:boolean)=>void
    score: Score
    isGameOver:boolean
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
const MAX_COUNTERS = INIT_BOARD.length * INIT_BOARD[0].length
const WIN_THRESH = 4
type Score = {
    [Player.PLAYER1]:number
    [Player.PLAYER2]:number
}
export function GameProvider({children}:PropsWithChildren<any>) {
    //create 2D deep copy of initial board
    let initialBoard = INIT_BOARD.map(b => [...b])

    const [board, setBoard] = useState<number[][]>(initialBoard)
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)
    const [score, setScore] = useState<Score>({
        [Player.PLAYER1]:0,
        [Player.PLAYER2]:0,
    })
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<Player>(Player.NONE)
    const [numCounters, setNumCounters] = useState<number>(0)

    function playDisc(column:number) {
        if (!isGameOver) {
            let targetCell:number = -1
            for (let i = 0; i < board[column].length; i++) {
                if (board[column][i] === Player.NONE) {
                    targetCell += 1
                }
            }
            if (targetCell >= 0 && targetCell <= board[column].length) {
                const newBoard = [...board]
                const newNumCounters = numCounters + 1
                newBoard[column][targetCell] = currentPlayer
                setBoard(newBoard)
                setNumCounters(newNumCounters)
                let candidateWinner = evaluateBoard()
                if (candidateWinner !== Player.NONE) {
                    endGame(candidateWinner)
                }
                else if (candidateWinner === Player.NONE && newNumCounters === MAX_COUNTERS) {
                    //handle draw
                    endGame(candidateWinner)
                }
                else {
                    nextTurn()
                }
            }
        }

    }

    function endGame(candidateWinner:Player) {
        setWinner(candidateWinner)
        let newScore = {...score}
        newScore[candidateWinner as keyof Score] += 1
        setScore(newScore)
        setNumCounters(0)
        setIsGameOver(true)

    }

    function evaluateBoard():Player {
        //check all columns
        let count = 0
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + ' in column', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }
        
        
        //check all rows
        count = 0
        for (let j = 0; j < board[j].length; j++) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + 'in row', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }
        

        //check downward diagonals

        for (let k = board[0].length - 1; k >= 0; k--) {

            for (let i = 0, j = k; i < board.length && j < board[i].length; i++, j++) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + 'in row', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }
        for (let k = 0; k < board.length; k++) {

            for (let i = k, j = 0; i < board.length && j < board[i].length; i++, j++) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + 'in row', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }

        //check upward diagonals 
        for (let k = 0; k < board[0].length; k++) {
            for (let i = 0, j = k; i < board.length && j >= 0; i++, j--) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + 'in row', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }
        for (let k = 0; k < board.length; k++) {
            for (let i = k, j = board[i].length-1; i < board.length && j >= 0; i++, j--) {
                if (board[i][j] === currentPlayer) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + currentPlayer + 'in row', i+1)
                        return currentPlayer
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }

        return Player.NONE
    }

    function popout(column:number) {

        nextTurn()
    }

    function resetGame(resetScore:boolean) {
        setBoard(initialBoard)
        setCurrentPlayer(Player.PLAYER1)
        if (resetScore) {
            setScore({
                [Player.PLAYER1]:0,
                [Player.PLAYER2]:0,
            })
        }
        setWinner(Player.NONE)
        setIsGameOver(false)
    }

    function nextTurn() {
        currentPlayer === Player.PLAYER1 ? setCurrentPlayer(Player.PLAYER2) : setCurrentPlayer(Player.PLAYER1) 
    }

    return (
        <GameContext.Provider value={{board, setBoard, currentPlayer, playDisc, winner, resetGame, score, isGameOver}}>
            {children}
        </GameContext.Provider>
    )
}
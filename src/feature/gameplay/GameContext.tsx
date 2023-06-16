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
    canPopout: (column:number) => boolean
    popout: (column:number) => void
    undoMove: () => void
    getTurnNumber: () => number
    findNewDiscPosition: (column:number) => number
}

export const GameContext = createContext<GameContextValue | undefined>(undefined)


export function useGameContext() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('Context is undefined. Hook called outside context provider')
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
const WIN_THRESH = 4
type Score = {
    [Player.PLAYER1]:number
    [Player.PLAYER2]:number
}
export function GameProvider({children}:PropsWithChildren<any>) {
    //create 2D deep copy of initial board
    let initialBoard = INIT_BOARD.map(b => [...b])

    const [board, setBoard] = useState<number[][]>(initialBoard)
    const [boardHistory, setBoardHistory] = useState<number[][][]>([initialBoard])
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)
    const [score, setScore] = useState<Score>({
        [Player.PLAYER1]:0,
        [Player.PLAYER2]:0,
    })
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<Player>(Player.NONE)

    function playDisc(column:number) {
        if (!isGameOver) {

            let targetCell:number = findNewDiscPosition(column)
            if (targetCell >= 0 && targetCell <= board[column].length) {
                const newBoard = board.map(c => [...c])
                newBoard[column][targetCell] = currentPlayer
                setBoard(newBoard)
                setBoardHistory([
                    ...boardHistory,
                    newBoard
                ])
                let currentPlayerWon = evaluateBoard(newBoard, currentPlayer)
                if (currentPlayerWon) {
                    endGame(currentPlayer)
                }
                else if (!currentPlayerWon && boardIsFull(newBoard)) {
                    //handle draw
                    endGame(Player.NONE)
                }
                else {
                    nextTurn()
                }
            }
        }

    }


    function findNewDiscPosition(column:number):number {
        let targetCell:number = -1
        for (let i = 0; i < board[column].length; i++) {
            if (board[column][i] === Player.NONE) {
                targetCell += 1
            }
        }
        if (targetCell >= 0 && targetCell <= board[column].length) return targetCell
        return -1
    }

    function endGame(candidateWinner:Player) {
        setWinner(candidateWinner)
        let newScore = {...score}
        newScore[candidateWinner as keyof Score] += 1
        setScore(newScore)
        setIsGameOver(true)
        setBoardHistory([INIT_BOARD.map(b => [...b])])
    }

    function boardIsFull(board:number[][]):boolean {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === Player.NONE) {
                    return false
                }
            }
        }
        return true
    }

    function evaluateBoard(board:number[][], player:Player):boolean {
        //check all columns
        let count = 0
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + ' in column', i+1)
                        return true
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
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + 'in row', i+1)
                        return true
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
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + 'in row', i+1)
                        return true
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
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + 'in row', i+1)
                        return true
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
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + 'in row', i+1)
                        return true
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
                if (board[i][j] === player) {
                    count++
                    if (count >= WIN_THRESH) {
                        console.log('Winner is Player ' + player + 'in row', i+1)
                        return true
                    }
                }
                else {
                    count = 0
                }
            }
            count = 0
        }

        return false
    }

    function popout(column:number) {
        if (canPopout(column)) {

            const newBoard = board.map(c=>[...c])
            for (let i = newBoard[column].length-1; i > 0; i--) {
                newBoard[column][i] = newBoard[column][i-1]   
            }
            //when popping out, there is always an empty disc. 
            //Catches cases where we popout a column that is full and the top most disc should be empty
            newBoard[column][0] = Player.NONE
            setBoard(newBoard)
            setBoardHistory([
                ...boardHistory,
                newBoard
            ])
            let player1Won = evaluateBoard(newBoard, Player.PLAYER1)
            let player2Won = evaluateBoard(newBoard, Player.PLAYER2)
            //if popping out would result in simultanous wins, it is a draw
            if (player1Won && player2Won) {
                endGame(Player.NONE)
            }
            else if (player1Won || player2Won) {
                endGame((player1Won) ? Player.PLAYER1 : Player.PLAYER2)
            }
            else {
                nextTurn()
            }
        }
    }

    function resetGame(resetScore:boolean) {
        setBoard(INIT_BOARD.map(b => [...b]))
        setCurrentPlayer(Player.PLAYER1)
        if (resetScore) {
            setScore({
                [Player.PLAYER1]:0,
                [Player.PLAYER2]:0,
            })
        }
        setWinner(Player.NONE)
        setIsGameOver(false)
        setBoardHistory([INIT_BOARD.map(b => [...b])])
    }

    function canPopout(column:number):boolean {
        for (let i = 0; i < board[column].length; i++) {
            if (board[column][i] !== Player.NONE) {
                return true
            }
        }
        return false
    }

    function getTurnNumber():number {
        return boardHistory.length
    }


    function undoMove() {
        if (!isGameOver && boardHistory.length > 1) {

            currentPlayer === Player.PLAYER1 ? setCurrentPlayer(Player.PLAYER2) : setCurrentPlayer(Player.PLAYER1) 
            setBoard(boardHistory[boardHistory.length - 2])
            setBoardHistory(boardHistory.filter((_, index) => index < (boardHistory.length - 1)))
        }
    }

    function nextTurn() {
        currentPlayer === Player.PLAYER1 ? setCurrentPlayer(Player.PLAYER2) : setCurrentPlayer(Player.PLAYER1) 
    }

    return (
        <GameContext.Provider 
            value={{
                board, 
                setBoard, 
                currentPlayer, 
                playDisc, 
                winner, 
                resetGame, 
                score, 
                isGameOver, 
                canPopout, 
                popout, 
                undoMove, 
                getTurnNumber,
                findNewDiscPosition
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
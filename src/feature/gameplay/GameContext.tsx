import {createContext, useContext, PropsWithChildren, useState} from 'react'
import { INIT_BOARD, Player, Score, canPopout, evaluateBoard, findNewDiscPosition, isBoardFull } from './connect4'
type GameContextValue = {
    board:number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    currentPlayer:Player
    playDisc:(column:number) => void
    winner:Player 
    resetGame: (resetScore:boolean)=>void
    score: Score
    isGameOver:boolean
    popout: (column:number) => void
    undoMove: () => void
    getTurnNumber: () => number
}

export const GameContext = createContext<GameContextValue | undefined>(undefined)


export function useGameContext() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('Context is undefined. Hook called outside context provider')
    }

    return context
}

export function GameProvider({children}:PropsWithChildren<any>) {
    //create 2D deep copy of initial board

    const [board, setBoard] = useState<number[][]>(INIT_BOARD)
    const [boardHistory, setBoardHistory] = useState<number[][][]>([INIT_BOARD])
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)
    const [score, setScore] = useState<Score>({
        [Player.PLAYER1]:0,
        [Player.PLAYER2]:0,
    })
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<Player>(Player.NONE)

    function playDisc(column:number) {
        if (!isGameOver) {
            let targetCell:number = findNewDiscPosition(board, column)
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
                else if (!currentPlayerWon && isBoardFull(newBoard)) {
                    //handle draw
                    endGame(Player.NONE)
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
        setIsGameOver(true)
        setBoardHistory([INIT_BOARD])
    }

    function resetGame(resetScore:boolean) {
        setBoard(INIT_BOARD)
        setCurrentPlayer(Player.PLAYER1)
        if (resetScore) {
            setScore({
                [Player.PLAYER1]:0,
                [Player.PLAYER2]:0,
            })
        }
        setWinner(Player.NONE)
        setIsGameOver(false)
        setBoardHistory([INIT_BOARD])
    }

    function popout(column:number) {
        if (canPopout(board, column)) {

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


    function getTurnNumber():number {
        return boardHistory.length
    }

    function undoMove() {
        if (!isGameOver && boardHistory.length > 1) {
            currentPlayer === Player.PLAYER1 ? setCurrentPlayer(Player.PLAYER2) : setCurrentPlayer(Player.PLAYER1) 
            const newBoard = boardHistory[boardHistory.length - 2].map(c=>[...c])
            setBoard(newBoard)
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
                popout, 
                undoMove, 
                getTurnNumber,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
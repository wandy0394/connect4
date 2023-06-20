import {createContext, useContext, PropsWithChildren, useState} from 'react'
import { INIT_BOARD, Player, Score, canPopout, isGameWon, getNewDiscRow, isBoardFull, GAME_MODE } from '../feature/gameplay/connect4'
import { MOVE_TYPE, Move, SCORE, findNextMove } from '../feature/cpu-opponent/CPU-player'
type GameContextValue = {
    board:number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    currentPlayer:Player
    playDisc:(board:number[][], column:number, player:Player) => number[][] | null
    winner:Player 
    resetGame: (resetScore:boolean)=>void
    score: Score
    isGameOver:boolean
    popout: (column:number) => void
    undoMove: () => void
    getTurnNumber: () => number
    CPUMove: (board:number[][]) => void
    gameMode:GAME_MODE
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
    const [gameMode, setGameMode] = useState<GAME_MODE>(GAME_MODE.PLAYER_VS_CPU)
    const [boardHistory, setBoardHistory] = useState<number[][][]>([INIT_BOARD])
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)
    const [score, setScore] = useState<Score>({
        [Player.PLAYER1]:0,
        [Player.PLAYER2]:0,
    })
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<Player>(Player.NONE)

    function playDisc(board:number[][], column:number, player:Player, isHumanMove:boolean = true):number[][] | null {
        if (!isGameOver) {
            let targetCell:number = getNewDiscRow(board, column)
            if (targetCell >= 0 && targetCell <= board[column].length) {
                const newBoard = board.map(c => [...c])
                newBoard[column][targetCell] = player
                setBoard(newBoard)
                setBoardHistory([
                    ...boardHistory,
                    newBoard
                ])
                let currentPlayerWon = isGameWon(newBoard, player)
                if (currentPlayerWon) {
                    endGame(player)
                }
                else if (!currentPlayerWon && isBoardFull(newBoard)) {
                    //handle draw
                    endGame(Player.NONE)
                }
                else {
                    if (isHumanMove) nextTurn()
                }
                return newBoard
            }
        }
        return board
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
            let player1Won = isGameWon(newBoard, Player.PLAYER1)
            let player2Won = isGameWon(newBoard, Player.PLAYER2)
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
        if (!isGameOver && boardHistory.length > 1 && gameMode === GAME_MODE.PLAYER_VS_PLAYER) {
            currentPlayer === Player.PLAYER1 ? setCurrentPlayer(Player.PLAYER2) : setCurrentPlayer(Player.PLAYER1) 
            const newBoard = boardHistory[boardHistory.length - 2].map(c=>[...c])
            setBoard(newBoard)
            setBoardHistory(boardHistory.filter((_, index) => index < (boardHistory.length - 1)))
        }
    }

    function nextTurn() {
        let nextPlayer = -1
        currentPlayer === Player.PLAYER1 ? nextPlayer = Player.PLAYER2 : nextPlayer = Player.PLAYER1
        // setCurrentPlayer(nextPlayer)
        if (gameMode === GAME_MODE.PLAYER_VS_PLAYER) {
        }
        // else if (gameMode === GAME_MODE.PLAYER_VS_CPU) {
        //     //make CPU move
        //     let CPU_PLAYER = Player.PLAYER2
        //     let bestMove:Move = {
        //         column:0, 
        //         moveType:MOVE_TYPE.PLAY_DISC,
        //         score:SCORE.MIN
        //     }
        //     let boardCopy = board.map(c=>[...c])
        //     for (let i = 0; i < board.length; i++) {
        //         let move = findNextMove(boardCopy, 4, CPU_PLAYER, true, {column:i, row:0, moveType:MOVE_TYPE.PLAY_DISC, score:0})
        //         if (move.score >= bestMove.score)
        //         bestMove = {...move}
        //     }
        //     console.log(bestMove)
        //     if (bestMove.column) {
        //         setTimeout(()=>{
        //             playDisc(bestMove.column as number, CPU_PLAYER, false)
        //         }, 2000)
        //         console.log('hello')
        //         // nextTurn()
        //     }
        // }
    }

    function CPUMove(board:number[][]) {
        //make CPU move
        let CPU_PLAYER = Player.PLAYER2
        let bestMove:Move = {
            column:0, 
            moveType:MOVE_TYPE.PLAY_DISC,
            score:SCORE.MIN
        }
        let boardCopy = board.map(c=>[...c])
        for (let i = 0; i < board.length; i++) {
            let move = findNextMove(boardCopy, 6, CPU_PLAYER, true, {column:i, row:0, moveType:MOVE_TYPE.PLAY_DISC, score:SCORE.MIN})
            if (move.score >= bestMove.score)
            bestMove = {...move}
        }
        console.log(bestMove)
        if (bestMove.column !== undefined) {
            setTimeout(()=>{
                playDisc(boardCopy, bestMove.column as number, CPU_PLAYER, false)
                nextTurn()
            }, 0)
        }
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
                CPUMove,
                gameMode
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
import {createContext, useContext, PropsWithChildren, useState} from 'react'
import { INIT_BOARD, Player, Score, canPopout, isGameWon, getNewDiscRow, isBoardFull, GAME_MODE, isBoardEmpty } from '../feature/gameplay/connect4'
import { MOVE_TYPE, Move, SCORE,  findNextMove } from '../feature/cpu-opponent/CPU-player'

type GameContextValue = {
    board:number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>
    currentPlayer:Player
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>
    playDisc:(board:number[][], column:number, player:Player) => GameState
    winner:Player 
    resetGame: (resetScore:boolean, firstPlayer:Player)=>void
    score: Score
    isGameOver:boolean
    popout: (column:number, board:number[][]) => GameState
    undoMove: () => void
    getTurnNumber: () => number
    CPUMove: (board:number[][], goingFirst?:boolean) => void
    gameMode:GAME_MODE,
    setGameMode: React.Dispatch<React.SetStateAction<GAME_MODE>>
    cpuThinking:boolean,
    setCpuThinking:React.Dispatch<React.SetStateAction<boolean>>
    isPVCInitialised(board:number[][], cpuThinking:boolean, isGameOver:boolean, winner:Player): boolean
}

export type GameState = {
    board:number[][],
    isGameOver:boolean
} | null

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
    const [gameMode, setGameMode] = useState<GAME_MODE>(GAME_MODE.PLAYER_VS_PLAYER)
    const [boardHistory, setBoardHistory] = useState<number[][][]>([INIT_BOARD])
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.PLAYER1)
    const [score, setScore] = useState<Score>({
        [Player.PLAYER1]:0,
        [Player.PLAYER2]:0,
        [Player.CPU]:0,
    })
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner] = useState<Player>(Player.NONE)
    const [cpuThinking, setCpuThinking] = useState<boolean>(false)

    function playDisc(board:number[][], column:number, player:Player):GameState {
        if (!isGameOver) {
            let targetCell:number = getNewDiscRow(board, column)
            if (targetCell > -1) {
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
                    return {
                        board:newBoard,
                        isGameOver:true
                    }
                }
                else if (!currentPlayerWon && isBoardFull(newBoard)) {
                    //handle draw
                    endGame(Player.NONE)
                    return {
                        board:newBoard,
                        isGameOver:true
                    }
                }
                nextTurn()
                return {
                    board:newBoard,
                    isGameOver:false
                }
            }
            else {
                //error state, throw exception here
            }
        }
        return null
    }

    function endGame(candidateWinner:Player) {
        setIsGameOver(true)
        setWinner(candidateWinner)
        let newScore = {...score}
        newScore[candidateWinner as keyof Score] += 1
        setScore(newScore)
        setBoardHistory([INIT_BOARD])
        setCpuThinking(false)

    }

    function resetGame(resetScore:boolean, firstPlayer:Player) {
        setCpuThinking(false)
        setBoard(INIT_BOARD)
        setCurrentPlayer(firstPlayer)
        if (resetScore) {
            setScore({
                [Player.PLAYER1]:0,
                [Player.PLAYER2]:0,
                [Player.CPU]:0
            })
        }
        setWinner(Player.NONE)
        setIsGameOver(false)
        setBoardHistory([INIT_BOARD])
    }

    //check if the state is ready for a game of Player vs CPU to start
    function isPVCInitialised(board:number[][], cpuThinking:boolean, isGameOver:boolean, winner:Player):boolean {
        if (cpuThinking) return false
        if (isGameOver) return false
        if (winner !== Player.NONE) return false 
        if (!isBoardEmpty(board)) return false
        return true
    }

    

    function popout(column:number, board:number[][]):GameState {
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
                //draw
                endGame(Player.NONE)
                return {
                    board:newBoard,
                    isGameOver:true
                }
            }
            else if (player1Won || player2Won) {
                endGame((player1Won) ? Player.PLAYER1 : Player.PLAYER2)
                return {
                    board:newBoard,
                    isGameOver:true
                }
            }
            nextTurn()
            return {
                board:newBoard,
                isGameOver:false
            }
        }
        return null
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
        if (gameMode === GAME_MODE.PLAYER_VS_PLAYER) {
            let nextPlayer = -1
            currentPlayer === Player.PLAYER1 ? nextPlayer = Player.PLAYER2 : nextPlayer = Player.PLAYER1
            setCurrentPlayer(nextPlayer)
        }
    }

    function CPUMove(board:number[][], goingFirst?:boolean) {
        if (isGameOver) return
        let CPU_PLAYER = Player.PLAYER2
        let bestMove:Move = {
            column:0, 
            moveType:MOVE_TYPE.PLAY_DISC,
            score:SCORE.MIN
        }
        let boardCopy = board.map(c=>[...c])
        if (!goingFirst) {
            bestMove = findNextMove(boardCopy, 1, CPU_PLAYER, true, SCORE.NEG_INF, SCORE.INF, {column:0, row:0, moveType:MOVE_TYPE.PLAY_DISC, score:SCORE.MIN})
            if (bestMove.column !== undefined) {
                if (bestMove.moveType === MOVE_TYPE.PLAY_DISC) {
                    playDisc(boardCopy, bestMove.column as number, CPU_PLAYER)
                }
                else if (bestMove.moveType === MOVE_TYPE.POPOUT) {
                    popout(bestMove.column as number, boardCopy)
                }
            }
        }
        else {
            //if going first, play randomly
            let randomColumn = Math.floor(Math.random()*boardCopy.length)
            boardCopy[randomColumn][boardCopy[randomColumn].length - 1] = CPU_PLAYER
            setBoard(boardCopy)
            setBoardHistory([
                ...boardHistory,
                boardCopy
            ])
        }
    }

    return (
        <GameContext.Provider 
            value={{
                board, 
                setBoard, 
                currentPlayer, 
                setCurrentPlayer,
                playDisc, 
                winner, 
                resetGame, 
                score, 
                isGameOver, 
                popout, 
                undoMove, 
                getTurnNumber,
                CPUMove,
                gameMode,
                setGameMode,
                cpuThinking,
                setCpuThinking,
                isPVCInitialised
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
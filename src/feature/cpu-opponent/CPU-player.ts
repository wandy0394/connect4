
//Function that looks at the board state and assigns a value to it
//If 4 in a row, return +/- 9999, otherwise 
//return (num(2 in a row) + num(3 in a row)) for Player 1 minus

import { Player, WIN_THRESH, isBoardFull, canPopout, isGameWon, getNewDiscRow } from "../gameplay/connect4"

// (num(2 in a row) + num(3 in a row) for Player 2) 
export enum SCORE {
    INF = 99999,
    NEG_INF = -99999,
    MAX = 9999,
    MIN = -9999,
    DRAW = 0
}

const MAX_SCORE = 99999
const MIN_SCORE = -99999
const DRAW_SCORE = 0

export enum MOVE_TYPE  {
    POPOUT="POPOUT",
    PLAY_DISC="PLAY_DISC"
}


export type Move = {
    column?:number,
    row?:number,
    moveType: MOVE_TYPE
    score:number
}

type GameNode = {
    board:number[][],
    targetRow?:number,
    targetColumn?:number
}

function evaluateBoard(board:number[][], player:Player, move:Move):number {

    if (move.moveType === MOVE_TYPE.PLAY_DISC) {

    }
    else if (move.moveType === MOVE_TYPE.POPOUT) {

    }


    return 10
}

function evaluatePlayDisc(board:number[][], player:Player, targetColumn:number, targetRow:number):number {
    let score = 1
    
    let offset = WIN_THRESH
    let start = targetColumn - offset  + 1
    let end = targetColumn + (WIN_THRESH - offset) 

    for (let i = 0; i < WIN_THRESH; i++) {
        if (start >= 0 && end < board.length) {
            
        }
        offset -= 1
    }


    return score
}

function evaluatePopout(board:number[][], player:Player, targetColumn:number) {

}

//Implements minimax algorithm with alpha-beta pruning at some fixed depth 

export function findNextMove(board:number[][], depth:number, player:Player, IsMaximizingPlayer:boolean, move:Move):Move {
    let gameIsWonByPlayer = isGameWon(board, player)
    let gameIsWonByOpponent = isGameWon(board, (player==Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1))

    if (gameIsWonByPlayer && gameIsWonByOpponent) {
        //draw, simultaneous win
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:DRAW_SCORE
        }
    }
    else if (gameIsWonByPlayer) {
        
        console.log('WIN')
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:MAX_SCORE
        }
    }
    else if (gameIsWonByOpponent) {
        console.log('LOSE')
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:MIN_SCORE
        }
    }
    else if (isBoardFull(board)) {
        //draw, no more valid moves
        console.log('draw')
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:DRAW_SCORE
        }
    }
    else if (depth === 0) {
        let score = evaluateBoard(board, player, move)
        console.log('EVAL ' + score)
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:score
        }
    }

    let nextPlayer = (player == Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1)
    if (IsMaximizingPlayer) {
        let maxScore = SCORE.MIN
        let maxScoreMove:Move = {
            column:move.column,
            row:move.row,
            moveType:MOVE_TYPE.PLAY_DISC,
            score:maxScore
        }
        for (let i = 0; i < board.length; i++) {
            //try every disc drop
            const gameNode = tryPlayDisc(board, i, player)
            if (gameNode !== null) {
                //update new board
                // console.log(gameNode.board[2])
                let newMove = findNextMove(gameNode.board, depth - 1, nextPlayer, false, {column:i, row:gameNode.targetRow, moveType:MOVE_TYPE.PLAY_DISC, score:maxScore})
                maxScore = Math.max(maxScore, newMove.score)
                if (maxScore === newMove.score) {
                    maxScoreMove = {
                        column:i,
                        row:gameNode.targetRow,
                        moveType:MOVE_TYPE.PLAY_DISC,
                        score:newMove.score
                    }
                }
            }
        }
        // for (let i = 0; i < board.length; i++) {
        //     //try every pop out
        //     const gameNode = tryPopOut(board, i, player)
        //     if (gameNode !== null) {
        //         //update new board
        //         let newMove = findNextMove(gameNode.board, depth - 1, nextPlayer, false, {column:i, row:gameNode.targetRow, moveType:MOVE_TYPE.POPOUT, score:maxScore})
        //         maxScore = Math.max(maxScore, newMove.score)
        //         if (maxScore === newMove.score) {
        //             maxScoreMove = {
        //                 column:i,
        //                 row:gameNode.targetRow,
        //                 moveType:MOVE_TYPE.POPOUT,
        //                 score:maxScore
        //             }
        //         }
        //     }
        // }
        return maxScoreMove
    }
    else {
        let minScore = SCORE.MAX
        let minScoreMove:Move = {
            column:move.column,
            row:move.row,
            moveType:MOVE_TYPE.PLAY_DISC,
            score:minScore            
        }
        for (let i = 0; i < board.length; i++) {
            const gameNode = tryPlayDisc(board, i, player)
            if (gameNode !== null) {
                //update new board
                let newMove = findNextMove(gameNode.board, depth - 1, nextPlayer, true, {column:i, row:gameNode.targetRow, moveType:MOVE_TYPE.PLAY_DISC, score:minScore})
                minScore = Math.min(minScore, newMove.score)
                if (minScore === newMove.score) {
                    minScoreMove = {
                        column:i,
                        row:gameNode.targetRow,
                        moveType:MOVE_TYPE.PLAY_DISC,
                        score:newMove.score
                    }
                }
            }
        }
        // for (let i = 0; i < board.length; i++) {
        //     const gameNode = tryPopOut(board, i, player)
        //     if (gameNode !== null) {
        //         //update new board
        //         let newMove = findNextMove(gameNode.board, depth - 1, nextPlayer, true, {column:gameNode.targetColumn, moveType:MOVE_TYPE.POPOUT, score:minScore})
        //         minScore = Math.min(minScore, newMove.score)
        //         if (minScore === newMove.score) {
        //             minScoreMove = {
        //                 column:gameNode.targetColumn,
        //                 row:gameNode.targetRow,
        //                 moveType:MOVE_TYPE.POPOUT,
        //                 score:minScore
        //             }
        //         }
        //     }

        // }
        return minScoreMove
    }
}

function tryPlayDisc(board:number[][], column:number, player:Player):GameNode | null {
    let targetRow:number = getNewDiscRow(board, column)
    if (targetRow >= 0 && targetRow <= board[column].length) {
        const newBoard = board.map(c => [...c])
        newBoard[column][targetRow] = player
        return {
            board:newBoard, 
            targetColumn:column,
            targetRow:targetRow,
        }

    }
    return null 
}

function tryPopOut(board:number[][], column:number, player:Player):GameNode | null {
    if (canPopout(board, column)) {
        const newBoard = board.map(c=>[...c])
        for (let i = newBoard[column].length-1; i > 0; i--) {
            newBoard[column][i] = newBoard[column][i-1]   
        }
        newBoard[column][0] = Player.NONE
        return {
            board:newBoard, 
            targetColumn:column
        }
    }
    return null
}



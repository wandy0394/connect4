
//Function that looks at the board state and assigns a value to it
//If 4 in a row, return +/- MAX, otherwise 


import { Player, WIN_THRESH, isBoardFull, canPopout, isGameWon, getNewDiscRow } from "../gameplay/connect4"

// (num(2 in a row) + num(3 in a row) for Player 2) 
export enum SCORE {
    INF = 99999,
    NEG_INF = -99999,
    MAX = 9999,
    MIN = -9999,
    DRAW = 0
}


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



export function evaluateBoard2(board:number[][], player:Player, move?:Move):number {
    let opponent = (player === Player.PLAYER1?Player.PLAYER2:Player.PLAYER1)

    let horizontalScore = 0
    let verticalScore = 0
    for (let i = 0; i < board.length; i++) {
        let offset = 0
        let tempScore = 0
        for (let j = offset; j <= board[i].length - WIN_THRESH; j++, offset++) {
            let slice = board[i].slice(j, j+WIN_THRESH)
            let numPlayerCounters = 0
            let numOpponentCounters = 0
            for (const s of slice) {
                if (s === player) {
                    numPlayerCounters++
                }
                else if (s === opponent) {
                    numOpponentCounters++
                }
            }            
            tempScore = (numOpponentCounters > 0) ? 0 : numPlayerCounters
        }
        verticalScore = Math.max(verticalScore, tempScore)
    }

    for (let j = 0; j < board[0].length; j++) {
        let offset = 0
        let tempScore = 0
        for (let i = offset; i <= board.length - WIN_THRESH; i++, offset++) {
            let numPlayerCounters = 0
            let numOpponentCounters = 0
            let slice = board.slice(i, i+WIN_THRESH).map(arr => arr[j])
            for (const s of slice) {
                if (s === player) {
                    numPlayerCounters++
                }
                else if (s === opponent) {
                    numOpponentCounters++
                }
            }
            tempScore = (numOpponentCounters > 0) ? 0 : numPlayerCounters
            horizontalScore = Math.max(horizontalScore, tempScore)
        }
    }
    return Math.max(horizontalScore, verticalScore)
}

//Implements minimax algorithm with alpha-beta pruning at some fixed depth 

export function findNextMove2(board:number[][], depth:number, player:Player, IsMaximizingPlayer:boolean, alpha:number, beta:number, move:Move):Move {
    let gameIsWonByPlayer = isGameWon(board, Player.PLAYER2)
    let gameIsWonByOpponent = isGameWon(board, Player.PLAYER1)
    // let depthFactor = 1
    let depthFactor = 1-Math.pow(0.5, depth)

    if (gameIsWonByPlayer && gameIsWonByOpponent) {
        //draw, simultaneous win
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:SCORE.DRAW*depthFactor
        }
    }
    else if (gameIsWonByPlayer) {
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:SCORE.MAX*depthFactor
        }       
    }
    else if (gameIsWonByOpponent) {
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:SCORE.MIN*depthFactor
        }
    }
    else if (isBoardFull(board)) {
        //draw, no more valid moves
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:SCORE.DRAW*depthFactor
        }
    }
    else if (depth === 0) {
        let scoreCPU = evaluateBoard2(board, Player.PLAYER2, move)
        return {
            column:move.column,
            row:move.row,
            moveType:move.moveType,
            score:scoreCPU
        }
    }

    let nextPlayer = (player == Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1)
    if (IsMaximizingPlayer) {
        let maxScore = SCORE.NEG_INF
        let maxScoreMove:Move = {
            column:move.column,
            row:move.row,
            moveType:MOVE_TYPE.PLAY_DISC,
            score:maxScore
        }
        let gameNodes:GameNode[] = []
        // for (let i = 0; i < board.length; i++) {
        for (let i = board.length - 1; i >= 0; i--) {
            const gameNode = tryPlayDisc(board, i, player)
            if (gameNode !== null) {
                gameNodes.push(gameNode)
            }
        }
        //create array from [0..board.length]
        let shuffledArray = [...Array(gameNodes.length).keys()].sort(()=>Math.random() - 0.5)
        for (let i = 0; i < shuffledArray.length; i++) {
            let gameNode = gameNodes[shuffledArray[i]]
            let newMove = findNextMove2(gameNode.board, depth - 1, nextPlayer, false, alpha, beta, {column:gameNode.targetColumn, row:gameNode.targetRow, moveType:MOVE_TYPE.PLAY_DISC, score:maxScore})
            
            if (maxScore < newMove.score) {
                maxScore = newMove.score
                maxScoreMove = {
                    column:gameNode.targetColumn,
                    row:gameNode.targetRow,
                    moveType:MOVE_TYPE.PLAY_DISC,
                    score:newMove.score
                }
            }

            if (maxScore > beta) {
                // console.log('break. Score = ' + maxScore)
                break;
            }
            alpha = Math.max(alpha, maxScore)
        }

        //clearing the array
        gameNodes.length = 0
        gameNodes = []
        for (let i = board.length - 1; i >= 0; i--) {
            const gameNode = tryPopOut(board, i, player)
            if (gameNode !== null) {
                gameNodes.push(gameNode)
            }
        }
        // console.log(gameNodes.map(c=>c.targetColumn))

        //create array from [0..board.length]
        shuffledArray = [...Array(gameNodes.length).keys()].sort(()=>Math.random() - 0.5)
        for (let i = 0; i < shuffledArray.length; i++) {
            let gameNode = gameNodes[shuffledArray[i]]
            //update new board
            let newMove = findNextMove2(gameNode.board, depth - 1, nextPlayer, false, alpha, beta, {column:gameNode.targetColumn, row:gameNode.targetRow, moveType:MOVE_TYPE.POPOUT, score:maxScore})
            if (maxScore < newMove.score) {
                maxScore = newMove.score
                maxScoreMove = {
                    column:gameNode.targetColumn,
                    row:gameNode.targetRow,
                    moveType:MOVE_TYPE.POPOUT,
                    score:maxScore
                }
            }

            if (maxScore > beta) {
                // console.log('break. Score = ' + maxScore)
                break;
            }
            alpha = Math.max(alpha, maxScore)
        }

        return maxScoreMove
    }
    else {
        let minScore = SCORE.INF
        let minScoreMove:Move = {
            column:move.column,
            row:move.row,
            moveType:MOVE_TYPE.PLAY_DISC,
            score:minScore            
        }
        let gameNodes:GameNode[] = []
        // for (let i = 0; i < board.length; i++) {
        for (let i = board.length - 1; i >= 0; i--) {
            const gameNode = tryPlayDisc(board, i, player)
            if (gameNode !== null) {
                gameNodes.push(gameNode)
            }
        }
        //create array from [0..board.length]
        
        let shuffledArray = [...Array(gameNodes.length).keys()].sort(()=>Math.random() - 0.5)
        for (let i = 0; i < shuffledArray.length; i++) {
            let gameNode = gameNodes[shuffledArray[i]]
            let newMove = findNextMove2(gameNode.board, depth - 1, nextPlayer, true, alpha, beta, {column:gameNode.targetColumn, row:gameNode.targetRow, moveType:MOVE_TYPE.PLAY_DISC, score:minScore})
            if (minScore > newMove.score) {
                minScore = newMove.score
                minScoreMove = {
                    column:gameNode.targetColumn,
                    row:gameNode.targetRow,
                    moveType:MOVE_TYPE.PLAY_DISC,
                    score:newMove.score
                }
            }
            if (minScore < alpha) {
                // console.log('break. Score = ' + minScore)
                break;
            }
            beta = Math.min(beta, minScore)
        }

        //clearing the array
        gameNodes.length = 0
        gameNodes = []
        for (let i = board.length - 1; i >= 0; i--) {
            const gameNode = tryPopOut(board, i, player)
            if (gameNode !== null) {
                gameNodes.push(gameNode)
            }
        }
        //create array from [0..board.length]
        shuffledArray = [...Array(gameNodes.length).keys()].sort(()=>Math.random() - 0.5)
        for (let i = 0; i < shuffledArray.length; i++) {
            let gameNode = gameNodes[shuffledArray[i]]
            if (gameNode !== null) {
                //update new board
                let newMove = findNextMove2(gameNode.board, depth - 1, nextPlayer, true, alpha, beta, {column:gameNode.targetColumn, moveType:MOVE_TYPE.POPOUT, score:minScore})
                if (minScore > newMove.score) {
                    minScore = newMove.score
                    minScoreMove = {
                        column:gameNode.targetColumn,
                        row:gameNode.targetRow,
                        moveType:MOVE_TYPE.POPOUT,
                        score:minScore
                    }
                }
                if (minScore < alpha) {
                    // console.log('break. Score = ' + minScore)
                    break;
                }
                beta = Math.min(beta, minScore)
            }
        }

        return minScoreMove
    }
}




function tryPlayDisc(board:number[][], column:number, player:Player):GameNode | null {
    let targetRow:number = getNewDiscRow(board, column)
    if (targetRow >= 0 && targetRow < board[column].length) {
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



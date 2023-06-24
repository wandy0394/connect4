/**
 * Module contains game logic and definitions
 * 
 */

export enum Player {
    NONE = 0,
    PLAYER1 = 1,
    PLAYER2 = 2,
    CPU = 3,
}

export enum GAME_MODE {
    PLAYER_VS_PLAYER = 0,
    PLAYER_VS_CPU = 1
}

export const INIT_BOARD = [
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
    new Array(6).fill(Player.NONE),
]
export const WIN_THRESH = 4
export type Score = {
    [Player.PLAYER1]:number
    [Player.PLAYER2]:number
    [Player.CPU]:number
}


export function isGameWon(board:number[][], player:Player):boolean {
    //check all columns
    let count = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === player) {
                count++
                if (count >= WIN_THRESH) {
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
    for (let j = 0; j < board[0].length; j++) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] === player) {
                count++
                if (count >= WIN_THRESH) {
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

export function isBoardFull(board:number[][]):boolean {
    //look for empty cells
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === Player.NONE) {
                return false
            }
        }
    }
    return true
}

export function isBoardEmpty(board:number[][]):boolean {
    //look for empty cells
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== Player.NONE) {
                return false
            }
        }
    }
    return true
}

export function canPopout(board:number[][], column:number):boolean {
    let numEmptyCells = 0
    for (let i = 0; i < board[column].length; i++) {
        numEmptyCells = board[column].filter(x => x=== Player.NONE).length
    }
    //Popout is a valid move only if the column is at least half full (rounded down)
    if (numEmptyCells <= Math.floor(board[column].length / 2)) return true
    return false
}

export function getNewDiscRow(board:number[][], column:number):number {
    let targetCell:number = -1
    for (let i = 0; i < board[column].length; i++) {
        if (board[column][i] === Player.NONE) {
            targetCell += 1
        }
        else {
            break
        } 
    }
    if (targetCell >= 0 && targetCell < board[column].length) return targetCell
    return -1
}

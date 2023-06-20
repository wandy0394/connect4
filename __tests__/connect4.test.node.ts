/**
 * Testing game logic in connect4 module
 */
import {Player, canPopout, isGameWon, getNewDiscRow, isBoardFull} from '../src/feature/gameplay/connect4'

describe('Given the INITIAL board, isBoardFull', ()=>{
    it('should return false', ()=>{
        const board = [
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]

        let output = isBoardFull(board)
        expect(output).toBe(false)
    })
})

describe('Given a board with 1 disc in the corner, isBoardFull', ()=>{
    it('should return false', ()=>{
        const board = [
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]

        let output = isBoardFull(board)
        expect(output).toBe(false)
    })
})

describe('Given a board with 2 discs in the corners, isBoardFull', ()=>{
    it('should return false', ()=>{
        const board = [
            [...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE), ...new Array(1).fill(Player.PLAYER1)],
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]
        let output = isBoardFull(board)
        expect(output).toBe(false)
    })
})

describe('Given a board with 3 discs in the corners, isBoardFull', ()=>{
    it('should return false', ()=>{
        const board = [
            [...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE), ...new Array(1).fill(Player.PLAYER1)],
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
        ]

        let output = isBoardFull(board)
        expect(output).toBe(false)
    })
})

describe('Given a board with 4 discs in the corners, isBoardFull', ()=>{
    it('should return false', ()=>{
        const board = [
            [...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE), ...new Array(1).fill(Player.PLAYER1)],
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            [...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE), ...new Array(1).fill(Player.PLAYER1)],
        ]

        let output = isBoardFull(board)
        expect(output).toBe(false)
    })
})

describe('Given a full board, isBoardFull', ()=>{
    it('should return true', ()=>{
        const board = [
            new Array(6).fill(Player.PLAYER1),
            new Array(6).fill(Player.PLAYER1),
            new Array(6).fill(Player.PLAYER1),
            new Array(6).fill(Player.PLAYER2),
            new Array(6).fill(Player.PLAYER2),
            new Array(6).fill(Player.PLAYER2),
            new Array(6).fill(Player.PLAYER2),
        ]

        let output = isBoardFull(board)
        expect(output).toBe(true)
    })
})

describe('Given a board empty columns, canPopout', ()=>{
    it('should return false', ()=>{
        const board = [
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]

        for (let i = 0; i < board.length; i++) {
            let output = canPopout(board, i)
            expect(output).toBe(false)
        }
    })
})

describe('Given a board with 1 full column, canPopout', ()=>{
    it('should return true for the full column and false otherwise', ()=>{
        const board = [
            [...new Array(3).fill(Player.PLAYER1), ...new Array(3).fill(Player.PLAYER2)],
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]

        let output = canPopout(board, 0)
        expect(output).toBe(true)
        for (let i = 1; i < board.length; i++) {
            let output = canPopout(board, i)
            expect(output).toBe(false)
        }
    })
})

describe('Given an empty board, getNewDiscRow', ()=>{
    it('should return bottommost row for every target column', () => {
        const board = [
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]

        for (let i = 0; i < board.length; i++) {
            let output = getNewDiscRow(board, i)
            expect(output).toBe(board[i].length - 1)
        }
    })
})

describe('Given a board with a full bottom row, getNewDiscRow', ()=>{
    it('should return second bottommost row for every target column', () => {
        const board = [
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
            [...new Array(1).fill(Player.PLAYER1), ...new Array(5).fill(Player.NONE)],
        ]

        for (let i = 0; i < board.length; i++) {
            let output = getNewDiscRow(board, i)
            expect(output).toBe(board[i].length - 2)
        }
    })
})

describe('Given a board with only an empty top row, getNewDiscRow', ()=>{
    it('should return top most row for every target column', () => {
        const board = [
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
            [...new Array(5).fill(Player.PLAYER1), ...new Array(1).fill(Player.NONE)],
        ]

        for (let i = 0; i < board.length; i++) {
            let output = getNewDiscRow(board, i)
            expect(output).toBe(0)
        }
    })
})

describe('Given an empty board, isGameWon', ()=>{
    const board = [
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
    ]
    it('should return false when evaluating Player 1s win state', ()=>{
        
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(false)
    })

    it('should return false when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(false)
    })
})

describe('Given a board with a 4-player-1-disc filled column, isGameWon', ()=>{
    const board = [
        [...new Array(4).fill(Player.PLAYER1), ...new Array(2).fill(Player.NONE)],
        [...new Array(3).fill(Player.PLAYER2), ...new Array(3).fill(Player.NONE)],
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
    ]
    
    it('should return true when evaluating Player 1s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(true)
    })

    it('should return false when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(false)
    })
})

describe('Given a board with a 4-player-2-disc filled row, isGameWon', ()=>{
    const board = [
        [...new Array(1).fill(Player.PLAYER2), ...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER2), ...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER2), ...new Array(1).fill(Player.PLAYER1), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER2), ...new Array(1).fill(Player.NONE), ...new Array(4).fill(Player.NONE)],
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
    ]
    it('should return false when evaluating Player 1s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(false)
    })

    it('should return true when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(true)
    })
})

describe('Given a board with a 4-player-1-disc filled upward diagonal, isGameWon', ()=>{
    const board = [
        new Array(6).fill(Player.NONE),
        [Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.PLAYER1],
        [Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.PLAYER1, Player.PLAYER2],
        [Player.NONE, Player.NONE, Player.NONE, Player.PLAYER1, Player.PLAYER2, Player.PLAYER1],
        [Player.NONE, Player.NONE, Player.PLAYER1, Player.PLAYER2, Player.PLAYER2, Player.PLAYER2],
        new Array(6).fill(Player.NONE),
        [new Array(5).fill(Player.NONE), Player.PLAYER1],
    ]
    it('should return false when evaluating Player 1s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(true)
    })

    it('should return true when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(false)
    })
})

describe('Given a board with a 4-player-2-disc filled downward diagonal, isGameWon', ()=>{
    const board = [
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        [Player.NONE, Player.NONE, Player.PLAYER2, Player.PLAYER1, Player.PLAYER1, Player.PLAYER1],
        [Player.NONE, Player.NONE, Player.NONE, Player.PLAYER2, Player.PLAYER1, Player.PLAYER1],
        [Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.PLAYER2, Player.PLAYER2],
        [Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.NONE, Player.PLAYER2],
        new Array(6).fill(Player.NONE),

    ]
    it('should return false when evaluating Player 1s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(false)
    })

    it('should return true when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(true)
    })
})

describe('Given a board with a 4-player-1-disc filled row AND a 4-player-2-disc filled row, isGameWon', ()=>{
    const board = [
        [...new Array(1).fill(Player.PLAYER1), ...new Array(1).fill(Player.PLAYER2), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER1), ...new Array(1).fill(Player.PLAYER2), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER1), ...new Array(1).fill(Player.PLAYER2), ...new Array(4).fill(Player.NONE)],
        [...new Array(1).fill(Player.PLAYER1), ...new Array(1).fill(Player.PLAYER2), ...new Array(4).fill(Player.NONE)],
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
        new Array(6).fill(Player.NONE),
    ]
    it('should return true when evaluating Player 1s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(true)
    })

    it('should return true when evaluating Player 2s win state', ()=>{
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(true)
    })
})

describe('Given a full board with no winner, isGameWon', ()=>{
    const board = [
        [...new Array(3).fill(Player.PLAYER1), ...new Array(3).fill(Player.PLAYER2)],
        [...new Array(3).fill(Player.PLAYER2), ...new Array(3).fill(Player.PLAYER1)],
        [...new Array(3).fill(Player.PLAYER1), ...new Array(3).fill(Player.PLAYER2)],
        [...new Array(3).fill(Player.PLAYER2), ...new Array(3).fill(Player.PLAYER1)],
        [...new Array(3).fill(Player.PLAYER1), ...new Array(3).fill(Player.PLAYER2)],
        [...new Array(3).fill(Player.PLAYER2), ...new Array(3).fill(Player.PLAYER1)],
        [...new Array(3).fill(Player.PLAYER1), ...new Array(3).fill(Player.PLAYER2)],
    ]
    it('should return false when evaluating Player 1s win state', ()=>{
        expect(isBoardFull(board)).toBe(true)
        let output = isGameWon(board, Player.PLAYER1)
        expect(output).toBe(false)
    })

    it('should return false when evaluating Player 2s win state', ()=>{
        expect(isBoardFull(board)).toBe(true)
        let output = isGameWon(board, Player.PLAYER2)
        expect(output).toBe(false)
    })
})
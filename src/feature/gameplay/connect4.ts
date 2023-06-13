import { theme } from "../../components/theme/theme"

export enum Player {
    NONE = 0,
    PLAYER1 = 1,
    PLAYER2 = 2,
}

export type EnumDictionary<T extends string | number, U> = {
    [key in T]:U
}

export const COLOR_DICT:EnumDictionary<Player, string> = {
    [Player.NONE]: theme.baseLight,
    [Player.PLAYER1]: theme.primaryColor,
    [Player.PLAYER2]: theme.secondaryColor,
}

export class Game {

    board:number[][]
    currentPlayer:Player
    constructor() {
        this.currentPlayer = Player.PLAYER1
        this.board = [
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(3).fill(Player.PLAYER1).concat(new Array(3).fill(Player.PLAYER2)),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
            new Array(6).fill(Player.NONE),
        ]
    }

    playDisc(column:number) {
        let targetCell:number = -1
        for (let i = 0; i < this.board[column].length; i++) {
            if (this.board[column][i] === Player.NONE) {
                targetCell += 1
            }
        }
        if (targetCell >= 0 && targetCell <= this.board[column].length) {
            this.board[column][targetCell] = this.currentPlayer
        }

        this.nextTurn()
    }

    popout(column:number) {

        this.nextTurn()
    }

    nextTurn() {
        if (this.currentPlayer === Player.PLAYER1) {
            this.currentPlayer = Player.PLAYER2
        }
        else {
            this.currentPlayer = Player.PLAYER1
        }
    }
}


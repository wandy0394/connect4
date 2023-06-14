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



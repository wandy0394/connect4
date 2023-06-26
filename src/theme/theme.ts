import { Player } from "../feature/gameplay/connect4"

export const theme = {
    primaryColor:window.getComputedStyle(document.body).getPropertyValue('--primary-color'),
    primaryColorHover:window.getComputedStyle(document.body).getPropertyValue('--primary-hover'),
    secondaryColor:window.getComputedStyle(document.body).getPropertyValue('--secondary-color'),
    secondaryColorHover:window.getComputedStyle(document.body).getPropertyValue('--secondary-hover'),
    baseColor:window.getComputedStyle(document.body).getPropertyValue('--base-color'),
    baseLight:window.getComputedStyle(document.body).getPropertyValue('--base-light'),
    white: window.getComputedStyle(document.body).getPropertyValue('--neutral-white'),
    neutralDarkGray: window.getComputedStyle(document.body).getPropertyValue('--neutral-gray-dark'),
}


export type EnumDictionary<T extends string | number, U> = {
    [key in T]:U
}

export const PLAYER_COLORS:EnumDictionary<Player, string> = {
    [Player.NONE]: theme.white,
    [Player.PLAYER1]: theme.primaryColor,
    [Player.PLAYER2]: theme.secondaryColor,
    [Player.CPU]:theme.neutralDarkGray
}
import { useState } from 'react'
import GameIcon from '../GameIcon/GameIcon'
import MenuButton from '../MenuButton/MenuButton'
import styles from './menuBar.module.css'
import { useGameContext } from '../../context/GameContext'
import MenuModal, { PAGES } from '../MenuModal/MenuModal'
import { Player } from '../../feature/gameplay/connect4'

export default function MenuBar() {
    const {resetGame} = useGameContext()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [startingPage, _] = useState<PAGES>(PAGES.GAME_MODE)
    function handleRestartClick() {
        resetGame(true, Player.PLAYER1)
    }
    return (
        <div className={styles.container}>
            <div style={{width:'25%'}}>
                <MenuButton label='MENU' onClick={()=>setModalVisible(true)}/>
            </div>
            <div>
                <GameIcon/>
            </div>
            <div style={{width:'25%', display:'flex', justifyContent:'end'}}>
                <MenuButton label='RESTART' onClick={handleRestartClick}/>
            </div>
            <MenuModal visible={modalVisible} setVisible={setModalVisible} startingPage={startingPage}/>
        </div>
    )
}
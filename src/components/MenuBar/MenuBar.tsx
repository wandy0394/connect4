import { useState } from 'react'
import GameIcon from '../GameIcon/GameIcon'
import MenuButton from '../MenuButton/MenuButton'
import styles from './menuBar.module.css'
import { useGameContext } from '../../context/GameContext'
import MenuModal from '../MenuModal/MenuModal'

export default function MenuBar() {
    const {resetGame} = useGameContext()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    return (
        <div className={styles.container}>
            <div style={{width:'25%'}}>
                <MenuButton label='MENU' onClick={()=>setModalVisible(true)}/>
            </div>
            <div>
                <GameIcon/>
            </div>
            <div style={{width:'25%', display:'flex', justifyContent:'end'}}>
                <MenuButton label='RESTART' onClick={()=>resetGame(true)}/>
            </div>
            <MenuModal visible={modalVisible} setVisible={setModalVisible}/>
        </div>
    )
}
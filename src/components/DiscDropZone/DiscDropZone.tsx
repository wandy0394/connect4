import { useGameContext } from "../../feature/gameplay/GameContext"
import {useState} from 'react'
import styles from './DiscDropZone.module.css'
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import { COLOR_DICT } from "../../feature/gameplay/connect4"

type Props = {
    animate:boolean
    resolveAnimation: (column:number) => void
}

export default function DiscDropZone(props:Props) {
    const {animate, resolveAnimation} = props
    const {board, currentPlayer} = useGameContext()
    const [selectedColumn, setSelectedColumn] = useState<number>(-1)

    return (
        <div style ={{
            display:'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            // border:'1px solid red',
            paddingLeft:'2%',
            paddingRight:'2%',
            width:'100%',
            transform:'translateY(50%)',
        }}>
            {
                board.map((_, index) => {
                    return (
                        <div 
                            id={'drop-disc-' + index} 
                            style={{
                                visibility: (selectedColumn === index) ? 'visible':'hidden',
                            }}
                        >
                        <div 
                            className={`
                                ${styles['dropping-disc']} 
                                ${(animate && selectedColumn === index) 
                                    && styles['start-drop-animation']}
                            `}
                            onAnimationEnd={()=>resolveAnimation(index)}
                        >
                            {/* <label>VVV</label> */}
                            <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}
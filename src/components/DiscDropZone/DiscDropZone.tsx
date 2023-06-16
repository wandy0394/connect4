import { useGameContext } from "../../feature/gameplay/GameContext"
import {useState} from 'react'
import styles from './DiscDropZone.module.css'
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import { COLOR_DICT } from "../../feature/gameplay/connect4"

type Props = {
    animate:boolean
    resolveAnimation: (column:number) => void
    selectedColumn:number
    [rest:string]:any
    // setSelectedColumn: React.Dispatch<React.SetStateAction<number>>
}

export default function DiscDropZone(props:Props) {
    const {selectedColumn, animate, resolveAnimation, ...rest} = props
    const {board, currentPlayer} = useGameContext()
    // const [selectedColumn, setSelectedColumn] = useState<number>(-1)

    return (
        <div 
            // id={'drop-disc-zone'} 
            {...rest}
            style ={{
                display:'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                paddingLeft:'2%',
                paddingRight:'2%',
                width:'100%',
                transform:'translateY(50%)',
            }}
        >
            {
                board.map((_, index) => {
                    return (
                        <div 
                            // id={'drop-disc-' + index} 
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
                                <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
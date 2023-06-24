import { useGameContext } from "../../context/GameContext"
import styles from './DiscDropZone.module.css'
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import { PLAYER_COLORS } from "../../theme/theme"

type Props = {
    animate:boolean
    resolveAnimation: (column:number) => void
    selectedColumn:number
    [rest:string]:any
}

export default function DiscDropZone(props:Props) {
    const {selectedColumn, animate, resolveAnimation, ...rest} = props
    const {board, currentPlayer} = useGameContext()

    return (
        <div 
            {...rest}
            className={styles['container']}
        >
            {
                board.map((_, index) => {
                    return (
                        <div 
                            key={`dropzone-key-${index}`}
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
                                <ColoredDisc color={PLAYER_COLORS[currentPlayer]} size={100}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
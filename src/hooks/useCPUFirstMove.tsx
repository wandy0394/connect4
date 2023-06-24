import { useEffect, useState } from "react"
import { useGameContext } from "../context/GameContext"
import { INIT_BOARD } from "../feature/gameplay/connect4"

type Props = {
    callback?:Function
}

export default function useCPUFirstMove(props:Props):[boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const {callback} = props
    const {CPUMove, setCpuThinking, isPVCInitialised, board, cpuThinking, isGameOver, winner} = useGameContext()
    const [startCPUMove, setStartCPUMove] = useState<boolean>(false)

    useEffect(()=>{
        //when the CPU is starting to make its first move, check the board is properly initialised
        if (isPVCInitialised(board, cpuThinking, isGameOver, winner) && startCPUMove) {
            setCpuThinking(true)
            function makeCPUMove() {
                CPUMove(INIT_BOARD, true)
                setCpuThinking(false)
                setStartCPUMove(false)
            }
            setTimeout(()=>makeCPUMove(), 250 + Math.floor(Math.random()*250))
            if (callback !== undefined) callback()
        }
    }, [board, cpuThinking, isGameOver, winner, startCPUMove])
    return [startCPUMove, setStartCPUMove]
}
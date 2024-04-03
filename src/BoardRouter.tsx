import { useParams } from "react-router-dom"
import { BoardOverview } from "./BoardOverview"

export const BoardRouter = () => {
    const params = useParams<{busStopId: string}>()
    console.log(params)

    return <div>
    {params.busStopId && <div>
        <BoardOverview busStopId={params.busStopId}/>
    </div>}
    </div>
}
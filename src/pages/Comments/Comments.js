import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { getComments } from "../../functions/comments"
import { CommentsList } from "./Components/CommentsList"

export const Comments = () => {

    const params = useParams()
    const [comments, setComments] = useState(null)
    
    const updateComments = () => {
        getComments(params, true)
            .then(r => setComments(r.message))
    }
    
    useEffect(() => {
        updateComments()

    },[])

    

    return (
        <div>
            {comments == null ? null : <CommentsList data={comments} updateHandler={updateComments}/>}
        </div>
    )
}
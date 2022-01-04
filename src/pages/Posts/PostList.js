import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPosts, getPostsById } from "../../functions/posts"

export const PostList = () => {

    
    const params = useParams()
    const [posts, setPosts] = useState([])

    

    useEffect(() => {
        
        getPostsById(params.blogId)
            .then((r) => setPosts(r.message))
    },[])


    const Row = ({data}) => {
        return (
            
            <div className="flex flex-row w-full text-center divide-x">
                <span   className="min-w-48 w-full truncate">{data.title}</span>
                <span   className="min-w-32 w-full truncate">{data.slug}</span>
                <span   className="min-w-48 w-full truncate">{data.created_at}</span>
                <span   className="min-w-48 w-full truncate">{data.updated_at}</span>
                <Link className="min-w-48 w-full" to={`/dashboard/posts/${params.blogId}/edit/${data.id}`}>
                    <span>Edytuj post</span>
                </Link>
            </div>
        )
    }


    return (
        <div>
            <div className="text-black bg-slate-300 rounded-t-lg mt-5 last:rounded-b-lg">
                {posts.map((x) => {
                    return (
                        <Row key={x.id} data={x}/>
                    )
                })}
            </div>
        </div>
    )

}
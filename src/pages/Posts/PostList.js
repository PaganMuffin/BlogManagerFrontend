import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPosts, getPostsById } from "../../functions/posts"
import { PostListTable } from "./Components/PostListTable"

export const PostList = () => {

    
    const params = useParams()
    const [posts, setPosts] = useState([])

    

    useEffect(() => {
        
        getPostsById(params.blogId)
            .then((r) => setPosts(r.message))
    },[])


    return (
        <div className="flex flex-col space-y-5">
            <Link to={`/dashboard/posts/${params.blogId}/new`} className="items-end ml-auto">
                <button 
                    className="h-8 w-max px-2 bg-green-600 rounded-md"
                >Utwórz post</button>
            </Link>
            <PostListTable data={posts} />
        </div>
    )

}
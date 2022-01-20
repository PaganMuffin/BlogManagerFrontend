import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPosts, getPostsById } from "../../functions/posts"
import { PostListTable } from "./Components/PostListTable"

export const CommentsBlogPosts = () => {

    const params = useParams()
    const [posts, setPosts] = useState([])

    

    useEffect(() => {
        
        getPostsById(params.blogId)
            .then((r) => setPosts(r.message))
    },[])


    return (
        <div className="flex flex-col space-y-5">
            <PostListTable data={posts} />
        </div>
    )

}
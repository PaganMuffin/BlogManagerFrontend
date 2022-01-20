import { useEffect, useState } from "react"
import { getBlogs } from "../../functions/blogs"
import { BlogListTable } from "./Components/BlogListTable"

export const CommentsBlogs = () => {


    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        getBlogs()
            .then((r) => setBlogs(r.message))
    },[])

    return (
        <>
            {blogs.length === 0 ? null : <BlogListTable data={blogs} />}
        </>
    )
}
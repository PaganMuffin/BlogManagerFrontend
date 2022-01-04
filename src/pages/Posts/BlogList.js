import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogs } from "../../functions/blogs"
import { getPosts } from "../../functions/posts"
import { BlogListTable } from "./Components/BlogListTable"

export const BlogList = () => {

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
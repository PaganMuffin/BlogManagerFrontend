import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogs } from "../../functions/blogs"
import { getPosts } from "../../functions/posts"

export const BlogList = () => {

    const [blogs, setBlogs] = useState([])

    

    useEffect(() => {
        getBlogs()
            .then((r) => setBlogs(r.message))
    },[])


    const Row = ({data}) => {
        return (
            
            <div className="flex flex-row w-full text-center divide-x">
                <span   className="min-w-48 w-full truncate">{data.title}</span>
                <span   className="min-w-32 w-full truncate">{data.author_name}</span>
                <span   className="min-w-48 w-full truncate">{data.name}</span>
                <Link className="min-w-48 w-full" to={`/dashboard/posts/${data.id}`}>
                    <span>Lista postów</span>
                </Link>
                <Link className="min-w-48 w-full" to={`/dashboard/posts/${data.id}/new`}>
                    <span>Nowy post</span>
                </Link>
            </div>
        )
    }


    return (
        <div>
            <div className="text-black bg-slate-300 rounded-t-lg mt-5 last:rounded-b-lg">
                {blogs.map((x) => {
                    return (
                        <Row key={x.id} data={x}/>
                    )
                })}
            </div>
        </div>
    )
}
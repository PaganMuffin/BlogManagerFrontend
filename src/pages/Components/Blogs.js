import { useEffect, useState } from "react"
import { getBlogs } from "../../functions/blogs"

export const Blogs = (props) => {
    const token = localStorage.getItem('token')
    const [blogs, setBlogs] = useState([])
    const rowColumns = {"title":"Tytuł", "author_name":"Autor", "slug":"Adres"}
    useEffect(() => {
        getBlogs(token)
            .then((x) => {
                console.log(x)
                setBlogs(x.message)
            })
    },[])

    const Row = ({data}) => {
        return (
            <div className="flex flex-row w-full text-center ">
                <span className="w-32">{data.title}</span>
                <span className="w-32">{data.author_name}</span>
                <span className="w-32">{data.slug}</span>
            </div>
        )
    }

    return (

        <div className="text-black bg-slate-300 rounded-lg">
            <div className="flex flex-row w-full text-center font-semibold">
                <span className="w-32">{rowColumns.title}</span>
                <span className="w-32">{rowColumns.author_name}</span>
                <span className="w-32">{rowColumns.slug}</span>
            </div>
            {blogs.map((x) => {
                return (
                    <Row key={x.id} data={x}/>
                )
            })}
        </div>
    )
}
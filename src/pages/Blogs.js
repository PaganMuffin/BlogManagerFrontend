import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteBlog, getBlogs } from "../functions/blogs"
import { DeleteIcon, ExternalIcon } from "../icons"
import { BlogTable } from "./Components/BlogTable"
import { CreateBlogDialog } from "./Components/CreateBlogDialog"
import { EditBlogDialog } from "./Components/EditBlogDialog"

export const Blogs = (props) => {
    
    const [blogs, setBlogs] = useState([])

    const updateBlogsList = () => {
        getBlogs()
            .then((x) => {
                setBlogs(x.message)
            })
            .catch((e) => {
                //alert(e)
            })
    }

    useEffect(() => {
        updateBlogsList()
    },[])


    const onDelete = (id) => {
        deleteBlog(id)
            .then((r) => {
                //console.log(r)
                //r.code == 200 ? alert("Udało się usunąć") : alert("Nie udało się usunąć")
                if(r.code === 200){
                    getBlogs()
                        .then((x) => {
                            setBlogs(x.message)
                        })
                }
            })

    }


    return (
        <div className="flex flex-col w-full space-y-5">
            <div className="ml-auto">
                <CreateBlogDialog setBlogsHandler={setBlogs}/>
            </div>
            {blogs.length === 0 ? null : 
                <BlogTable data={blogs} updateBlogsListHandler={updateBlogsList} onDelete={onDelete}/>
            }
        </div>
    )
}
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteBlog, getBlogs } from "../functions/blogs"
import { DeleteIcon, ExternalIcon } from "../icons"
import { CreateBlogDialog } from "./Components/CreateBlogDialog"
import { EditBlogDialog } from "./Components/EditBlogDialog"

export const Blogs = (props) => {
    
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getBlogs()
            .then((x) => {
                setBlogs(x.message)
            })
            .catch((e) => {
                alert(e)
            })
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

    

    const Row = ({data}) => {
        return (
            
            <div className="flex flex-row w-full text-center ">
                <div className="flex flex-row w-5/6">
                    <span   className="min-w-48 w-full">{data.title}</span>
                    <span   className="min-w-32 w-full">{data.author_name}</span>
                    <span   className="min-w-48 w-full">{data.name}</span>
                    <a      className="w-full min-w-48" href={`${process.env.REACT_APP_API_URL}/file/${data.banner}`}  target="_blank" >
                        <div className="flex flex-row justify-center items-start ">
                            <span>
                                Banner
                            </span>
                            <ExternalIcon/>
                        </div>
                    </a>
           

                </div>
                <div className="flex w-1/6 flex-row-reverse">
                    <button className="px-1 h-full" onClick={() => onDelete(data.id)} >
                        <DeleteIcon/>
                    </button>
                    <EditBlogDialog setBlogsHandler={setBlogs} blogId={data.id}/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full ">
            <div className="ml-auto">
                <CreateBlogDialog setBlogsHandler={setBlogs}/>
            </div>
            {blogs.length === 0 ? null : 
                <div className="text-black bg-slate-300 rounded-t-lg mt-5 last:rounded-b-lg" >
                    
                    <div className="flex flex-row w-full text-center font-semibold">
                        <div className="flex flex-row w-5/6">
                            <span className="min-w-48 w-full">
                                {"Nazwa bloga"}
                            </span>
                            <span className="min-w-32 w-full">
                                {"Autor"}
                            </span>
                            <span className="min-w-48 w-full">
                                {"Adres"}
                            </span>
                            <span className="min-w-48 w-full">
                                {"Banner"}
                            </span>
                        </div>

                    </div>
                    {blogs.map((x) => {
                        return (
                            <Row key={x.id} data={x}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}
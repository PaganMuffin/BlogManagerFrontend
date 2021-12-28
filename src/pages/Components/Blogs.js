import { useEffect, useState } from "react"
import { deleteBlog, getBlogs } from "../../functions/blogs"
import { CreateBlogDialog } from "./CreateBlogDialog"
import { EditBlogDialog } from "./EditBlogDialog"

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
                <div className="flex flex-row w-4/6">
                    <span   className="min-w-48 w-full">{data.title}</span>
                    <span   className="min-w-32 w-full">{data.author_name}</span>
                    <span   className="min-w-48 w-full">{data.name}</span>
                </div>
                <div className="flex flex-row w-1/6 ml-auto">
                    <button className="min-w-max px-1 w-full bg-green-200" onClick={() => onDelete(data.id)} >Usuń</button>
                    <button className="min-w-max px-1 w-full bg-green-200"  >Edytuj baner</button>
                    <EditBlogDialog/>
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
                <div className="text-black bg-slate-300 rounded-t-lg mt-5">
                    
                    <div className="flex flex-row w-full text-center font-semibold">
                        <div className="flex flex-row w-4/6">
                            <span className="min-w-48 w-full">
                                {"Nazwa bloga"}
                            </span>
                            <span className="min-w-32 w-full">
                                {"Autor"}
                            </span>
                            <span className="min-w-48 w-full">
                                {"Adres"}
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
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editPost, getPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';
import { slugify } from '../../functions/utils'
import { FileCard } from "../Components/FileCard";
import { getFiles } from "../../functions/files";

export const EditPost = () => {

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const [filesInPost, setFilesInPost] = useState([])

    useEffect(() => {
        getPost(params)
            .then((r) => {
                setTitle(r.message.title)
                setContent(r.message.content)
                setLoading(true)
                setFilesInPost(r.message.files)
            })
            .then(() => {
                getFiles()
                    .then(x => setFiles(x.message))
            })
        

    }, [])

    const addFileToPost = (id, filename) => {
        console.log(id, filename)
        const arr = [...filesInPost]
        arr.push({id, filename})
        setFilesInPost(arr)
    }

    const editRandomPost = async () => {
            const d = {
                title, content, filesInPost
            }
            editPost(d, params)
                .then(r => console.log(r))
                .then(() => window.location.reload())
    }


    return (
        <>
            {!loading ? null : 
            <div className="flex flex-col ">
                <button
                    onClick={editRandomPost}
                    className="h-8 w-max px-2 bg-green-600 rounded-md items-end ml-auto"
                >Edytuj post</button>
                <form className="text-black flex flex-col">
                
                    <label className='font-semibold'>Tytuł posta</label>
                    <input
                        className="text-black rounded-md px-2 py-1 outline-none"
                        value={title}
                        onChange={(e) => {
                            const t = e.target.value 
                            setTitle(t)
                        }}
                    />   
                    <MDEditor
                        className="mt-5"
                        value={content}
                        onChange={setContent}
                    />

                    <div className="bg-red-700 mt-5">
                        {filesInPost.map((x,idx) => {
                            console.log(x)
                            return (
                                <div >
                                    <p onClick={() => {
                                        const arr = [...filesInPost]
                                        arr.splice(idx,1)
                                        setFilesInPost(arr)
                                    }} key={x.id}>{x.filename}</p>
                                    
                                </div>
                            )
                        })}
                    </div>

                    <label  className='font-semibold'>Wybierz pliki do dodania</label>
                    <div className="grid gap-4 overflow-auto mt-5"
                        style={{
                            height:`calc(100vh - 200px)`,
                            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                            gridAutoRows: "minmax(min-content, max-content)"
                        }}
                    >
                        {files.map((x) => { 
                            console.log(x.id)
                            console.log(filesInPost)
                            const dis = (filesInPost.findIndex(y => x.id === y.file_id) === -1 ? true : false)
                            console.log(dis)
                            return <FileCard key={x.id} data={x} addToPost={true} disableAddToPost={dis} addToPostHanler={addFileToPost} />
                            
                        })}
                    </div>


                    <label>tagi</label>
                </form>
            </div>
            
            }
        </>
    )
}
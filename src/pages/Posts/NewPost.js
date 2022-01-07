import { useDebugValue, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';
import { getFiles } from "../../functions/files";
import { FileCard } from "../Components/FileCard";

export const NewPost = () => {

    const params = useParams()
    const [blogId, setBlogId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("**Hello world!!!**");
    const [files, setFiles] = useState([])
    const [filesInPost, setFilesInPost] = useState([])

    useEffect(() => {
        setBlogId(params.blogId)
        getFiles()
            .then(x => setFiles(x.message))
    }, [])

    const addFileToPost = (id, filename) => {
        console.log(id, filename)
        const arr = [...filesInPost]
        arr.push({id, filename})
        setFilesInPost(arr)
    }

    const createRandomPost = async () => {
        const d = {
            title, content, filesInPost
        }
        createPost(d, blogId)
            .then(r => console.log(r))
    }

    return (
        <div className="flex flex-col ">
            <button
                onClick={createRandomPost} 
                className="h-8 w-max px-2 bg-green-600 rounded-md items-end ml-auto"
            >Dodaj post</button>
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
                        const dis = (filesInPost.findIndex(y => x.id === y.id) === -1 ? true : false)
                        return <FileCard key={x.id} data={x} addToPost={true} disableAddToPost={dis} addToPostHanler={addFileToPost} />
                        
                    })}
                </div>


                <label>tagi</label>
            </form>
        </div>
    )
}
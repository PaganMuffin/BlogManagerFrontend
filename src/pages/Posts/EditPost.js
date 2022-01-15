import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editPost, getPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';
import { slugify } from '../../functions/utils'
import { FileCard } from "../Components/FileCard";
import { getFiles } from "../../functions/files";
import { XIcon } from "../../icons";

export const EditPost = () => {

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const [filesInPost, setFilesInPost] = useState([])
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState("")

    useEffect(() => {
        getPost(params)
            .then((r) => {
                setTitle(r.message.title)
                setContent(r.message.content)
                setLoading(true)
                setFilesInPost(r.message.files)
                setTags(r.message.tags.map(x => x.name))
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
                title, content, filesInPost, tags
            }
            editPost(d, params)
                .then(r => console.log(r))
                .then(() => window.location.reload())
    }

    const Tag = ({name, idx}) => {
        return (
            <div className="flex items-center justify-center space-x-1 bg-slate-300 px-2 rounded-lg">
                <span >{name}</span>
                <button onClick={(e) => {
                    e.preventDefault()
                    const arr = [...tags]
                    arr.splice(idx, 1)
                    setTags(arr)
                }}><XIcon/></button>
            </div>
        )
    }

    const FileName = ({name, idx}) => {
        return (
            <div className="flex items-center justify-center space-x-1 bg-slate-300 px-2 rounded-lg">
                <span >{name}</span>
                <button onClick={(e) => {
                    e.preventDefault()
                    const arr = [...filesInPost]
                    arr.splice(idx, 1)
                    setFilesInPost(arr)
                }}><XIcon/></button>
            </div>
        )
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

                <label  className='font-semibold'>Tagi</label>
                <div className="flex w-full space-x-2">
                    <input 
                        className="text-black rounded-md px-2 py-1 outline-none w-full"
                        value={tag}
                        onChange={(e) => {
                            const t = e.target.value
                            setTag(t)
                        }}
                    />
                    <button 
                        className="w-max px-2 bg-green-600 rounded-md text-white"
                        onClick={(e) => {
                            e.preventDefault()
                            const arr = [...tags]
                            arr.push(tag)
                            setTags(arr)
                            setTag("")
                        }}
                    >Dodaj</button>
                </div>

                    <div className="flex flex-wrap w-full bg-white p-2 mt-2 rounded-lg gap-2">
                        {tags.length == 0 ? <span className="invisible" >.</span> : null}
                        {tags.map((x, idx) => <Tag name={x} idx={idx} />)}
                    </div>
            

                <label  className='font-semibold mt-2'>Załączone pliki</label>
                <div className="flex flex-wrap w-full bg-white p-2 mt-2 rounded-lg gap-2">
                    {filesInPost.length == 0 ? <span className="invisible" >.</span> : null}
                    {filesInPost.map((x, idx) => <FileName name={x.filename} idx={idx} />)}
                </div>

                <label  className='font-semibold mt-2'>Wybierz pliki do dodania</label>
                <div className="grid gap-4 overflow-auto"
                    style={{
                        height:"100%",
                        gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                        gridAutoRows: "minmax(min-content, max-content)"
                    }}
                >
                    {files.map((x) => { 
                        const dis = (filesInPost.findIndex(y => x.id === y.id) === -1 ? true : false)
                        return <FileCard key={x.id} data={x} addToPost={true} disableAddToPost={dis} addToPostHanler={addFileToPost} />
                        
                    })}
                </div>
                </form>
            </div>
            
            }
        </>
    )
}
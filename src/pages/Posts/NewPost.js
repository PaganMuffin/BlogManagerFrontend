import { useDebugValue, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';
import { getFiles } from "../../functions/files";
import { FileCard } from "../Components/FileCard";
import { DeleteIcon, XIcon } from "../../icons";

export const NewPost = () => {

    const params = useParams()
    const [blogId, setBlogId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("**Hello world!!!**");
    const [files, setFiles] = useState([])
    const [filesInPost, setFilesInPost] = useState([])
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState("")
    const [showFiles, setShowFiles] = useState(false)
    const [showBannerFiles, setShowBannerFiles] = useState(false)
    const [banner, setBanner] = useState({id:null, filename:"default.png"})

    useEffect(() => {
        setBlogId(params.blogId)
        getFiles()
            .then(x => setFiles(x.message))
    }, [])

    const addFileToPost = (id, filename) => {
        const arr = [...filesInPost]
        arr.push({id, filename})
        setFilesInPost(arr)
    }

    const addFileAsBanner = (id, filename) => {
        setBanner({id,filename})
    }

    const createRandomPost = async () => {
        const d = {
            title, content, filesInPost, tags, banner: banner.filename
        }
        createPost(d, blogId)
            .then(r => console.log(r))
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
        <div className="flex flex-col">
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

                <div className=" rounded-lg border shadow-md bg-slate-800 h-56 flex mt-5">
                    <div className="flex justify-center w-full items-center aspect-video bg-white bg-opacity-20 h-56">
                        <img className="rounded-lg h-52" src={`${process.env.REACT_APP_API_URL}/file/${banner.filename}`} alt="" />
                    </div>  
                </div>

                <button 
                    className="w-full  h-8 px-2 bg-orange-400 rounded-md text-white mt-2"
                    onClick={(e) => {
                        e.preventDefault()
                        setBanner({id:null, filename:"default.png"})
                    }}
                >
                    Zresetuj banner         
                </button>

                <label className='font-semibold mt-2'>Wybierz banner</label>
                <button 
                    className="w-full  h-8 px-2 bg-orange-400 rounded-md text-white mt-2"
                    onClick={(e) => {
                        e.preventDefault()
                        const s = showBannerFiles
                        setShowBannerFiles(!s)
                    }}
                >
                    {showBannerFiles ? "Ukryj pliki" : "Pokaż pliki"}            
                </button>
                {
                    !showBannerFiles ? 
                        null
                    :
                    <>
                        {files.length == 0 ?  null :
                        <>
                            <label  className='font-semibold mt-2'>Wybierz pliki do dodania</label>
                            <div className="grid gap-4 overflow-auto"
                                style={{
                                    height:"300px",
                                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                                    gridAutoRows: "minmax(min-content, max-content)"
                                }}
                            >
                                {files.map((x) => { 
                                    const dis = !(banner?.filename === x.filename)
                                    return <FileCard key={x.id} data={x} addToPost={false} addFileAsBanner={true} canBeAddetAsBanner={dis} addFileAsBannerHandler={addFileAsBanner} />
                                    
                                })}
                            </div>
                        </>
                        } 
                    </>
                }




                <MDEditor
                    className="mt-5"
                    value={content}
                    onChange={setContent}
                />

                
                <label  className='font-semibold mt-2'>Tagi</label>
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
                <button 
                    className="w-full  h-8 px-2 bg-orange-400 rounded-md text-white mt-2"
                    onClick={(e) => {
                        e.preventDefault()
                        const s = showFiles
                        setShowFiles(!s)
                    }}
                >
                    {showFiles ? "Ukryj pliki" : "Pokaż pliki"}            
                </button>
                {
                    !showFiles ? 
                        null
                    :
                    <>
                        {files.length == 0 ?  null :
                        <>
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
                        </>
                        } 
                    </>
                }
                
            </form>
        </div>
    )
}
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import MDEditor from '@uiw/react-md-editor';
import { DownloadIcon } from "../icons";


export const PostView = () => {

    const params = useParams()
    const [post, setPost] = useState(null)
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/post/${params.blogId}/${params.postId}`)
            .then(res => res.json())
            .then(res => {
                setPost(res.message)
            })
    },[])

    return (
        <div className="flex w-full h-full bg-slate-200 overflow-auto p-5 justify-center">
            {post === null ? null : 
            <div className="flex flex-col gap-5 max-w-5xl w-full" >
                <div className="relative max-h-96 w-full rounded-lg">
                    <img className="max-h-96 w-full object-cover rounded-lg" src={`${process.env.REACT_APP_API_URL}/file/${post.banner}`}></img>
                    <p 
                        className={`absolute w-full bottom-0 bg-slate-600 bg-opacity-60 text-white text-4xl font-bold rounded-b-lg p-2`}
                        style={{
                            lineClamp:2,
                            WebkitLineClamp:2,
                            display:'-webkit-box',
                            WebkitBoxOrient:'vertical',
                            overflow:'hidden'

                        }}
                     >
                         {post.title}
                    </p>
                </div>

                <MDEditor.Markdown
                    style={{
                        width:"100%"    
                    }}
                    source={post.content}
                />
                <div>
                    {post.files.map(file => {
                        return (
                            <a download href={`${process.env.REACT_APP_API_URL}/file/${file.filename}`} className="flex bg-slate-600 text-white text-sm font-bold p-1 mb-1 rounded-lg gap-2">
                                <p key={file.filename} className="">{file.filename}</p>
                                <DownloadIcon/>
                            </a>
                        )
                    })}
                </div>

                <div className="flex flex-wrap gap-5">
                    {post.tags.map(tag => {
                        return (
                            <Link to={`/blog/${params.blogId}?tag=${tag.name}`}>
                               <span key={tag.name} className="">#{tag.name}</span>
                            </Link>
                        )
                    })}
                </div>

            </div>
            }
        </div>
    )
}
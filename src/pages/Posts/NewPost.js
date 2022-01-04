import { useDebugValue, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createPost } from "../../functions/posts"

export const NewPost = () => {

    const params = useParams()
    const [blogId, setBlogId] = useState("")
    useEffect(() => {
        setBlogId(params.blogId)
    }, [])

    const createRandomPost = async () => {
        const d = {
            slug:"testowy-post",
            title:"Hejka test",
            content:`A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on \`textarea\` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.`
        }
        createPost(d, blogId)
            .then(r => console.log(r))
    }

    return (
        <div>
            <button className="w-32 h-32 bg-slate-600 " onClick={createRandomPost}>
                Create Post
            </button>
        </div>
    )
}
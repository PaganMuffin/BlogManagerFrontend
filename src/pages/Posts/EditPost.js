import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editPost, getPost } from "../../functions/posts"

export const EditPost = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        getPost(params)
            .then((r) => setPost(r.message))
    }, [])

    const editRandomPost = async () => {
        const r = (Math.random() + 1).toString(36).substring(20);
        console.log(r)
        const d = {
            slug:"testowy-post-2222",
            title:"Hejka tu IAB",
            content:`asklfhajkslfhnasjklfhaskjf \n A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on \`textarea\` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.`
        }
        editPost(d, params)
            .then(r => console.log(r))
            .then(() => window.location.reload())
    }

    return (
        <div className="text-black">
            {JSON.stringify(params)}
            {JSON.stringify(post)}
            <button className="w-32 h-32 bg-slate-600" onClick={editRandomPost}>
                Edytuj post randomowo
            </button>
        </div>
    )
}
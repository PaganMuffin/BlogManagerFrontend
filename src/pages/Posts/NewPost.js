import { useDebugValue, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';

export const NewPost = () => {

    const params = useParams()
    const [blogId, setBlogId] = useState("")
    useEffect(() => {
        setBlogId(params.blogId)
    }, [])

    const [value, setValue] = useState("**Hello world!!!**");

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
        <div className="flex flex-col ">
            <button
                onClick={createRandomPost} 
                className="h-8 w-max px-2 bg-green-600 rounded-md items-end ml-auto"
            >Utwórz post</button>
            <div className="text-black">
                <p> Tytuł </p>
                <p> Slug autor gen </p>
                <MDEditor
                    value={value}
                    onChange={setValue}
                />
            </div>
        </div>
    )
}
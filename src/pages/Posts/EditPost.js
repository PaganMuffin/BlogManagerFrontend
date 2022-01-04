import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editPost, getPost } from "../../functions/posts"
import MDEditor from '@uiw/react-md-editor';
import { slugify } from '../../functions/utils'

export const EditPost = () => {

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        getPost(params)
            .then((r) => {
                setTitle(r.message.title)
                setSlug(r.message.slug)
                setContent(r.message.content)
                setLoading(true)
            })
    }, [])

    const editRandomPost = async () => {

        const d = {
            slug:slugify(title),
            title:title,
            content:content
        }

        console.log(d)
        //editPost(d, params)
        //    .then(r => console.log(r))
        //    .then(() => window.location.reload())
    }


    return (
        <>
            {!loading ? null : 
            <div className="flex flex-col ">
                <button
                    onClick={editRandomPost}
                    className="h-8 w-max px-2 bg-green-600 rounded-md items-end ml-auto"
                >Utwórz post</button>
                <div className="text-black">
                    <p> {title} </p>
                    <p> {slug} </p>
                    <MDEditor
                        value={content}
                        onChange={setContent}
                    />
                </div>
            </div>
            
            }
        </>
    )
}
import { useEffect, useState } from "react"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
import { polishPlurals } from 'polish-plurals';
import { getComments, postComment } from "../../functions/comments";

export const CommentsBlog = () => {

    




    const params = useParams()
    const [comments, setComments] = useState([])
    const [author_name, setAuthor] = useState("anon")
    const location = useLocation()

    useEffect(() => {
        getComments(params)
            .then(res => setComments(res.message))
    }, [])

    useEffect(() => {
        const g = new URLSearchParams(location.search).get("c")
        if(g)
            document.getElementById(g)?.scrollIntoView()
    },[location.search])


    const handleSubmit = (e) => {
        const content = document.getElementById("editable_comment").innerText
        const data = {
            content,author_name
        }
        postComment(data, params)
            .then((res) => {
                getComments(params)
                    .then((res) => setComments(res.message))

                    
            })
            .catch((err) => alert(err.message))
        document.getElementById("editable_comment").innerText = ""
    }

    const Comment = ({data}) => {
        return (
            
            <div id={data.id} className="flex flex-col w-full p-2">
                    <div className="flex w-full gap-2 items-baseline">
                        <span className="text-lg font-semibold">{data.author_name}</span>
                        <Link to={`?c=${data.id}`}>
                            <span className="text-xs opacity-70">{new Date(data.created_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
                        </Link> 
                    </div>
                    <p className="break-words">
                        {data.content}
                    </p>
                </div>
        )
    }



    return (
        <div className="bg-slate-300 p-2 rounded-lg">
            <p>{comments.length} {polishPlurals("komentarz", "komentarze", "komentarzy", comments.length)}</p>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    Pseudonim: <input value={author_name} onChange={(e) => setAuthor(e.target.value)} className="rounded-md px-2 py-1 " type="text"/>
                </div>
                <div 
                    contentEditable={true}
                    id="editable_comment"
                    aria-label="Dodaj komentarz"    
                    className="rounded-md px-2 py-1 bg-white"
                    placeholder="Enter your text here"

                />
                <button onClick={handleSubmit} className="ml-auto  bg-blue-500  p-2 rounded-lg  font-bold hover:bg-opacity-20 transition ease-out" >Dodaj komentarz</button>
            </div>
            <div className="">
                {comments.map(c => <Comment  data={c}/>)}
            </div>
        </div>
    )
} 
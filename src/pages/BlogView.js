import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"


function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }

export const BlogView = () => {

    const navigator = useNavigate()
    const params = useParams()
    const query = useQuery();
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    

    useEffect(() => {
        const p = Number(query.get("page")) || page
        setPage(p)
        navigator(`/blog/${params.blogId}?page=${p}`)
        fetch(`${process.env.REACT_APP_API_URL}/api/blog/${params.blogId}?page=${p}`)
            .then(res => res.json())
            .then(res => {
                setData(res.message)
            })
    }, [])

    const Post = ({title, banner, slug}) => {
        return (
            <Link to={`${slug}`}>
                <div className="relative overflow-hidden  aspect-[21/12] rounded-lg">
                    <img src={`${process.env.REACT_APP_API_URL}/file/${banner}`} alt="Avatar" className="object-cover w-full h-full" />
                    <p className="absolute w-full p-2 bottom-0  bg-slate-600 text-white text-sm text-center leading-4 truncate">{title}</p>
                </div>
            </Link>
        )
    }

    return (
        <div className="flex w-full h-full bg-slate-200 overflow-auto p-5 justify-center">
            {data === null ? null : 
            <div className="md:max-w-5xl flex flex-col gap-5 ">
                <img className="max-h-96 w-full object-cover rounded-lg" src={`${process.env.REACT_APP_API_URL}/file/${data.banner}`}></img>
                <div className="grid gap-4"
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gridAutoRows: "minmax(min-content, max-content)"
                    }}
                >
                    {data.posts.map(post => {
                        return (
                            <Post key={post.slug} title={post.title} banner={post.banner} slug={post.slug} />
                        )
                    })}
                </div>
                <div className="flex w-full">
                    <button disabled={page == 1}    className={`mr-auto text-lg font-semibold ${page == 1 ? "opacity-25" : ""}`} >Poprzednia strona</button>
                    <button disabled={!data.next}   className={`ml-auto text-lg font-semibold ${!data.next ? "opacity-25" : ""}`} >Następna strona strona</button>

                </div>
            </div>
            }
        </div>
    )

}
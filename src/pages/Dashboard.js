import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import { logOut } from "../functions/auth";
import { Blogs } from "./Blogs"
import { Comments } from "./Comments/Comments";
import { CommentsBlogPosts } from "./Comments/CommentsBlogPosts";
import { CommentsBlogs } from "./Comments/CommentsBlogs";
import { Files } from "./Files";
import { BlogList } from "./Posts/BlogList";
import { EditPost } from "./Posts/EditPost";
import { NewPost } from "./Posts/NewPost";
import { PostList } from "./Posts/PostList";

export const Dashboard = () => {
    const nav = useNavigate()
    const [activeTab, setActiveTab] = useState("")


    const location = useLocation()
    const params = useParams()

    useEffect(() => {
        document.title = "BlogManager - Dashboard" 
    },[])

    useEffect(() => {
        setActiveTab(params["*"].split("/")[0])
    }, [location.pathname])

    const TabButton = ({ name, id}) => {

        return (
            <button 
            onClick={() => {
                setActiveTab(id)
                nav(`/dashboard/${id}`)
            }}
            className={`
                ${activeTab == id ? "text-slate-300" : "text-slate-500"}
                px-5 py-2 font-bold h-16 w-full flex xl:justify-start items-center space-x-5
            `}>
                <span className="">
                    {name}
                </span>
            </button>
        )
    }

    return (
        <div className="text-white flex flex-row w-full h-screen  bg-slate-200">
            <div className="h-full w-48 flex flex-col bg-slate-800">
                <div className="flex justify-center items-center h-16 w-48 bg-blue-500">
                    <span className=" font-bold text-xl z-10">
                        BlogManager
                    </span>
                </div>
                <div className="min-w-48 ">
                    <TabButton name="Blogi" id="blogs"/>
                    <TabButton name="Posty" id="posts"/>
                    <TabButton name="Pliki" id="files"/>
                    <TabButton name="Komentarze" id="comments"/>
                </div>
                <button onClick={() => {
                    logOut()
                        .then((s) => {
                            if(s) nav("/")
                        })

                }} className="mt-auto font-semibold bg-slate-700 py-5">
                    Wyloguj
                </button>
            </div>
            <div className="w-full h-screen">
                <div className="flex justify-center items-center h-16 w-full bg-blue-500 "/>
                <div className="px-10 mt-5 overflow-auto" style={{
                    height:`calc(100vh - 100px)`,
                }}>
                    <Routes>
                        <Route path="blogs" element={<Blogs/>}/>
                        <Route path="files" element={<Files/>}/>

                        <Route path="/posts" element={<BlogList/>}/>
                        <Route path="/posts/:blogId/new" element={<NewPost/>}/>
                        <Route path="/posts/:blogId" element={<PostList/>}/>
                        <Route path="/posts/:blogId/edit/:postId" element={<EditPost/>}/>

                        <Route path="/comments" element={<CommentsBlogs/>}/>
                        <Route path="/comments/:blogId" element={<CommentsBlogPosts/>}/>
                        <Route path="/comments/:blogId/:postId" element={<Comments/>}/>

                    </Routes>

                </div>
            </div>
        </div>
    );
}


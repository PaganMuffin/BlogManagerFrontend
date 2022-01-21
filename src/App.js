import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import { tokenValidate } from './functions/auth';
import { BlogView } from './pages/BlogView';
import { PostView } from './pages/PostView';


const App = () => {
    const [ready, setReady] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams()

    useEffect(() => {
        const loc = location.pathname.split("/")[1]
        const token = localStorage.getItem('token')
        console.log(loc)
        if(loc === "dashboard" || loc === "auth"){
            tokenValidate(token)
                .then(x => {
                    console.log(x)
                    if(x && loc === "auth"){
                        //add option with params redirect
                        navigate(`/dashboard/blogs`);
                        setReady(true)
                    } else if(!x && loc === "dashboard"){
                        navigate('/auth/login')
                        setReady(true)
                    } else {
                        setReady(true)
                    }
                })
        } else {
            setReady(true)
        }
        
    },[])


    const Red = () => {
        useEffect(() => {
            navigate('/auth/login')
        },[])
        return (
            <div>
                Redirecting...
            </div>
        )
    }

    return (
        <div className="w-screen h-screen overflow-hidden ">
            {!ready ? null :  
                <Routes>
                    <Route path="/dashboard/*" element={<Dashboard/>}/>
                    <Route path="/auth/:type/*" element={<Auth/>}/>
                    <Route path="/blog/:blogId/:postId" element={<PostView/>}/>
                    <Route path="/blog/:blogId" element={<BlogView/>}/>
                    <Route path="*" element={<Red/>}/>
                </Routes>
            }
        </div>
    );
}

export default App;

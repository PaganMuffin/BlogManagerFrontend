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
/*     const [alerts, setAlerts] = useState([])
    const [newAlert, setNewAlert] = "" */

/*     const storageChangeHanler = () => {
        const al =  localStorage.getItem("test")
        updateAlers(al)
    }

    const updateAlers = (al) => {
        let arr = [...alerts]
        arr.push(al)
        setAlerts(arr)
    } */

    useEffect(() => {
        const token = localStorage.getItem('token')
        tokenValidate(token)
            .then(x => {
                const loc = location.pathname.split("/")[1]
                if(x &&  loc === "auth"){
                    //add option with params redirect
                    navigate('/dashboard/blogs');
                }
                if(!x && loc === "dashboard"){
                    navigate('/auth/login')
                }
            })
        
/*         const event = new Event("storage_change")
        window.custom_event = event
        window.addEventListener("storage_change", storageChangeHanler)
        return () => window.removeEventListener("storage_change", storageChangeHanler)
 */
    },[])
  return (
    <div className="w-screen h-screen overflow-hidden ">
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/auth/:type/*" element={<Auth/>}/>
            <Route path="/blog/:blogId/:postId" element={<PostView/>}/>
            <Route path="/blog/:blogId" element={<BlogView/>}/>
            <Route path="*" element={<div>404</div>}/>
        </Routes>

    </div>
  );
}

export default App;

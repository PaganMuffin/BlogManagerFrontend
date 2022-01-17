import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import { tokenValidate } from './functions/auth';


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
                if(x){
                    if(location.pathname.split("/")[1] !== "dashboard")
                        navigate('/dashboard/blogs');
                } else {
                    navigate('/auth/login');
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
        </Routes>

    </div>
  );
}

export default App;

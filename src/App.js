import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import { tokenValidate } from './functions/auth';


const App = () => {
    const [ready, setReady] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem('token')
        tokenValidate(token)
            .then(x => {
                if(x){
                    if(location.pathname !== "/dashboard")
                        navigate('/dashboard/blogs');
                } else {
                    navigate('/auth/login');
                }
            })
    },[])
  return (
    <div className="w-screen h-screen overflow-hidden">
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/auth/:type" element={<Auth/>}/>
        </Routes>
    </div>
  );
}

export default App;

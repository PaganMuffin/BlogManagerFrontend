import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoginComponent } from "./Components/Login";
import { RegisterComponent } from "./Components/Register";

export const Auth = () => {
    const navigate = useNavigate();
    const params = useParams()
    const location = useLocation()

    const [loading, setloading] = useState(false)
    const [activeTab, setActiveTab] = useState('login')

    useEffect(() => {
        setActiveTab(params.type)
    },[location.pathname])


    return (
        <>
        {loading ? <div>Loading</div> : 
        
        <div className="flex items-center justify-center w-full h-full text-white bg-slate-200">
            <div className="flex flex-col justify-center w-96 h-124 bg-blue-500 shadow-xl shadow-blue-600/40 rounded-lg ">
                <span className="text-center px-16 text-3xl py-8 font-bold ">
                    BlogManager
                </span>
            
                <div className="">
                    <button onClick={() => {
                        navigate("/auth/login")   
                        setActiveTab("login")
                    }}
                    className={`w-1/2 h-12 font-semibold rounded-tr-lg ${activeTab === "login" ? "bg-slate-800" : ""}`}>Zaloguj</button>
                    <button onClick={() => {
                        navigate("/auth/register")
                        setActiveTab("register")
                    }}
                    className={`w-1/2 h-12 font-semibold rounded-tl-lg ${activeTab === "register" ? "bg-slate-800 " : ""}`}>Rejestracja</button>
                </div>
                <div className="px-16 bg-slate-800 h-full rounded-b-lg">
                    
                    {activeTab === "login" ? <LoginComponent/> : <RegisterComponent/>}

                </div>
            </div>
        </div>
        }
        </>
    );

}
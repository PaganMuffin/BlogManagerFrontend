import { useEffect, useState } from "react";
import { tokenValidate } from "../functions/auth";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setloading] = useState(false)
    const [activeTab, setActiveTab] = useState('login')

    const params = useParams()
    useEffect(() => {
        if(location.pathname === "/auth/login")
            setActiveTab("login")
        else
            setActiveTab("register")
    },[])

    const login = async (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("email", email)
        fd.append("password", password)
        const f = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method:"POST",
            body:fd,
        })
        if(f.ok){
            const token = f.headers.get("Authorization").split(" ")[1]
            localStorage.setItem('token',token)
            navigate('/dashboard/blogs');

        } else {
            console.log(await f.json())
        }
        
    }
    const register = async (event) => {
        if(password != confirmPassword){
            alert("Hasła się od siebie różnią")
            return;
        }

        event.preventDefault();
        const fd = new FormData();
        fd.append("email", email)
        fd.append("password", password)

        const f = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
            method:"POST",
            body:fd,
        })

        if(f.ok){
            setActiveTab("login")
            navigate('/auth/login');
        } else {
            alert("Nie udało się założyć konta")
        }
        
    }

    const LoginComponent = () => {
        return (
            <form onSubmit={login} className="flex flex-col">
                <label className="mt-3 font-semibold">Adres e-mail</label>
                <input
                    autoFocus
                    className="rounded-md px-2 py-1 "
                    type="email" 
                    id="email" 
                    required 
                    placeholder="admin@admin.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label className="mt-3 font-semibold">Hasło</label>
                <input
                    className="rounded-md px-2 py-1 outline-none"
                    type="password" 
                    id="password" 
                    required 
                    placeholder="***"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <input
                    className="mt-7 w-full bg-white py-1 rounded-full font-bold" 
                    type="submit"
                    value="Zaloguj"
                />
            </form>
        )
    }

    const RegisterComponent = () => {
        return (
            <form onSubmit={register} className="flex flex-col ">
                <label className="mt-3 font-semibold">Adres e-mail</label>
                <input
                    autoFocus
                    className="rounded-md px-2 py-1 "
                    type="email" 
                    id="email" 
                    required 
                    placeholder="admin@admin.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label className="mt-3 font-semibold">Hasło</label>
                <input
                    className="rounded-md px-2 py-1 outline-none"
                    type="password" 
                    id="password" 
                    required 
                    placeholder="***"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <label className="mt-3 font-semibold">Potwierdź hasło</label>
                <input
                    className="rounded-md px-2 py-1 outline-none"
                    type="password" 
                    id="confirm_password" 
                    required 
                    placeholder="***"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                />
                <input
                    className="mt-7 w-full bg-white py-1 rounded-full font-bold" 
                    type="submit"
                    value="Zarejestruj"
                />
            </form>
        )
    }

    return (
        <>
        {loading ? <div>Loading</div> : 
        
        <div className="flex items-center justify-center w-full h-full ">
            <div className="flex flex-col justify-center w-96 h-124 bg-blue-400 shadow-xl shadow-blue-600/50 rounded-lg ">
                <span className="text-center px-16 text-3xl py-8 font-bold ">
                    BlogManager
                </span>
            
                <div className="">
                    <button onClick={() => {
                        navigate("/auth/login")   
                        setActiveTab("login")
                    }}    className={`w-1/2 h-12 font-semibold rounded-tr-lg ${activeTab === "login"       ? "bg-white bg-opacity-30" : ""}`}>Zaloguj</button>
                    <button onClick={() => {
                        navigate("/auth/register")
                        setActiveTab("register")
                    }} className={`w-1/2 h-12 font-semibold rounded-tl-lg ${activeTab === "register" ? "bg-white bg-opacity-30" : ""}`}>Rejestracja</button>
                </div>
                <div className="px-16 bg-white bg-opacity-30 h-full">
                    {activeTab === "login" ? <LoginComponent/> : <RegisterComponent/>}

                </div>
            </div>
        </div>
        }
        </>
    );

}
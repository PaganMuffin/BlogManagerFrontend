import { useEffect, useState } from "react";
import { tokenValidate } from "../functions/auth";
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        tokenValidate(token)
            .then(x => {
                if(x){
                    console.log("ZALOGOWAN")
                    navigate('/dashboard');
                } else {
                    setloading(false)
                }
            })
    },[])

    const Login = async (event) => {
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
            navigate('/dashboard');

        } else {
            console.log(await f.json())
        }
        
    }

    return (
        <>
        {loading ? <div>Loading</div> : 
        
        <div className="flex items-center justify-center w-full h-full ">
            <div className="flex flex-col px-16 justify-centerw-96 h-96 bg-blue-400 shadow-xl shadow-blue-600/50 rounded-lg ">
                <span className="text-center text-3xl py-16 font-bold ">
                    BlogManager
                </span>
                <form onSubmit={Login} className="flex flex-col">
                    <label className="font-semibold">Adres e-mail</label>
                    <input
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
                    <label className="mt-5 font-semibold">Hasło</label>
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
                        className="mt-5 w-full bg-white py-1 rounded-full font-bold" 
                        type="submit"
                        value="Zaloguj"
                    />
                </form>
            </div>
        </div>
        }
        </>
    );

}
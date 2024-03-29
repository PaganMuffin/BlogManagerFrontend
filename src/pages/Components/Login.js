import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const LoginComponent = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

    return (
        <form onSubmit={login} className="flex flex-col">
            <label className="mt-3 font-semibold">Adres e-mail</label>
            <input
                className="rounded-md px-2 py-1 text-black"
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
                className="rounded-md px-2 py-1 outline-none text-black"
                type="password" 
                id="password" 
                required 
                placeholder="***"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <button
                className="mt-7 w-full bg-white bg-opacity-10 py-1 rounded-full font-bold hover:bg-opacity-20 transition ease-out" 
                type="submit"
                value="Zaloguj"
            >
                Zaloguj
            </button>
        </form>
    )
}
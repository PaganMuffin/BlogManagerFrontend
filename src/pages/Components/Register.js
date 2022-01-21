import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RegisterComponent = () => {

    const navigate = useNavigate()
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = async (event) => {
        console.log("DASDA")
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
            navigate('/auth/login');
        } else {
            alert("Nie udało się założyć konta")
        }
        
    }

    return (
        <form onSubmit={register} className="flex flex-col ">
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
            <label className="mt-3 font-semibold">Potwierdź hasło</label>
            <input
                className="rounded-md px-2 py-1 outline-none text-black"
                type="password" 
                id="confirm_password" 
                required 
                placeholder="***"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}
            />
            <button
                className="mt-7 w-full bg-white bg-opacity-10 py-1 rounded-full font-bold hover:bg-opacity-20 transition ease-out" 
                type="submit"
                value="Zarejestruj"
            >
                Zarejestruj
            </button>
        </form>
    )
}
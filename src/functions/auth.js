export const tokenValidate = async (token) => {
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/auth_check`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return f.ok
    
}

export const logOut = async () => {
    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    if (f.ok) window.location.reload()

    return f.ok
}
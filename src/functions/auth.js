export const tokenValidate = async (token) => {
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/auth_check`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return f.ok
    
}
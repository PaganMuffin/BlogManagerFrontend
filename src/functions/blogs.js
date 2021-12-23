export const getBlogs = async (token) => {
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    if(f.ok)
        return f.json()
    return null
}
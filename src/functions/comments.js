export const postComment = async (d, params) => {

    const fd = new FormData()

    Object.keys(d).forEach(e => {
        fd.append(e,( typeof d[e] !== 'string' ? JSON.stringify(d[e]) : d[e]))
    })

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${params.postId}`, {
        method:"POST",
        body:fd
    })
    if(f.ok)
        return await f.json()
    else
        throw new Error((await f.json()).message)
}

export const getComments = async (params, auth = false) => {
    console.log(auth)
    if(!auth){
        const f = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${params.blogId}/${params.postId}`)
        return await f.json()
    } else {

        const token = localStorage.getItem("token")

        const f = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${params.blogId}/${params.postId}`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const j = await f.json()
        return j
    }
}


export const deleteComment = async (params, commentId) => {
    const token = localStorage.getItem("token")

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${params.blogId}/${params.postId}/${commentId}`, {
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(f.ok)
        return await f.json()
    else
        throw new Error((await f.json()).message)
}
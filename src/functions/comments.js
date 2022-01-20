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

export const getComments = async (params) => {
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${params.blogId}/${params.postId}`)
    return await f.json()
}
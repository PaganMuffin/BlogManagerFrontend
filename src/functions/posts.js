export const getPosts = async () => {

    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return await f.json()
    
}

export const getPostsById = async (blogId) => {
    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${blogId}`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return await f.json()
}

export const createPost = async (data, blogId) => {
    const token = localStorage.getItem('token')

    const fd = new FormData()

    Object.keys(data).forEach(e => {
            fd.append(e,( typeof data[e] !== 'string' ? JSON.stringify(data[e]) : data[e]))
    })

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${blogId}`, {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body:fd
    })
    return await f.json()
}

export const getPost = async ({postId, blogId}) => {
    const token = localStorage.getItem('token')

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${blogId}/${postId}`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return await f.json()
}


export const editPost = async (data, {blogId,postId}) => {
    const token = localStorage.getItem('token')

    const fd = new FormData()

    Object.keys(data).forEach(e => {
        fd.append(e,( typeof data[e] !== 'string' ? JSON.stringify(data[e]) : data[e]))
    })

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${blogId}/${postId}`, {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body:fd
    })
    return await f.json()
}

export const deletePost = async (blogId, postId) => {
    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${blogId}/${postId}`, {
        method:"DELETE",
        headers: {
            "Authorization": "Bearer " + token
        },

    })

    return await f.json()
}
export const getBlogs = async () => {

    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return await f.json()
}

export const createBlog = async (event, data) => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append("name", data.name) // slug
    fd.append("title", data.title) // blog title

    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs`, {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: fd
    })
    return await f.json()
}

export const deleteBlog = async (id) => {

    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, {
        method:"DELETE",
        headers: {
            "Authorization": "Bearer " + token
        },

    })

    return await f.json()
}

export const getBlog = async (id) => {

    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        },

    })
    if(f.ok){
        return await f.json()
    } else {
        throw TypeError()
    }
}

export const updateBlog = async (event, data, id) => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append("name", data.name) // slug
    fd.append("title", data.title) // blog title
    fd.append("author_name", data.authorName)
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: fd
    })
    if(f.ok)
        return await f.json()
    else {
        const j = await f.json()
        throw TypeError(j.message)
    }
}

export const updateBanner = async (e, blogId, fileId) => {
    const fd = new FormData()
    fd.append("fileId", fileId)

    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}/banner`, {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body:fd

    })
    if(f.ok){
        return await f.json()
    } else {
        throw TypeError()
    }
}
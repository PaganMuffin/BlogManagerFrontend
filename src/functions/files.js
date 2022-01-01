export const getFiles = async () => {
    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/file/files`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return f.json()
}

export const uploadFile = async (e, file) => {
    e.preventDefault();

    const token = localStorage.getItem('token')
    const fd = new FormData();
    fd.append("file", file);

    const f = await fetch("http://localhost:8080/api/file", {
        method:"POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body:fd
    })
    return f.json()
}

export const deleteFile = async (id) => {
    const token = localStorage.getItem('token')
    const f = await fetch(`${process.env.REACT_APP_API_URL}/api/file/${id}`, {
        method:"DELETE",
        headers: {
            "Authorization": "Bearer " + token
        },

    })

    return await f.json()
}
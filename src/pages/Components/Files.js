import { useEffect, useState } from "react"
import { getFiles } from "../../functions/files"
import { FileCard } from "./FileCard"
import { FileUploadDialog } from "./FileUploadDialog"

export const Files = () => {

    const [files, setFiles] = useState([])

    const updateFiles = () => {
        getFiles()
            .then((r) => {
                setFiles(r.message)
            })
    }

    useEffect(() => {
        updateFiles()
    },[])

    return (
        <div className="flex flex-col w-full overflow-hidden">
            <div className="ml-auto">
                <FileUploadDialog updateFile={updateFiles}/>
            </div>
            <div className="grid gap-4 overflow-auto mt-5 px-5"
                style={{
                    height:`calc(100vh - 200px)`,
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                    gridAutoRows: "minmax(min-content, max-content)"
                }}
            >
                {files.map((x) => <FileCard data={x} updateFile={updateFiles}/>)}
            </div>
        </div>
    )
}
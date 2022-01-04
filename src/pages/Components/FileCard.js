import { deleteFile } from "../../functions/files"
import { BlogIcon, CopyIcon, DeleteIcon, DownloadIcon, EditIcon } from "../../icons"
import { UpdateBannerDialog } from "./UpdateBannerDialog"

export const FileCard = ({data, updateFile}) => {

    const img_ext = ["png", "avif", "gif", "jpg", "jpeg", "jfif", "pjpeg", "pjp", "webp", "bmp", "ico"]
    const ext = data.filename.split(".").pop()

    return (
        <div className=" rounded-lg border shadow-md bg-slate-800 ">
        <div className="flex justify-center items-center aspect-video bg-white bg-opacity-20">
            { img_ext.includes(ext) ? 
                <img className="rounded-t-lg h-full " src={`${process.env.REACT_APP_API_URL}/file/${data.filename}`} alt="" />
                :
                <img className="rounded-t-lg h-full " src={`https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png`} alt="" />
            }
            
        </div>
        <p className=" px-2 tracking-tight text-white truncate">{data.filename}</p>
        <div className="flex flex-row items-center justify-center w-full space-x-5 my-1">
            <button title="Kopiuj do schowka" onClick={() => {
                navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/file/${data.filename}`)
            }}>
                <CopyIcon/>
            </button>
            <button title="Usuń plik" onClick={() => {
                deleteFile(data.id)
                updateFile()
            }}>
                <DeleteIcon/>
            </button>
            {img_ext.includes(ext) ? <UpdateBannerDialog fileId={data.id} filename={data.filename}/> : null}
            <a title="Pobierz plik" href={`${process.env.REACT_APP_API_URL}/file/${data.filename}`} download={`${process.env.REACT_APP_API_URL}/file/${data.filename}`} target="_blank">
                
                <DownloadIcon/>
            </a>
        </div>
    </div>
    )
}
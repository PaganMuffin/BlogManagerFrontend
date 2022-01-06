import { Link, useParams } from "react-router-dom"
import { DeleteIcon, ExternalIcon } from "../../icons"
import { EditBlogDialog } from "./EditBlogDialog"

export const BlogTable = ({data, setBlogsHandler, onDelete}) => {

    const Row = ({data}) => {
        return (
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                        {data.title}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.author_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{data.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{new Date(data.created_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{new Date(data.updated_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a className="w-full min-w-48" href={`${process.env.REACT_APP_API_URL}/file/${data.banner}`}  target="_blank" >
                        <div className="flex flex-row items-center ">
                            <span className="text-sm text-gray-900">
                                Banner
                            </span>
                            <ExternalIcon/>
                        </div>
                    </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <EditBlogDialog setBlogsHandler={setBlogsHandler} blogId={data.id}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-sm text-gray-900" onClick={() => onDelete(data.id)} >
                        <DeleteIcon/>
                    </button>
                </td>
            </tr>
        )
    }


    return (
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nazwa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Autor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Adres
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utworzony
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edytowany
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Banner
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Nowy post</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Nowy post</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <Row data={data[0]}/>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

    )
}
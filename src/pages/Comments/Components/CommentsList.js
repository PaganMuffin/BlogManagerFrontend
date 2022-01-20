import { useParams } from "react-router-dom"
import { deleteComment } from "../../../functions/comments"
import { DeleteIcon } from "../../../icons"

export const CommentsList = ({data, updateHandler}) => {

    const params = useParams()
    const Row = ({data}) => {
        return (
            <tr>
                <td className="px-6 py-  break-all">
                    <div className="text-sm font-medium text-gray-900">
                        {data.author_name}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{new Date(data.created_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                </td>
                <td className="px-6 py-4 break-all">
                    <div 
                        className="text-sm text-gray-900 line-clamp-3"
                        onClick={(e) => {
                            if(e.target.className.includes("line-clamp-3")){
                                e.target.classList.remove("line-clamp-3")
                                e.target.classList.add("line-clamp-none")
                            }
                        }}
                    >{data.content}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-black" onClick={() => {
                        deleteComment(params, data.id )
                            .then((r) => alert(r.message))
                            .then((r) => updateHandler())
                            .catch(err => alert(err.message))
                    }}>
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
                            Autor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utworzony
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Zawartość
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Usuń post</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map(element => 
                        <Row key={element.id} data={element}/>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

    )
}
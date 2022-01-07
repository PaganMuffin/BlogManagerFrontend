import { Link, useParams } from "react-router-dom"
import { deletePost } from "../../../functions/posts"

export const PostListTable = ({data}) => {

    const params = useParams()
    const Row = ({data}) => {

        return (
            <tr>
                <td className="px-6 py-  break-all">
                    <div className="text-sm font-medium text-gray-900">
                        {data.title}
                    </div>
                </td>
                <td className="px-6 py-4 break-all">
                    <div className="text-sm text-gray-900">{data.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{new Date(data.created_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{new Date(data.updated_at*1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/posts/${params.blogId}/edit/${data.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Edytuj post
                    </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => {
                        deletePost(params.blogId, data.id)
                            .then((r) => console.log(r))
                            .then((r) => window.location.reload())
                    }} className="text-indigo-600 hover:text-indigo-900">
                        Usuń post
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
                        Tytuł
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
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edytuj post</span>
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
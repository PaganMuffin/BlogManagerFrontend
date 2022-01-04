import { Link, useParams } from "react-router-dom"

export const BlogListTable = ({data}) => {

    const params = useParams()

    const Row = ({data}) => {
        console.log(data)
        return (
            <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        {data.title}
                    </div>
                </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{data.author_name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{data.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-gray-900">{data.created_at}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-gray-900">{data.updated_at}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/dashboard/posts/${data.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Lista postów
                </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/dashboard/posts/${data.id}/new`} className="text-indigo-600 hover:text-indigo-900">
                    Nowy Post
                </Link>
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
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Lista postów</span>
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
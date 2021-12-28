import { Dialog, Transition  } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { createBlog, getBlogs } from '../../functions/blogs'
import { slugify } from '../../functions/utils'


export const CreateBlogDialog = ({setBlogsHandler}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")

    const closeModal = () => {
        setIsOpen(false)
      }
    
    const openModal = () => {
        setIsOpen(true)
    }

    
    const handleSubmit = async (e) => {
        const d = {
            name: slugify(title),
            title: title
        }
        createBlog(e,d)
            .then((x) => {

                getBlogs()
                    .then((x) => {
                        setBlogsHandler(x.message)
                        closeModal()
                    })
                    .catch((e) => {
                        alert(e)
                    })
                    
            })
            .catch((e) => {
                alert(e.message)
            })
    }

    return (
        <div>
            <button 
                onClick={openModal}
                className="h-8 w-max px-2 bg-green-600 items-end ml-auto rounded-md"
            >Utwórz blog</button>
            <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
        
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md  my-8 overflow-hidden text-left align-middle transition-all transform bg-bg_dark shadow-xl rounded-2xl">
                            <div className="bg-blue-500 bg-opacity-100 text-white p-4">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6"
                                >
                                    Utwórz blog
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form className='flex flex-col' onSubmit={(e) => {
                                        handleSubmit(e)
                                    }}>
                                        <label className='font-semibold'>Nazwa bloga</label>
                                        <input
                                            className="text-black rounded-md px-2 py-1 outline-none"
                                            value={title}
                                            onChange={(e) => {
                                                const t = e.target.value 
                                                setTitle(t)
                                            }}
                                        />

                                        <label className='mt-5 font-semibold'>Adres bloga</label>
                                        <input disabled className='text-black rounded-md px-2 py-1 outline-none' value={`${document.location.origin}/blog/${slugify(title)}`}/>
                            

                                        <input type="submit" value="Utwórz" className='py-1 bg-green-700 mt-4 rounded-md'/>
                                    </form>
                                    
                                    
                                    
                                </div>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
          </Transition>
        </div>
    )
}
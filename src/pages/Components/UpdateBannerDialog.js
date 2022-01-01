import { Dialog, Transition  } from '@headlessui/react'
import { useState, Fragment, useEffect } from 'react'
import { getBlogs, updateBanner } from '../../functions/blogs'
import { uploadFile } from '../../functions/files'
import { BlogIcon, FlagIcon } from '../../icons'

export const UpdateBannerDialog = ({fileId, filename}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        if(isOpen){
            getBlogs()
                .then((r) => {
                    setBlogs(r.message)
                })
                .catch((e) => {
                    alert(e.message)
                })
        }
    },[isOpen])

    const closeModal = () => {
        setIsOpen(false)
      }
    
    const openModal = () => {
        setIsOpen(true)
    }

    const handleSet = (blogId, idx) => {
        updateBanner(null,blogId, fileId)
            .then((r) => {
                blogs[idx].banner = filename
                const arr = [...blogs]
                setBlogs(arr)
            })
    }

    return (
        <div className='flex items-center justify-center'>
            <button 
                title="Ustaw plik jako banner" 
                onClick={openModal}
            >
                <BlogIcon/>
            </button>
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
                                    Wrzuć plik
                                </Dialog.Title>
                                <div className="mt-2 flex flex-col">
                                    <p className='font-semibold'>Lista blogów</p>
                                    {blogs.map((e,idx) => {

                                        return (
                                            <div className="flex flex-row border-b-2 mt-2 p-2" >
                                                <span className='font-semibold'>{e.title}</span>
                                                <button
                                                    disabled={e.banner === filename}
                                                    className={`ml-auto ${e.banner === filename ? "text-white opacity-30" : "text-green-400"}`}

                                                    onClick={() => handleSet(e.id,idx)}
                                                >
                                                    <FlagIcon/>
                                                </button>
                                                
                                            </div>
                                        )
                                    })}
                                    <button 
                                        className='p-1 bg-slate-600 mt-4 rounded-md w-24 ml-auto' 
                                        onClick={closeModal}
                                        ttile="Zamknij okno dialogowe">
                                        Zamknij
                                    </button>
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
import { useState } from "react"
import { Blogs } from "./Components/Blogs"

export const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("blogs")
    
    const TabButton = ({ name, id}) => {

        return (
            <button 
            onClick={() => {
                console.log(id)
                setActiveTab(id)
            }}
            className={`
                ${activeTab == id ? "text-slate-300" : "text-slate-500"}
                px-5 py-2 font-bold h-16 w-full flex xl:justify-start items-center space-x-5
            `}>
                <span className="">
                    {name}
                </span>
            </button>
        )
    }

    const Panels = () => {
        if(activeTab == "blogs"){
            return <Blogs/>
        } else {
            return (
                <div>
                    NO READY
                </div>
            )
        }
    }

    return (
        <div className="text-white flex flex-row w-full h-screen  bg-slate-200">
            <div className="h-full w-64 flex flex-col bg-slate-800">
                <div className="flex justify-center items-center h-24 w-64 bg-blue-500">
                    <span className=" font-bold text-xl z-10">
                        BlogManager
                    </span>
                </div>
                <div className="min-w-64 ">
                    <TabButton name="Blogi" id="blogs"/>
                    <TabButton name="Posty" id="posts"/>
                    <TabButton name="Pliki" id="files"/>
                    <TabButton name="Tagi" id="tags"/>
                    <TabButton name="Komentarze" id="comments"/>
                </div>
            </div>
            <div className="h-full w-full">
                <div className="flex justify-center items-center h-24 w-full bg-blue-500">
                    PANEL NA GGORZZE
                </div>
                <div className="p-20">
                    <Panels/>

                </div>
            </div>
        </div>
    );
}


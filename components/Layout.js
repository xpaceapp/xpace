import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function Layout({ children }) {

    return (
        <>
            <div id="app" class="flex container h-screen w-full ">

                <div class="lg:w-1/5 mt-10  border-r-2 border-gray-500 lg:px-6 px-8 py-2 flex flex-col justify-between">
                    <Sidebar />
                </div>


                <div class="flex flex-col w-full ">

                    <div class="border shadow-b-md">
                        <Navbar />
                    </div>

                    <div className="mt-6 ">
                        {children}
                    </div>

                </div>
            </div>
        </>
    )
}
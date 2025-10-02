 import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useState } from "react"
import { HiMenuAlt3, HiX } from "react-icons/hi"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] mt-10">
      {/* Mobile Hamburger Button (top-right, white icon) */}
      <button
        className="absolute top-4 right-4 z-50 md:hidden p-2 rounded-md text-white bg-gray-800 hover:bg-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Sidebar */}
       <div
           className={`fixed top-[3.5rem] left-0 z-40 w-64 h-[calc(100vh-3.5rem)] bg-gray-900 text-white transform transition-transform duration-300 md:static md:translate-x-0 ${
           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          >
  <Sidebar />
</div>

      {/* Overlay for Mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className=" inset-0 z-30 bg-black sm:mt-6 md:mt-8 lg:mt-10 bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1000px] py-6 sm:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

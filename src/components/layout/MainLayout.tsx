import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-white min-h-screen'>

        <Sidebar />
        {sidebarOpen && (
          <div className='fixed inset-0 bg-black/50 z-40 lg:hidden'>
            <div className='w-64 bg-white dark:bg-slate-900 h-full p-4'>
              <Sidebar />
            </div>
          </div>
        )}

        <div className='flex-1 flex flex-col'>

          <Navbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <main className='flex-1 p-6'>
            {children}
          </main>

          <Footer />

        </div>
      </div>
    </div>
  )
}

export default MainLayout
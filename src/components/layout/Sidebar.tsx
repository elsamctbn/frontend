import {
  LayoutDashboard,
  Bus,
  Ticket,
  Users,
  Settings,
} from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className='w-64 bg-white dark:bg-slate-900 shadow-lg min-h-screen hidden lg:block'>
      <div className='p-6'>
        <h1 className='text-3xl font-bold text-blue-600'>
          Admin
        </h1>
      </div>

      <nav className='mt-10'>
        <ul className='space-y-2 px-4'>

          <li className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition'>
            <LayoutDashboard size={20} />
            Dashboard
          </li>

          <li className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition'>
            <Bus size={20} />
            Bus
          </li>

          <li className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition'>
            <Ticket size={20} />
            Booking
          </li>

          <li className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition'>
            <Users size={20} />
            Users
          </li>

          <li className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition'>
            <Settings size={20} />
            Settings
          </li>

        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
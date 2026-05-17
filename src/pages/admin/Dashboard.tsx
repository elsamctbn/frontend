import MainLayout from '../../layouts/MainLayout'

const Dashboard = () => {
  return (
    <MainLayout>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

        <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg'>
          <h2 className='text-slate-500'>Total Users</h2>

          <h1 className='text-4xl font-bold mt-2'>
            1,245
          </h1>
        </div>

        <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg'>
          <h2 className='text-slate-500'>Bookings</h2>

          <h1 className='text-4xl font-bold mt-2'>
            542
          </h1>
        </div>

        <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg'>
          <h2 className='text-slate-500'>Revenue</h2>

          <h1 className='text-4xl font-bold mt-2'>
            Rp 52JT
          </h1>
        </div>

        <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg'>
          <h2 className='text-slate-500'>Active Bus</h2>

          <h1 className='text-4xl font-bold mt-2'>
            48
          </h1>
        </div>

      </div>

    </MainLayout>
  )
}

export default Dashboard
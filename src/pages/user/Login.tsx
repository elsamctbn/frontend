import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const Login = () => {
  return (
    <div className='bg-slate-100 min-h-screen'>

      <Navbar />

      <div className='flex items-center justify-center py-20 px-6'>

        <div className='bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md'>

          <h1 className='text-4xl font-bold text-center mb-10'>
            Login
          </h1>

          <div className='space-y-5'>

            <input
              type='email'
              placeholder='Email'
              className='w-full border p-4 rounded-2xl'
            />

            <input
              type='password'
              placeholder='Password'
              className='w-full border p-4 rounded-2xl'
            />

            <button className='w-full bg-purple-700 text-white py-4 rounded-2xl font-bold hover:bg-purple-800 transition'>
              Login
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default Login
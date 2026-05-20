import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
   
    const navigate = useNavigate()

    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = () => {
        if(!email.endsWith('@gmail.com')) {
      alert(
        'Email harus menggunakan @gmail.com'
      )
      return
    }
        const user = {
            nama,
            email,
            password,
        }

        localStorage.setItem(
      'user',
      JSON.stringify(user)
    )

    alert('Daftar berhasil!')

    navigate('/login')
  }

    return (
        <div className="min-h-screen flex items-center justify-center">
         <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Register
            </h1>

            <div className="space-y-4">
                 <input
                    type="text"
                    placeholder="Nama"
                    value={nama}
                    onChange={(e) =>
                    setNama(e.target.value)
                    }
                    className="w-full border px-4 py-3 rounded-xl"
                    />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                    setEmail(e.target.value)
                    }
                    className="w-full border px-4 py-3 rounded-xl"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                    setPassword(e.target.value)
                    }
                    className="w-full border px-4 py-3 rounded-xl"
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-purple-700 text-white py-3 rounded-xl"
                >
                     Daftar
                </button>
            </div>
        </div>
    </div>
    )
}
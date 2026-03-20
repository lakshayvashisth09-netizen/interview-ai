import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (<main className="min-h-screen w-full flex items-center justify-center"><h1>Loading.......</h1></main>)
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center">
            <div className="min-w-[350px] flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm text-slate-300">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username'
                            className="rounded-xl px-4 py-3 bg-[#1e2535] border border-[#2a3348] outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm text-slate-300">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address'
                            className="rounded-xl px-4 py-3 bg-[#1e2535] border border-[#2a3348] outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm text-slate-300">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password'
                            className="rounded-xl px-4 py-3 bg-[#1e2535] border border-[#2a3348] outline-none" />
                    </div>

                    <button className='px-6 py-3 rounded-2xl bg-pink-600 text-white transition active:scale-90' >Register</button>

                </form>

                <p className="text-slate-400">Already have an account? <Link className="text-pink-500" to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register

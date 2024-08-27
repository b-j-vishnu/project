import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../provider/AuthProvider'
import { useState } from 'react'

const AdminLogin = () => {
    const { setToken } = useAuth()
    const navigate = useNavigate()

    const [adminLoginDetails,setAdminLoginDetails]= useState({
        email:'',
        password:''
    })
    const handleChange = (e) => {   
        const {name,value} = e.target
        setAdminLoginDetails((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const login = async() => {
            try{
                const data = await axios.post('http://localhost:4500/adminLogin',adminLoginDetails,{withCredentials:true})
                setToken(data.data.accessToken)               
                if(data.data.accessToken){
                    navigate('/')
                }
            }
            catch(err){
                if(err?.response) toast.error(err.response.data.message)
            }
          
        }
        login()
    }    

  return (
    <div className='w-full flex h-[100vh] justify-center items-center   '>
        <form onChange={handleChange} onSubmit={handleSubmit} className='flex  flex-col w-1/5 p-10 bg-gray-200 rounded items-start'>
        <h3 className='text-center w-full text-2xl '>Login</h3>
            <label className='mt-5'>Email</label>
            <input 
                type='email'
                name="email"
                className='border-2 mt-2 border-gray-900 w-full rounded px-2 py-1'
            />
            <label className='mt-2'>Password</label>
            <input 
                type='pasword'
                name='password'
                className='border-2 mt-2 border-gray-900 w-full rounded px-2 py-1'

            />
            <div className='w-full flex justify-end mt-2'>
                <button className='mt-2 px-2 py-1 bg-green-600 disabled:bg-gray-800 disabled:opacity-35 text-white rounded' disabled={adminLoginDetails.email && adminLoginDetails.password != '' ? false : true} type='submit'>Login</button>
            </div>
            <div>
                <p>Dont have an account?</p>
                <Link  to='/adminsignup' className='underline text-lg'>Sign Up</Link>
            </div>
        </form>
    </div>
  )
}

export default AdminLogin
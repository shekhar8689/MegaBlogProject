import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { data } from 'autoprefixer'
import { Children } from 'react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <p>hi</p>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                have any account
                <Link
                    to="/signup"
                    className=' font-medium transition-all duration-200 hover:underline '
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            {/* form section start from this line  */}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label = "Email:"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPatern:(value)=>/[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input 
                    label = "password:"
                    placeholder="Enter your password"
                    type = "password"
                    {...register("password",{
                        required:true,
                    })}
                    />
                    <Button 
                    type="submit"
                    className="w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>


        </div>
    )
}

export default Login
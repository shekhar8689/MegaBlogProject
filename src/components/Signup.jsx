import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { regester, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl 
            p-10 border border-black/10`}>

            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                have any account
                <Link
                    to="/signup"
                    className=' font-medium transition-all duration-200 hover:underline '
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...regester("name", {
                            require: true,
                        })}
                    />
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                    label="password"
                    placeholder="Enter your password"
                    type="password"
                    {...regester("password",{
                        require:true
                    })}
                    />
                    <Button
                    type = "submit"
                    className = "w-full"
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Signup
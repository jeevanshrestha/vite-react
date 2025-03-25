import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../../store/authSlice'
import {Buttons, Input, Logo} from './index'
import authService from '../../services/appwrite/auth'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState('')

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch(error) {
            setError(
                error?.response?.message || 
                error?.message || 
                'Login failed. Please try again.'
            )
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className='space-y-5'>
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            error={errors.password?.message}
                        />
                    </div>
                    <div className='mt-5'>
                        <Buttons type="submit" className="w-full">
                            Sign In
                        </Buttons>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
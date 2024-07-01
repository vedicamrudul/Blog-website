import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.js'
import Button from './Button.jsx'
import Input from './Input.jsx'
import { useForm } from 'react-hook-form'

function LoginComp() {
    const navigate = useNavigate();
    console.log("login component called main function")
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    // register is a function from react-hook-form that registers an input element to the form state
    // handleSubmit is a function from react-hook-form that handles form submission
    const [error, setError] = useState("");

    // this login is the login we call when we submit the form
    // it is an async function because we are making an api call to login the user  (i think cuz the methods being called are async thats why this is async too)
    const login = async (data) => {
        console.log("login function called in login component")
        console.log(data)
        setError("");
        try {
            const session = await authService.loginAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser   ();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log Into Your Account
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)}    className='mt-8'>
                    {/* // handleSubmit is a function from react-hook-form that handles form submission */}
                 
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                                // regex for email validation. No one remembers this regex. Just google it. (gpt or there was some regex website that had all the regexes. I forgot the name.)
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            btnText='Login'
                        ></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComp
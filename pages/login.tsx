import React from 'react'
import Link from 'next/link'

const Login = () => {
    return (
        <div className="mt-14 w-auto max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800">
            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Login</h2>

                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                <form>
                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                    </div>

                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                    </div>

                    <button className="mt-4 w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Login</button>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Don&apos;t have an account? </span>
                <Link href={"/signup"}><a className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a></Link>
            </div>
        </div>
    )
}

export default Login
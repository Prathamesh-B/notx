import { useState, FC } from 'react'
import Router from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import { Burger } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FaSignOutAlt } from "react-icons/fa";

interface PropsT {
    token: any,
}

const Navbar: FC<PropsT> = ({ token }) => {
    const [opened, setOpened] = useState(false);
    const closeNav = () => setOpened(!opened)
    const handleLogout = () => {
        localStorage.removeItem('token')
        Router.push('/login')
    }
    return (
        <header className="p-4">
            <div className="flex justify-between h-16 mx-auto">
                <Link href={"/"}>
                    <a className="flex items-center p-4">
                        <Image src="/notes.svg" width={25} height={25} alt="Logo Img"></Image>
                    </a>
                </Link>
                <div className="items-center flex-shrink-0 hidden md:flex">
                    {!token.value && <>
                        <Link href={"/login"} passHref><button className="self-center m-1 px-3 py-2 hover:bg-gray-50 rounded">Log in</button></Link>
                        <Link href={"/signup"} passHref><button className="self-center m-1 px-3 py-2 hover:bg-gray-50 rounded">Sign up</button></Link>
                    </>}
                    {token.value && <>
                        <Link href={"/createNote"} passHref><button className="bg-gray-200 self-center m-1 px-3 py-2 hover:bg-gray-300 rounded">Create Note</button></Link>
                        <Link href={"/allNotes"} passHref><button className="bg-gray-200 self-center m-1 px-3 py-2 hover:bg-gray-300 rounded">All Notes</button></Link>
                        <Link href={"/login"} passHref>
                            <button onClick={() => {
                                closeNav(); handleLogout(); showNotification({
                                    id: 'logout',
                                    autoClose: true,
                                    color: 'indigo',
                                    icon: <FaSignOutAlt />,
                                    title: "Logging out",
                                    message: 'Logged out Successfully',
                                })
                            }} className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto">Logout</button>
                        </Link></>}
                </div>
                <div className="p-4 md:hidden">
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((opened) => !opened)}

                    />
                </div>
            </div>
            {opened && <div className='z-50 md:hidden bg-white w-screen h-auto absolute left-0 top-20 shadow-md p-4 items-center'>
                {!token.value &&
                    <>
                        <Link href={"/login"} passHref><button className="flex flex-col p-2 hover:bg-gray-50 rounded m-auto" onClick={closeNav}>Log in</button></Link>
                        <Link href={"/signup"} passHref><button className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto" onClick={closeNav}>Sign up</button></Link>
                    </>}
                {token.value && <>
                    <Link href={"/createNote"} passHref><button onClick={closeNav} className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto">Create Note</button></Link>
                    <Link href={"/allNotes"} passHref><button onClick={closeNav} className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto">All Notes</button></Link>
                    <button onClick={() => {
                        closeNav(); handleLogout(); showNotification({
                            id: 'logout',
                            autoClose: true,
                            color: 'indigo',
                            icon: <FaSignOutAlt />,
                            title: "Logging out",
                            message: 'Logged out Successfully',
                        });
                    }} className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto">Logout</button>
                </>}
            </div>}
        </header>
    )
}

export default Navbar
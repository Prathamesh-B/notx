import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Burger } from '@mantine/core';

const Navbar = () => {
    const [opened, setOpened] = useState(false);
    return (

        <header className="p-4">
            <div className="flex justify-between h-16 mx-auto">
                <Link href={"/"}>
                    <a className="flex items-center p-4">
                        <Image src="/notes.svg" width={25} height={25} alt="Logo Img"></Image>
                    </a>
                </Link>
                <div className="items-center flex-shrink-0 hidden md:flex">
                    <Link href={"/login"} passHref><button className="self-center px-4 py-3 hover:bg-gray-50 rounded">Log in</button></Link>
                    <Link href={"/signup"} passHref><button className="self-center px-4 py-3 hover:bg-gray-50 rounded">Sign up</button></Link>
                </div>
                <div className="p-4 md:hidden">
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                    />
                </div>
            </div>
            {opened && <div className='md:hidden bg-white w-screen h-auto absolute left-0 top-20 shadow-md p-4 items-center'>
                <Link href={"/login"} passHref><button className="flex flex-col p-2 hover:bg-gray-50 rounded m-auto">Log in</button></Link>
                <Link href={"/signup"} passHref><button className="flex flex-col hover:bg-gray-50 rounded p-2 m-auto">Sign up</button></Link>
            </div>}
        </header>
    )
}

export default Navbar
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main className="font-mono bg-white mt-36">
      <h2 className="p-4 text-5xl md:text-6xl font-bold text-gray-800 text-center">
        Note Taking Website!
      </h2>
      <h1 className="p-2 text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Create, Update, and Delete notes with all Authentication features
      </h1>
      <div className="flex  justify-center mt-4">
        <Link href={'/createNote'}><a className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800  hover:bg-gray-800 hover:text-white text-md">
          Create Note
        </a></Link>
      </div>
    </main>
  )
}

export default Home

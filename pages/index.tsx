import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="font-mono bg-white mt-48">
      <h2 className="p-4 text-5xl md:text-6xl font-bold text-gray-800 text-center">
        Best Note Taking Website!
      </h2>
      <div className="flex  justify-center mt-4">
        <a href="#" className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800  hover:bg-gray-800 hover:text-white text-md">
          Start Now
        </a>
      </div>
    </main>
  )
}

export default Home

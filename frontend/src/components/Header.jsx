import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
function Header() {
  return (
   <header className="bg-stone-900 shadow-md">
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

    <Link to='/'>
       <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className=" text-stone-400">Find</span>
        <span className="text-stone-50">MyPG</span>
       </h1>
       </Link>

       <form className="bg-stone-100 p-3 rounded-lg flex items-center">
        <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-24 sm:w-64"
        />
        <FaSearch className='text-stone-500'/>
       </form>
 
      <ul className='flex gap-4 '>
        <Link to="/">
        <li className='hidden sm:inline text-stone-200  hover:underline'>Home</li>
        </Link>
       
       <Link to="/about">
       <li className='hidden sm:inline text-stone-200  hover:underline'>About</li>
       </Link>
        
        <Link to="/signIn">
        <li className=' text-stone-200  hover:underline'>Sign In</li>
        </Link>

      </ul>
    </div>
    </header>
  
  )
}

export default Header

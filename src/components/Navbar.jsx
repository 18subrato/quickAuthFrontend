import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import toast from 'react-hot-toast';
import logo from '../assets/logo.png'

const Navbar = () => {
  const { user, setUser, navigate, axios,backend, setIsLoggedIn } = useContext(AppContext);

  async function logout(){
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backend+'/api/auth/logout');
      if(data.success){
        setUser(false);
        setIsLoggedIn(false);
        navigate('/');
        toast.success(data.message)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const { themeMode, toggleMode } = useContext(AppContext)
  return (
    <div className='flex justify-between px-2 lg:px-10 bg-gradient-to-l from-blue-300 via-blue-200  h-20 md:h-24  items-center border-b  '>
      <img onClick={()=>navigate('/')} className='w-36 h-20 md:w-50 lg:w-60 p-2 cursor-pointer' src={logo} />
      <div className='flex items-center gap-4 md:gap-10'>
        <div>
          { themeMode === 'light' ? <MdOutlineLightMode onClick={toggleMode} className='w-6 md:w-7 md:h-7 h-6 cursor-pointer' /> : <MdDarkMode onClick={toggleMode} className='w-6 h-6 md:w-7 md:h-7 cursor-pointer'/>}
        </div>
        {user ? (<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          S
          <div className='absolute hidden group-hover:block top-0 right-0 text-black pt-20'>
              <li onClick={logout} className='list-none cursor-pointer hover:bg-gray-300 bg-white p-3 rounded-2xl'>Logout</li>
          </div>
        </div>):( <button onClick={() => navigate('/login')} className=' border border-white px-6 md:px-10 py-2 md:py-3 rounded-full hover:bg-blue-500 bg-gradient-to-bl from-blue-900 via-blue-300 cursor-pointer font-bold text-gray-900'>Login</button>)}
      </div>
    </div>
  )
}

export default Navbar




import React, { useContext } from 'react'
import banner from '../assets/banner.svg'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 2,
      ease: 'easeOut',
    },
  }),
};

const hoverEffect = {
  scale: 1.1,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
};

const Home = () => {
  const { themeMode, navigate, user, axios, backend } = useContext(AppContext)

  async function sendVerificationOtp() {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backend + '/api/auth/send-verify-otp');
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const bgColor = themeMode === 'light' ? 'bg-gradient-to-bl from-blue-500 via-gray-300' : 'bg-gray-600 text-white';
  return (
    <div style={{transition: 'all 0.3s ease'}} className={`min-h-screen ${bgColor}  flex justify-center`}>
      <div className='flex flex-col md:flex-row md:justify-between gap-12 md:gap-30 mt-36'>
        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }} className='ml-10 md:ml-20 lg:ml-24'>
          <motion.h1 initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }} className='text-2xl md:text-3xl  lg:text-4xl xl:text-5xl font-semibold'>Hey <span className='text-blue-500'>Welcome</span> <span className=' text-red-500 font-light'>{user?.name || 'Buddy'}</span></motion.h1>
          <div className='mt-10 lg:mt-20'>
            <h1 className='text-3xl md:text-3xl lg:text-4xl xl:text-6xl'><span className='text-blue-500'>A</span>uthenticate. <span className='text-blue-500'>A</span>uthorize</h1>
            <motion.h1
              initial={{ x: -100 }}
              animate={{ x: 2 }}
              transition={{ duration: 3 }}
              className='text-2xl md:text-3xl mt-3 lg:mt-6 lg:text-4xl xl:text-6xl'><span className='text-blue-500'>P</span>rotect</motion.h1>
          </div>
          <div className='flex items-center mt-10 xl:mt-16 gap-6 md:gap-8 xl:gap-12'>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={0}
              whileHover={hoverEffect}
            >
              <a href="https://github.com/18subrato" target="_blank" rel="noopener noreferrer">
                <FaGithub className='w-8 h-8 lg:w-10 lg:h-10 cursor-pointer' />
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={0.2}
              whileHover={hoverEffect}
            >
              <a href="https://www.linkedin.com/in/subrato-kumar-verma-03382a25b/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className='w-8 h-8 lg:w-10 lg:h-10 cursor-pointer text-blue-500' />
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={0.4}
              whileHover={hoverEffect}
            >
              <a href="https://www.instagram.com/subrato_verma" target="_blank" rel="noopener noreferrer">
                <FaInstagram className='w-8 h-8 lg:w-10 lg:h-10 cursor-pointer text-[#E1306C]' />
              </a>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={0.4}
              whileHover={hoverEffect}
            >
              <a href="https://subratoverma.vercel.app" target="_blank" rel="noopener noreferrer">
                <IoEarthSharp className='w-8 h-8 lg:w-10 lg:h-10 cursor-pointer' />
              </a>
            </motion.div>
          </div>
          <div className='mt-16'>
            {!user.isAccountVerified ? <button onClick={sendVerificationOtp} className=' px-6 py-2 lg:px-20 lg:py-4 border border-gray-700 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-600 via-blue-200 text-lg text-gray-800 hover:bg-blue-500 font-bold'>Verify Email</button> : <motion.div>
              <motion.h1
                initial={{ x: -100 }}
                animate={{ x: 2 }}
                transition={{ duration: 3 }}
                className='text-green-500 text-2xl lg:text-3xl xl:text-4xl font-semibold'>Congratulations</motion.h1>
              <p className='text-gray-900 text-lg lg:text-xl xl:text-2xl mt-2'>Your Account is now Verified.</p>
            </motion.div>}
          </div>
        </motion.div>
        <div>
          <img className=' h-[300px] md:h-[500px]' src={banner} alt='home_banner' />
        </div>
      </div>
    </div>
  )
}

export default Home

import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Login = () => {

  const { themeMode, setIsLoggedIn, axios, navigate, getUserData } = useContext(AppContext)

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const backend = import.meta.env.VITE_BACKEND_URL
  async function handleFormSubmit(e) {
    try {
      e.preventDefault();
      axios.default.withCredentials = true;

      if(state === 'register'){
        const { data } = await axios.post(backend + '/api/auth/register',{
          name,
          email,
          password
        })

        if(data.success){
          setIsLoggedIn(true)
          getUserData();
          toast.success(data.message);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backend + '/api/auth/login',{
          email,
          password,
        })

        if(data.success){
          setIsLoggedIn(true);
          getUserData();
          toast.success(data.message);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.message);
    }
    
  }

  const bgColor = themeMode === 'light' ? 'bg-gradient-to-bl from-blue-400 via-gray-300' : 'bg-gray-600 bg-gray-600';

  return (
    <div className={`${bgColor} min-h-screen flex items-center`}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-blue-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="enter your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500" type="text" required />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500" type="email" required />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500" type="password" required />
        </div>
        { state === 'login' ? <p>Forget password? <span onClick={()=>navigate('/reset-password')} className='text-blue-500 cursor-pointer'>click here</span></p> : '' }
        <button className=" bg-gradient-to-br from-blue-600 via-blue-200 text-lg text-gray-800 hover:bg-blue-500 font-bold transition-all w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
        {state === "register" ? (
          <p>
            Already have account? <span onClick={() => setState("login")} className="text-blue-500 cursor-pointer">click here</span>
          </p>
        ) : (
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-blue-500 cursor-pointer">click here</span>
          </p>
        )}
      </form>

    </div>
  )
}

export default Login

import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
// Main App component
const EmailVerify = () => {

  const { themeMode, axios, navigate, backend, getUserData } = useContext(AppContext)

  const [otp, setOtp] = useState(new Array(6).fill('')); // State to hold the 6 OTP digits
  const inputRefs = useRef([]); // Ref array to manage focus on input fields

  // Effect to set initial focus on the first input field when the component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handler for input changes in the OTP fields
  const handleChange = (element, index) => {
    // Only allow numeric input
    if (isNaN(element.value)) return false;

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus to the next input field if a digit is entered and it's not the last field
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for key down events (e.g., backspace to move focus backward)
  const handleKeyDown = (element, index) => {
    // If backspace is pressed and the current field is empty, move focus to the previous field
    if (element.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handler for pasting OTP values
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim(); // Get pasted text and remove whitespace
    const digits = pasteData.replace(/\D/g, '').slice(0, 6); // Extract only digits and limit to 6

    // Update OTP state with pasted digits
    const newOtp = new Array(6).fill('');
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);


    // Focus on the last filled or next available input field after paste
    const lastFilledIndex = digits.length > 0 ? digits.length - 1 : 0;
    if (inputRefs.current[lastFilledIndex + 1]) {
      inputRefs.current[lastFilledIndex + 1].focus();
    } else {
      inputRefs.current[lastFilledIndex].focus();
    }
  };


  async function sendVerificationOtp(){
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backend + '/api/auth/send-verify-otp');
      if(data.success){
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  }


  // Handler for OTP submission
  async function handleSubmit(e){
    try {
      axios.defaults.withCredentials = true;
      e.preventDefault();
      const OTP = otp.join('');
      if(OTP <6){
        return toast.error('OTP must be 6 digits');
      }

      const { data } = await axios.post(backend + '/api/auth/verify-account',{
        OTP
      })

      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const bgColor = themeMode === 'light' ? 'bg-gradient-to-bl from-blue-400 via-gray-300' : 'bg-gray-600 bg-gray-600';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}  p-4`}>
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6"><span className='text-blue-500'>Enter</span> OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1" // Limit input to one character
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index)}
                onFocus={(e) => e.target.select()} // Select current digit on focus
                onPaste={handlePaste} // Handle paste event
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-2xl font-semibold
                           rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500
                           focus:outline-none transition duration-200 ease-in-out
                           bg-gray-50 text-gray-900 shadow-sm"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-br from-blue-600 via-blue-200 
                        text-lg font-bold shadow-lg hover:from-blue-600 hover:to-blue-700
                       disabled:opacity-50 cursor-pointer"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Didn't receive the code? <span onClick={sendVerificationOtp} className='text-blue-600 cursor-pointer'>Resend</span>
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;

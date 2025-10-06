import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {registerSrv} from '../services/authService';

function RegisterPage(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const data = await registerSrv(username, password);
        setSuccess(data.message || 'Registration successful! Redirecting to login...');
     
        setTimeout(() => {
          navigate('/login');
        }, 2000);
    } catch (err) {
       setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

return(
  <div>
    <div className="h-dvh flex items-center justify-center">
      <div className='mx-6 md:mx-24 px-6 md:px-12 py-4 md:py-6 rounded-xl border border-slate-700 bg-[#0F172A99]/60 w-full  xl:w-1/3'>
        <div className='text-center font-orbitron font-bold text-3xl' >Sign Up</div>
        
        <form onSubmit={handleSubmit}>
          <div className='my-8 flex flex-col gap-4'>

            <div>Username</div>

            <input 
              className='border border-slate-700 rounded-xl py-1.5 px-3 w-full'
              type='text' 
              placeholder="e.g., johndoe" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              disabled={isLoading}
              required
              />

            <div>Password</div>

            <input 
              className='border border-slate-700 rounded-xl py-1.5 px-3 w-full'
              type='password'
              placeholder="e.g., johndoepassword" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading} 
              required 
              />
          </div>

          {error && <p className="text-red-500 p-3  text-center">{error}</p>}
          {success && <p className="text-green-500  p-3  text-center">{success}</p>}

          <button 
            className='text-center bg-[#0EA5E9] py-3 w-full rounded-xl hover:bg-[#0B8AC4] transition-colors' 
            type='submit'
            disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <div className='text-center my-8'>Already have an account ?
          <Link to='/login' className='text-cyan-500 cursor-pointer hover:underline'> Sign In</Link> 
        </div>

      </div>
   
    </div>
  </div>
)
}

export default RegisterPage;
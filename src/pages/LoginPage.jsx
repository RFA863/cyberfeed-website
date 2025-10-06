import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-dvh flex items-center justify-center">
      <div className='mx-6 md:mx-24 px-6 md:px-12 py-4 md:py-6 rounded-xl border border-slate-700 bg-[#0F172A99]/60 w-full  xl:w-1/3'>
        <div className='text-center font-orbitron font-bold text-3xl' >Sign In</div>
        
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
              />

            <div>Password</div>

            <input 
              className='border border-slate-700 rounded-xl py-1.5 px-3 w-full'
              type='password'
              placeholder="e.g., johndoepassword" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}  
              />
          </div>

          {error && <p className="text-red-500 p-3  text-center">{error}</p>}

          <button 
            className='text-center bg-[#0EA5E9] py-3 w-full rounded-xl hover:bg-[#0B8AC4] transition-colors' 
            type='submit'
            disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div className='text-center my-8'>Don't have any account ?
          <Link to='/register' className='text-cyan-500 cursor-pointer hover:underline'> Sign Up</Link> 
        </div>

      </div>
   
    </div>
  );
}
export default LoginPage;
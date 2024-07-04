import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {toast} from 'react-toastify';

function SignUp() {

  const [formData , setFormData] = useState({});
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id] : e.target.value,
        })
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     try{
      setLoading(true);
      const res = await fetch('/api/auth/signup' , 
       {
         method:'POST',
         headers:{
           'Content-Type' : 'application/json'
         },
         body:JSON.stringify(formData),
       });
     const data = await res.json();
     console.log(data);
     if(data.success === false){
       setError(data.message);
       setLoading(false);
       toast.error("something went wrong");
       return;
     }
     setLoading(false);
     setError(null);
     toast.success("User successfully sign up !! ");
     navigate('/signin')
      
     }catch(error){
         setLoading(false);
         setError(error.message);
         toast.error("something went wrong");
     }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-bold my-7 ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input 
        type="text"
        placeholder="Username"
        className="border p-3 rounded-lg"
        id="username"
        onChange={handleChange}
        />
         <input 
        type="email"
        placeholder="Email"
        className="border p-3 rounded-lg"
        id="email"
        onChange={handleChange}
        />
         <input 
        type="password"
        placeholder="Password"
        className="border p-3 rounded-lg"
        id="password"
        onChange={handleChange}
        />
       <button 
       disabled={loading}
       className="bg-slate-700 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70">
        {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Have an Account ? </p>
        <Link to='/signin'>
           <span className='text-blue-700 font-semibold 
           hover:underline '>Sign In</span>
        </Link>
      </div> 
 {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default SignUp

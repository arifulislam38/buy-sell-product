import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { AuthContext } from '../../AuthContext/AuthProvider';
import UseTitle from '../../Hooks/Title/Title';
import * as animationData from './login.json';


const Login = () => {

    UseTitle('Login');
    const {signIn, googleLogin, setLoading} = useContext(AuthContext);
    

    
    

    

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signIn(email,password)
        .then(result =>{
            const user = result.user;
            const currentUser = {
                    email: user.email
                };
            fetch(`${process.env.REACT_APP_API}/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                .then(res=> res.json())
                .then(data => {
                    if(data.success){
                            localStorage.setItem('accessToken', data.token);
                            
                            toast.success('successfully login');
                            navigate(from, { replace: true });
                            setLoading(false);
                            event.target.reset();
                        }else{
                            toast.error('Cannot log in user')
                        }
                })    
         })
            .catch(error => console.error(error));
           
        };

    const googlesignin = () =>{
        googleLogin()
        .then(result =>{
            const user = result.user;
            const currentUser = {
                    email: user.email
                };
            fetch(`${process.env.REACT_APP_API}/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                .then(res=> res.json())
                .then(data => {
                    if(data.success){
                            localStorage.setItem('accessToken', data.token);
                            
                            toast.success('successfully login');
                            navigate(from, { replace: true });
                            setLoading(false);
                        }else{
                            toast.error('Cannot log in user')
                        }
                })    
         })
            .catch(error => console.error(error));
           
        };


    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
    };


    return (
        <div >
            <h1 className='text-7xl font-bold font-serif text-center  mb-32 pt-24 overflow-hidden'>Welcome to the Login page</h1>
            <div className='grid lg:grid-cols-2 gap-8 p-8 items-center justify-center lg:w-[85%] mx-auto'>
                <div className='sm:mb-5'>
                    <Lottie options={defaultOptions}></Lottie>
                </div>
                <div className='sm:w-full sm:p-8'>
                    <form onSubmit={handleSubmit} className='sm:w-full flex flex-col gap-5'>
                        
                        <input className='lg:w-[80%] w-full mx-auto p-4 bg-transparent border rounded text-black' type="email" name='email' placeholder='Your Email' />

                        <input className='lg:w-[80%] w-full mx-auto p-4 bg-transparent border rounded text-black' type="password" name='password' placeholder='Password' />

                        <button type="submit" className='lg:w-[80%] w-full mx-auto text-xl text-black font-serif font-bold p-4 border rounded'>Log In</button>

                        <button onClick={googlesignin} className='lg:w-[80%] w-full mx-auto text-xl text-black font-serif font-bold p-4 border rounded'>Log In with Google</button>

                        <p className='text-xl font-serif lg:w-[80%] w-full mx-auto'>New to this site? <Link to='/register' className='text-black underline'>Create an account</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
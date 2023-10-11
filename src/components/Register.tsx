import { useState } from 'react';
import supabase from '@/config/supabaseClient';
import Link from 'next/link';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event: any) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
      
        if (!formData.email) return alert('Please fill in an email address');
        if (!formData.password) return alert('Please fill in a password');
      
        try {
          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
          });
      
          if (error) {
            alert(`Error: ${error.message}`);
          } else if (data && data.user) {
            alert(`Verification link has been sent to ${data.user.email}. Please confirm your registration.`);
          }
        } catch (error) {
          alert(`Error: ${error}`);
        }
      }

    return (
        <div className='flex flex-col justify-center w-full items-center mt-2'>
            <h1 className='font-bold text-3xl self-start'>Register account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col p-5 w-2/4'>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} className='bg-gray-200 ease-in-out duration-200 p-2 m-2 hover:border-[#098C4C] active:border-[#098C4C] border-2 rounded-lg' />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} className='bg-gray-200 ease-in-out duration-200 p-2 m-2 hover:border-[#098C4C] active:border-[#098C4C] border-2 rounded-lg' />
                <button type="submit" className='bg-[#098C4C] hover:bg-[#47ad7c] ease-in-out duration-200 p-2 m-2 rounded-sm text-gray-200'>Register</button>
            </form>
            <p>Already have an account? <Link href='/login' className='text-[#098C4C] hover:underline'>Login</Link></p>
        </div>
    );
}
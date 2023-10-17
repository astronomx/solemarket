"use client"
import react, { useState } from 'react';
import supabase from '@/config/supabaseClient';

export default function ResetPasswordPage() {
    async function handleSubmit(event:any) {
        event.preventDefault();
        if (!formData.email) return alert('Please fill in an email adress.');

        await supabase.auth.resetPasswordForEmail(formData.email, {
            redirectTo: `${window.location.origin}/update-password`,
        })
        alert(`Password reset link sent to ${formData.email}`)
    }
    const [formData, setFormData] = useState({
        email: ''
    });

    function handleChange(event: any) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }


    return (
        <div className='flex flex-col justify-center w-full items-center mt-2'>
            <form onSubmit={handleSubmit} className='flex flex-col p-5 w-1/4'>
                <h1 className='font-bold text-3xl self-start m-2'>Reset password</h1>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} className='bg-gray-200 ease-in-out duration-200 p-2 m-2 hover:border-[#098C4C] active:border-[#098C4C] border-2 rounded-lg' />
                <button type="submit" className='bg-[#098C4C] hover:bg-[#47ad7c] ease-in-out duration-200 p-2 m-2 rounded-sm text-gray-200'>Send reset link</button>
            </form>
        </div>
    )
}
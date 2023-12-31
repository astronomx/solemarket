import { useEffect, useState } from 'react';
import supabase from '@/config/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginProps {
    setToken: (token: any) => void;
}
export default function Login({ setToken }: LoginProps) {
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

        if (!formData.email) return alert('Please fill in an email adress');
        if (!formData.password) return alert('Please fill in a password');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })
            if (data.user != null) {
                setToken(data)
            } else {
                return alert('Wrong email or password')
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
        window.location.reload();
    }
    const router = useRouter();
    useEffect(() => {
        const session = sessionStorage.getItem('token');
        if (session) {
            console.log('Redirecting to home page...');
            router.push('/');
        }
    });

    return (
        <div className='flex flex-col justify-center w-full items-center mt-2'>
            <form onSubmit={handleSubmit} className='flex flex-col p-5 w-2/4'>
            <h1 className='font-bold text-3xl self-start m-2'>Login</h1>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} className='bg-gray-200 ease-in-out duration-200 p-2 m-2 hover:border-[#098C4C] active:border-[#098C4C] border-2 rounded-lg' required />
                <input type="password" minLength={8} placeholder="Password" name="password" onChange={handleChange} className='bg-gray-200 ease-in-out duration-200 p-2 m-2 hover:border-[#098C4C] active:border-[#098C4C] border-2 rounded-lg' required />
                <Link href="/reset-password" className="text-sm p-2 text-[#098C4C] ease-in-out duration-200 hover:underline">Forgot password?</Link>
                <button type="submit" className='bg-[#098C4C] hover:bg-[#47ad7c] ease-in-out duration-200 p-2 m-2 rounded-sm text-gray-200'>Login</button>
            </form>
            <p>Dont have an account? <Link href='/register' className='text-[#098C4C] hover:underline'>Register</Link></p>
        </div>
    );
}
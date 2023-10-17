"use client"
import Login from '@/components/Login'
import { useState, useEffect } from 'react'

export default function LoginPage() {    
  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let sessionToken = sessionStorage.getItem('token')
      if (sessionToken) {
        let data = JSON.parse(sessionToken)
        setToken(data)
      }
    }
  }, [])

    return(
        <>
            <Login setToken={setToken} />
        </>
    )
}
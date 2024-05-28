import Link from 'next/link'
import React from 'react'


export default function LoginSignup() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <Link className='border p-4 rounded-md bg-white text-black font-semibold hover:bg-neutral-300' href='/hem'>Logga in </Link>
    </div>
  )
}

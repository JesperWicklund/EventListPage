import React from 'react'
import Header from '../components/header'
import { UserButton } from '@clerk/nextjs'

function layout({children}) {
  return (
    <div>
        <Header></Header>
        <UserButton></UserButton> 
        {children}</div>
  )
}

export default layout
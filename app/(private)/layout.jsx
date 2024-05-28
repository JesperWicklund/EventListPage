import React from 'react'
import Header from '../components/header'

function layout({children}) {
  return (
    <div>
        <Header></Header>
        {children}</div>
  )
}

export default layout
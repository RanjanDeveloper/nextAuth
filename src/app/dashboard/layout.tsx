import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
type Props = {
    children :React.ReactNode
}

export default function layout({children}: Props) {
  return (
   <div className='flex'>
    <Sidebar />
    <main className="w-full h-full p-5">{children}</main>
   </div>
  )
}
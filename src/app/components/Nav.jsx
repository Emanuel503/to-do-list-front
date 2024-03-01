import React from 'react'
import { Avatar } from "@nextui-org/react";

export default function Nav() {
  return (
    <nav className="bg-emerald-700 w-full h-14 flex items-center px-4 justify-between mb-12">
        <h1 className="text-2xl text-white font-semibold">To Do App</h1>
        <div className='flex items-center'>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
            <h4 className='ml-3'>Nombre del usuario</h4>
        </div>
    </nav>
  )
}

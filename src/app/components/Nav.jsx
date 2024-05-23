'use client'

import React, { useState, useEffect } from 'react'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from 'next/navigation'

export default function Nav() {  

  const router = useRouter()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUserFromCookie = async () => {
      const userCookie = await Cookies.get('user');
      if (userCookie) {
        setUser(JSON.parse(userCookie));
      }
    };

    getUserFromCookie();
  }, []);

  const handdleLogout = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`, // Agrega el token al encabezado
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, options)
    .then(response => response.json())
    .then(data => {
      if (!data.ok) {
        if(data.code == 200){
          Cookies.remove('user');
          Cookies.remove('token');
          router.push('/login')
        }else{
          console.error('Error al enviar la petición:', error);
        }
      }
    })
    .catch(error => {
      console.error('Error al enviar la petición:', error);
    });
  }

  return (
    <Navbar className='bg-emerald-700 mb-12'>
      <NavbarBrand>
        <h1 className="text-2xl text-white font-semibold">Tasks App</h1>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                endContent={<IoIosArrowDown/>}
                variant="light"
              >
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
                {user?.name}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="profile"
              href='profile'
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="logout"
              onClick={() => handdleLogout()}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}

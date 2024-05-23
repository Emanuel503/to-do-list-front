'use client'

import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import {Button, Input, Spinner} from "@nextui-org/react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter()

  const [login, setLogin] = useState(null)

  const [loading, setLoading] = useState(null)

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    setLoading(true)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, options)
    .then(response => response.json())
    .then(data => {
      if (!data.ok) {
        if(data.code == 401){
          setLogin(false)
        }else{
          setLogin(true)
          Cookies.set('token', data.data.access_token);
          Cookies.set('user', JSON.stringify(data.data.user));
          router.push('/')
        }
      }
    })
    .catch(error => {
      console.error('Error al enviar la petición:', error);
      setLogin(false)
      setLoading(false)
    });
  }
  return (
    <main className='w-full h-screen flex items-center justify-center'>

      <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-700 p-10 w-11/12 md:w-1/2 xl:md:w-1/3 h-3/4 rounded-2xl relative flex flex-col items-center shadow-2xl'>  

        <div className='absolute -top-10 bg-emerald-700 rounded-full p-5'>
          <FaUser className='text-7xl'/>
        </div>

        <h2 className='mt-16 mb-10 text-5xl font-bold text-center'>Inicio de Sesion</h2>

        <div className='h-full w-full flex flex-col items-center justify-center'>
          <Input 
            className='mb-10' 
            size='lg' 
            isRequired 
            type="email" 
            label="Email" 
            name="email" 
            placeholder="Escribe tu email" 
            {...register("email", {required: true})}
          />

          <Input 
            className='mb-10' 
            size='lg' 
            isRequired 
            label="Contraseña" 
            placeholder="Escribe tu contraseña"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <FaEye  className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            name='password'
            {...register("password", {required: true})}
          />

          <Button type='submit' size='lg' className='bg-emerald-600 font-bold text-white mb-5' isDisabled={loading ? true : false} >
            Iniciar Sesion
            {
              loading == true &&
              <Spinner size="sm" color="default" />
            }
          </Button>

          {login == false && <p className='text-red-500 text-sm'>Correo o contraseña es incorrecta</p>}

          <p className='mt-20'>
            ¿No tienes cuenta aun?
          </p>
          <Link className='underline text-blue-400' href="register">Registrarse</Link>
        </div>
      </form>
    </main>
  )
}
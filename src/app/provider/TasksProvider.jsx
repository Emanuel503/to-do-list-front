'use client'

import { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';

const tasksContext = createContext();

export function useTaskContext(){
  return useContext(tasksContext)
}

export default function TasksProvider({children}) {

  let token = Cookies.get('token')

  const [taks, setTaks] = useState([])
  
  const [categories, setCategories] = useState([])

  const [load, setLoad] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token al encabezado
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
    ]).then(([tasksJson, categoriesJson]) => {
      setTaks(tasksJson.data.tasks);
      setCategories(categoriesJson.data.categories);
      setLoad(false);
    }).catch(error => {
      console.error('Error en fetch:', error);
    });
  }, [token])

  return (
    <tasksContext.Provider value={{categories, taks, load}}>
        {children}
    </tasksContext.Provider>
  )
}
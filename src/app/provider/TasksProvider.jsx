'use client'

import { createContext, useContext, useEffect, useState } from "react"

const tasksContext = createContext();

export function useTaskContext(){
  return useContext(tasksContext)
}

export default function TasksProvider({children}) {

  const [taks, setTaks] = useState([])
  
  const [categories, setCategories] = useState([])

  const [load, setLoad] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/tasks').then(response => response.json()),
      fetch('http://127.0.0.1:8000/api/categories').then(response => response.json())
    ]).then(([tasksJson, categoriesJson]) => {
      setTaks(tasksJson);
      setCategories(categoriesJson);
      setLoad(false);
    }).catch(error => {
      console.error('Error en fetch:', error);
    });
  }, [])

  return (
    <tasksContext.Provider value={{categories, taks, load}}>
        {children}
    </tasksContext.Provider>
  )
}
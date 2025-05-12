'use client'

import { createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';

const tasksContext = createContext();

export function useTaskContext(){
  return useContext(tasksContext)
}

export default function TasksProvider({children}) {

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(Cookies.get('token'))

    const getToken = async () => {
      const tokenCookie = await Cookies.get('user');
      if (tokenCookie) {
        setToken(tokenCookie);
      }
    };

    getToken();
  }, [])

  return (
    <tasksContext.Provider value={{token}}>
        {children}
    </tasksContext.Provider>
  )
}
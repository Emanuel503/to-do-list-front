'use client'

import { useTaskContext } from "../provider/TasksProvider";
import { useEffect, useState } from "react";

export default function GridTaks() {

  const { token } = useTaskContext();
  const [tasks, setTasks] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (token) { // Asegúrate de que el token está disponible
      setLoad(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(tasksJson => {
        setTasks(tasksJson); // Actualiza el estado de tasks con los datos recibidos
        setLoad(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoad(false);
      });
    }
  }, [token]);

  return (
    <>
     <div className="grid grid-cols-12 gap-6 mx-4 md:mx-20">
        
      </div>
      {
        (tasks.length == 0 && load == false) && 
        <h3 className="font-semibold text-2xl text-center">No hay tareas registradas</h3>
      }
    </>
  )
}

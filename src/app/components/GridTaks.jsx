'use client'

import {Card, CardHeader, CardBody, CardFooter, Button, Spinner} from "@nextui-org/react";
import { FaClock } from "react-icons/fa";
import { formatDate } from "../utils/funcionts";
import { useTaskContext } from "../provider/TasksProvider";

export default function GridTaks() {

  const { taks, load } = useTaskContext();
  
  return (
    <>
     <div className="grid grid-cols-12 gap-6">
        {
          taks.map((task) => (
              <Card style={{background: `#${task.color}`}} key={task.id} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 hover:scale-105 hover:cursor-pointer transition-transform">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="font-semibold leading-none text-white text-lg">{task.title ? task.title : "Sin titulo" }</h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-small text-white">
                    <p>
                      {task.description}
                    </p>
                    {
                      task.start_date ?
                        <span className="pt-8">
                          <p>Fecha de inicio: {task.start_date}</p>
                          <p>Fecha de fin: {task.start_date}</p>
                        </span> 
                        : '' 
                    }
                  </CardBody>
                  <CardFooter className="justify-between  text-small">
                      <div className="flex items-center">
                        {task.start_date || task.start_date ? <FaClock className="mr-2"/> : '' }
                        {task.start_date ? formatDate(task.start_date, "DD/M") : ''}  
                        {task.start_date ? formatDate(task.start_date, " - DD/M") : ''}
                      </div>
                      <p className="font-semibold text-white">{task.category ? task.category : 'Sin categoria'}</p>
                  </CardFooter>
              </Card>
          ))
        }
      </div>
      {
        (taks.length == 0 && !load) && 
        <h3 className="font-semibold text-2xl">No hay tareas registradas</h3>
      }
    </>
  )
}

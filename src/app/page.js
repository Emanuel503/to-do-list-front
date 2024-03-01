'use client'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {

  const [taks, setTaks] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:9000/api/task')
            .then(response => response.json())
            .then(json => setTaks(json))
  }, [])

  return (
    <main className="mx-20">
      <div className="grid grid-cols-12 gap-5">

      {
        taks.map((task) => (
            <Card key={task.id} className={`col-span-6 md:col-span-4 xl:col-span-3 ${task.color ? `bg-[#${task.color}]` : "" } `}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="font-semibold leading-none text-white">{task.title ? task.title : "Sin titulo" }</h4>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-white">
                  <p>
                    {task.description}
                  </p>
                  {
                    task.start_date ?
                      <span className="absolute bottom-0 pt-4">
                        <p>Fecha de inicio: {task.start_date}</p>
                        <p>Fecha de fin: {task.start_date}</p>
                      </span> 
                      : '' 
                  }
                </CardBody>
                <CardFooter className="justify-between">
                    <p className="font-semibold text-white text-small">{task.created_at}</p>
                    <p className="font-semibold text-white text-small">{task.category ? task.category : 'Sin categoria'}</p>
                </CardFooter>
            </Card>
        ))
      }
      </div>
    </main>
  );
}

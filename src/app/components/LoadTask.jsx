'use client'

import { Spinner } from '@nextui-org/react';
import { useTaskContext } from '../provider/TasksProvider';

export default function LoadTask() {

  const {load} = useTaskContext();

  return (
    load && 
      <div className="flex justify-center w-full p-xl-0">
          {
            load &&
            <div className="flex items-center">
              <Spinner size="lg" label="Cargando..." color="primary" />
            </div>
          }
      </div>
  )
}

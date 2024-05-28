'use client'

import React from 'react'
import {Button} from "@nextui-org/react";
import { useTaskContext } from "../provider/TasksProvider";

export default function NavCategories() {

  const {categories} = useTaskContext();

  return (
    <nav className='flex gap-x-3 flex-row mb-6 overflow-x-auto mx-4 md:mx-20'>
      {
        categories.map((category, index) => (
          <Button size="md" key={category + index} radius="full" className="flex flex-row items-center justify-between min-w-fit">
            {category.category ? category.category : "Sin categoria"}
            <span className="bg-gray-500 h-5 w-5 rounded-full text-small">{category.count}</span>
          </Button>
        ))
      }
    </nav>
  )
}

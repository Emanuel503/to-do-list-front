'use client'

import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Input, AutocompleteItem, Autocomplete, DatePicker} from "@nextui-org/react";
import { useTaskContext } from '../provider/TasksProvider';
import { useForm } from 'react-hook-form';
import { parseDate } from "@internationalized/date";

export default function ModalTask() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const {categories} = useTaskContext();

  const [color, setColor] = useState('#60907e')

  const [startDate, setStartDate] = useState(null)

  const [endDate, setEndDate] = useState(null)

  const haddleColorPicker = (e) => {
    setColor(e.target.value)
  }

  const formatNumber = (n) => {
    let num = null;
    num = parseInt(n)
    return num < 10? `0${num}` : `${num}`
  }
  const handdleCalendarStartDate = (e) => {
    setStartDate(`${e.year}-${formatNumber(e.month)}-${formatNumber(e.day)}`);
  }

  const handdleCalendarEndDate = (e) => {
    setEndDate(`${e.year}-${formatNumber(e.month)}-${formatNumber(e.day)}`);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data = {
      ...data,
      start_date : startDate,
      end_date : endDate
    }
  }

  return (
    <>
      <div className="flex justify-end mb-8 mx-4 md:mx-20">
          <Button onPress={onOpen} radius="full" isIconOnly className="text-2xl">
            <FiPlus />
          </Button>
      </div>

      <Modal 
          size="2xl" 
          isOpen={isOpen} 
          onClose={onClose} 
          placement="top-center"
      >
          <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Registrar tarea</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-y-3'>  
                  <ModalBody className='grid grid-cols-12'>
                      <Input 
                        type="text" 
                        label="Titulo" 
                        name="title" 
                        placeholder="Escribe el titulo"
                        className='col-span-12' 
                        {...register("title")} 
                      />

                      <Textarea
                          label="Descripcion"
                          name="description" 
                          placeholder="Escribe una descripcion"a
                          {...register("description", {required: true})}
                          color={`${errors?.description?.type === "required" ? 'danger': 'default'}`}
                          className='col-span-12' 
                      />
                      {errors?.description?.type === "required" && <p className='text-red-700 text-sm col-span-12'>Este campo es requerido</p>}

                      <Autocomplete  
                        label="Categoria" 
                        name='category'
                        allowsCustomValue={true}
                        defaultItems={categories}
                        className='col-span-12' 
                        {...register("category")}
                      >
                        {(item, index) => <AutocompleteItem key={`${item.category}${index}`} value={item.category}>{item.category ? item.category : "Sin categoria"}</AutocompleteItem>}
                      </Autocomplete>

                      <DatePicker 
                        label={"Fecha Inicio"} 
                        className="col-span-12 md:col-span-6"
                        name='start_date'
                        onChange={(e) => handdleCalendarStartDate(e)}
                      />

                      <DatePicker 
                        label={"Fecha Fin"} 
                        className="col-span-12 md:col-span-6" 
                        name='end_date'
                        onChange={(e) => handdleCalendarEndDate(e)}
                        isDisabled={!startDate ? true : false}
                        minValue={parseDate(startDate !== null ? startDate : '2024-01-01')}
                      />

                      <div className='bg-[#2a2a2d] hover:bg-[#3f3f46] rounded-xl px-3 py-1 w-max col-span-12 md:col-span-6'>
                        <h5 className='font-light text-[12px]'>Color</h5>
                        <input 
                          type='color'
                          name='color'
                          {...register("color")}
                          value={color}
                          className='w-12 h-8 bg-transparent'
                          onChange={(e) => haddleColorPicker(e)}
                        >
                        </input>
                      </div>
                    
                  </ModalBody>
                  <ModalFooter>
                      <Button onPress={onClose}>
                        Cerrar
                      </Button>
                      <Button type='submit' color="primary">
                        Guardar
                      </Button>
                  </ModalFooter>
                </form>
                </>
            )}
          </ModalContent>
      </Modal>
    </>
  )
}

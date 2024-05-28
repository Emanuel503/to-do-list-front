'use client'

import React from 'react'
import { FiPlus } from "react-icons/fi";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Input, AutocompleteItem, Autocomplete} from "@nextui-org/react";
import { useTaskContext } from '../provider/TasksProvider';
import { useForm } from 'react-hook-form';

export default function ModalTask() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const {categories} = useTaskContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {console.log(data)}

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
                  <ModalBody>
                      <Input 
                        type="text" 
                        label="Titulo" 
                        name="title" 
                        placeholder="Escribe el titulo" 
                        {...register("title")} 
                      />

                      <Textarea
                          label="Descripcion"
                          placeholder="Escribe una descripcion"
                          {...register("description", {required: true})}
                          color={`${errors?.description?.type === "required" ? 'danger': 'default'}`}
                      />
                      {errors?.description?.type === "required" && <p className='text-red-700 text-sm'>Este campo es requerido</p>}

                      <Autocomplete  
                        label="Categoria" 
                        allowsCustomValue={true}
                        defaultItems={categories}
                        {...register("category")}
                      >
                        {(item) => <AutocompleteItem key={item.category}>{item.category ? item.category : "Sin categoria"}</AutocompleteItem>}
                      </Autocomplete>
                    
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

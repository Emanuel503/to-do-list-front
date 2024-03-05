'use client'

import React from 'react'
import { FiPlus } from "react-icons/fi";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Input} from "@nextui-org/react";

export default function ModalTask() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <div className="flex justify-end mb-8">
          <Button onPress={onOpen} radius="full" isIconOnly className="text-2xl">
            <FiPlus />
          </Button>
      </div>

      <Modal 
          size="2xl" 
          isOpen={isOpen} 
          onClose={onClose} 
      >
          <ModalContent>
          {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1">Registrar tarea</ModalHeader>
              <ModalBody>
                <form>  
                  <Input className="mb-4" type="text" label="Titulo" name="title" placeholder="Escribe el titulo" />
                  <Textarea
                      label="Descripcion"
                      placeholder="Escribe tu descripcion"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                  <Button onPress={onClose}>
                  Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                  Guardar
                  </Button>
              </ModalFooter>
              </>
          )}
          </ModalContent>
      </Modal>
    </>
  )
}

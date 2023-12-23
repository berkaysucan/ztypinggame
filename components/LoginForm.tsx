"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, Checkbox,} from "@nextui-org/react"

import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { LockIcon, MailIcon } from "lucide-react";

export default function LoginForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const session = useSession()
  const router = useRouter()
  const [input, setInput] = useState({
          email: '',
          password: ''
          })


          const loginUser = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault()
              signIn('credentials',
               {...input, redirect: false
              })
              .then((callback) => {
                  if (callback?.error) {
                      toast.error(callback.error)
                  }

                  if(callback?.ok && !callback?.error) {
                      toast.success('Logged in successfully!')
                  }
              } )
          }
  return (
    <>
      <Button onPress={onOpen} color="primary" variant="ghost" >Login</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={input.email}
                  onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
              }}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={input.password}
                  onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
              }}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={loginUser}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
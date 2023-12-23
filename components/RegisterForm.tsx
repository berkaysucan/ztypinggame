"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, Checkbox,} from "@nextui-org/react"
import { Button } from "@nextui-org/button";

import { Input } from "@nextui-org/input";
import axios from "axios";
import toast from "react-hot-toast";
import { LockIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
type Input = {
  email: string;
  password: string;
  username:string;
};
export default function RegisterForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

 
  const [input, setInput] = useState<Input>({ email: "", password: "" ,username:""});

  const handleSubmit = async () => {


    const data = input;
    
    
      const response = await axios.post("/api/createUser", data).then((res) => {toast.success(res.data)}).catch((res) => toast.error(res.response.data));
      
      
      
    
    
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">Register</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
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
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  value={input.username}
                  onChange={(e) => {
                  setInput({ ...input, username: e.target.value });
              }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit} >
                  Sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
"use client"
import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import axios, { AxiosResponse } from "axios";
import { RotateCcw } from "lucide-react";
import { useEffect, useState,useRef } from "react";
import { useSession } from "next-auth/react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";




export default function Home() {
  const { distance, closest } = require("fastest-levenshtein");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [words,setWords] = useState<string>();
  const [game,setGame] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30); // Initial time in seconds
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [correctLetter,setCorrectLetter] = useState<number>(0);
  const [wrongLetter,setWrongLetter] = useState<number>(0);

  let letterIndex = 0 ;
  const username = "shoo11";
  //=> 'faster'
	const { data: session, status } = useSession();

  const handleSubmit = () =>{
    setTime(30);
    if(session)
    {
      axios.post("/api/createScore", {email:session?.user?.email, score:((correctLetter - wrongLetter) * 15)  }).then((res) => {toast.success(res.data)}).catch((res) => toast.error(res.response.data));
    }
    else{
      toast.error("You must login to save your score");
    }

    setCorrectLetter(0);
    setWrongLetter(0);

  }
  const fetchData = async () => {
    try {
      const fetchwords: AxiosResponse = await axios(
        "https://random-word-api.herokuapp.com/word?number=50"
      );
      setWords(fetchwords.data?.join(" "));
    } catch (error) {
      console.error("Hata oluştu: ", error);
    }
  };

  const startGame = () => {

    setGame(true);
    setTime(30);
  
    // Clear any existing interval
    if (timerId) {
      clearInterval(timerId);
    }
  
    setTimerId(
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerId as NodeJS.Timeout);
            setGame(false);
            onOpen();
            fetchData();
            const span = document.querySelectorAll(".letter");
            span.forEach((item)=>{item.classList.remove("bg-red-500");item.classList.remove("bg-green-500")});

            return 0; // Set the time to 0 when it reaches 1
          } else if (prevTime > 0 ) {
            // Only decrement if prevTime is greater than 0
            return prevTime -1 ;
          } else {
            // If prevTime is already 0, do not decrement further
            
            return 0;
          }
        });
      }, 1000)
    );
  };
  // Fetch Data
  useEffect(() => {
    
    fetchData(); 

  }, [])

  
  
  // Game Logic
  useEffect(() => {

    

    const handleKeyDown = (e: KeyboardEvent) => {
      const span = document.querySelectorAll(".letter");
      
      const letter = span[letterIndex]?.textContent;

      if(span[letterIndex+1]?.textContent === undefined){
        setGame(false);
        letterIndex = 0;
        span.forEach((item)=>{item.classList.remove("bg-blue-500");item.classList.remove("bg-red-500");item.classList.remove("bg-green-500")});
        return


      } 

      if(e.key === "Backspace" && letterIndex > 0){
        letterIndex = letterIndex - 1;
        // span[letterIndex + 1]?.classList?.remove("bg-blue-500");
        (span[letterIndex].classList.remove("bg-green-500"));
        (span[letterIndex].classList.remove("bg-red-500"));
        
      }
      if(e.key !== "Backspace" && e.keyCode >= 48 && e.keyCode <= 90){
      
      if(letter === e.key){
        // (span[letterIndex+1]?.classList?.add("bg-blue-500"));
        // (span[letterIndex]?.classList?.remove("bg-blue-500"));
        (span[letterIndex]?.classList?.add("bg-green-500"));
        setCorrectLetter((correctLetter)=>correctLetter+1);
        
      }
      else{
        (span[letterIndex]?.classList?.add("bg-red-500"));
        setWrongLetter((wrongLetter)=>wrongLetter+1);
      }
      letterIndex = letterIndex + 1;
      }
    }

    if(game){
    window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [game])
  
 


  return (
    
   
    <>
    <div><Toaster/></div>
    <div className="text-center md:mt-12 mb-8 md:mb-12">
    {game && <Button color="primary" variant="solid" disabled className="text-2xl ">
      {time}s
      </Button>}
    </div>
    <div  className="justify-center items-center flex flex-wrap ">
    
    {words?.split(" ").map((word,index)=>(<Code key={index}  className="m-1">{word.split("").map((letter: string, index: number) =>( <span className="letter text-xl md:text-base  transition duration-500  ease-in-out" key={index} >{letter}</span>))}</Code>))}
    
    
    </div>

    <div className="flex items-center gap-4 justify-center mt-8 md:mt-12 mb-8">
    <Button color="primary" variant="solid" startContent={<RotateCcw />} onClick={startGame}>
        Start the game !
      </Button>
      <Button color="default" variant="ghost"  startContent={<RotateCcw />}
      onClick={() => {
            fetchData();
            setGame(false);
            clearInterval(timerId as NodeJS.Timeout);

          }}>
        New Words
      </Button>
      
      </div>
      <>

      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Result</ModalHeader>
              <ModalBody className=""> 
                
                <p>Accuracy :</p><span className="text-green-500">{((correctLetter / (correctLetter + wrongLetter)) * 100).toFixed(2)}%</span>
                <p>Mistakes :</p><span className="text-red-500">{wrongLetter}</span>
                <p>Points :</p><span className="text-blue-500">{(correctLetter - wrongLetter) * 15}</span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit} >
                  Save your score
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    </>
  );
}

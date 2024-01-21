"use client"

import { useEffect, useRef } from "react"
import {
  apiKeyAtom,
  generateOutlineHandlerAtom,
  inputAtom,
  stepHandlerAtom,
} from "@/atoms/form-atoms"
import { motion } from "framer-motion"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"
import clsx from "clsx"

const containerVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 30,
  },
}

const Step1 = () => {
  const step = useAtomValue(stepHandlerAtom)
  const [inputValue, setInputValue] = useAtom(inputAtom)
  const [apiKeyValue, setApiKeyValue] = useAtom(apiKeyAtom)
  const generateOutlineHandler = useSetAtom(generateOutlineHandlerAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const openaiToken = localStorage.getItem("openaiToken")
    setApiKeyValue(openaiToken!)
  }, [])

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length > 10) {
      inputRef.current?.blur()
    }

    const openaiToken = localStorage.getItem("openaiToken")
    if (!openaiToken) {
      // Prompt the user for the token and store it in Local Storage
      const userInput = prompt(
        "OpenAI api key is recquired. It will be stored in your browser storage. \n\n Please Enter your OpenAI Token:"
      )
      if (userInput) {
        localStorage.setItem("openaiToken", userInput)
        setApiKeyValue(userInput)
      }
    }

    await generateOutlineHandler()
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit={step === 0 ? "initial" : "exit"}
      className="flex flex-col justify-center w-full h-[80vh]"
    >
      <div>
        {/* Content Container */}
        <div className="flex flex-col flex-1 gap-3">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Generate Aricles with AI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Just Provide a few sentences for the AI to create an outline. Modify
            and finalize the outline to let AI generate the article.
          </p>
        </div>
        {/* Input */}
        <form onSubmit={formHandler} className="w-full mt-4 space-y-6">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="w-full text-base"
            placeholder="An article about why open source is great ..."
            ref={inputRef}
          />
          <Button type="submit" className={clsx("w-full",!inputValue && "cursor-not-allowed")}>
            Create Outline
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default Step1

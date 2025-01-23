
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CraeteBoard } from "@/actions/create-board"
import { useState } from "react"

export const formBoardSchema = z.object({
  boardname: z.string().min(3, {
    message: "Board Name must be at least 3 characters.",
  }),
})

export function CraeteBoardForm() {
  const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formBoardSchema>>({
        resolver: zodResolver(formBoardSchema),
        defaultValues: {
            boardname: "",
        },
      })


      async function onSubmit(values: z.infer<typeof formBoardSchema>) {
        setLoading(true)
        await CraeteBoard(values).then(()=>{
          form.reset()
          setLoading(false)
        })
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex space-x-2  justify-center ">
        <FormField
          control={form.control}
          name="boardname"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Enter a Board Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
         disabled={loading}
          type="submit"
          >Create</Button>
      </form>
    </Form>
  )
}

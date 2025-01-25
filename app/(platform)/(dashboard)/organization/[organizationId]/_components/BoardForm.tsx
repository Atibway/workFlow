
"use client"

import { createBoard } from "@/actions/create-board"
import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action"


export function CraeteBoardForm() {
  const {execute, fieldError} = useAction(createBoard, {
    onSuccess: (data)=> {
      console.log(data, "SUCCESS");
      
    },
    onError: (error)=> {
      console.error(error);
      
    }
  })
const onSubmit = (formData: FormData)=>{
const title = formData.get("title") as string;

execute({title});
}
  return (
  <form action={onSubmit}>
  <div className="flex flex-col space-y-2">
<FormInput
id={"title"}
errors={fieldError}
label={"Board Title"}
/>
<FormButton>
  Create
</FormButton>
  </div>
  </form>
  )
}

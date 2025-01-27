"use client"

import { updateCard } from "@/actions/update-card"
import { FormButton } from "@/components/form/form-button"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action"
import { cardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface DescriptionProps {
  data: cardWithList
}
export const Description = ({
  data
}:DescriptionProps) => {
  const queryClient = useQueryClient()
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false);
  
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  
  const enableEditing = () => {
      setIsEditing(true);
      setTimeout(() => {
          textareaRef.current?.focus();
      });
  };
  
  const disableEditing = () => {
      setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
        formRef.current?.requestSubmit();
    }
};


useEventListener("keydown", onKeyDown);
useOnClickOutside(formRef, disableEditing)
 

  const {execute, fieldError} = useAction(updateCard, {
    onSuccess: (data)=> {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id]
      })
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      })
    toast.success(`Card "${data.title}" updated`)
    disableEditing();
    }, 
    onError: (error)=> {
    toast.error(error ,  {
      style: {
        backgroundColor: '#ff4d4f', 
        color: 'white',            
        border: '1px solid #d32f2f', 
      },
    });
    }
      })

  const onSubmit = (formData: FormData)=>{
    const description = formData.get("description") as string
    const boardId = params.boardId as string
   
    execute({
      description,
      boardId,
      id: data.id
    })
  }

  return (
    <div className="flex items-start gap-x-3  w-full">
  <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
  <div className="w-full ">
    
    <p className="font-semibold text-neutral-700 text-start">
      Description
    </p>
    {isEditing ? (
 <form ref={formRef} className="space-y-2" action={onSubmit}>
      <FormTextarea
        id="description"
        errors={fieldError}
        ref={textareaRef}
        defaultValue={data.description || undefined}
        className="w-full mt-2"
        placeholder="Add a more detailed description"
      />

      <div className="flex items-center gap-x-2">
<FormButton>
  Save
</FormButton>
<Button
type="button"
onClick={disableEditing}
size={"sm"}
variant={"ghost"}
>
  Cancel
</Button>
      </div>
    </form> 
    ): (

    <div
    onClick={enableEditing}
    role="button"
    className="min-h-[78px] bg-neutral-200 text-sm text-start font-medium py-3 px-3.5 rounded-md"
    >
{data.description || "Add a more detailed description..."}
    </div>
    )}
  </div>
</div>

  )
}


Description.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6  bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
}

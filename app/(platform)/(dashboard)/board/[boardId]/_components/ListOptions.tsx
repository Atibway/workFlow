"use client"

import { List } from "@prisma/client"

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormButton } from "@/components/form/form-button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-List";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";
  

interface ListOptionsProps {
    data: List;
    onAddCard: ()=> void
}

export const ListOptions = ({
data,
onAddCard
}: ListOptionsProps) => {
const closeRef = useRef<ElementRef<"button">>(null);

    const {execute:executeDelete} = useAction(deleteList, {
        onSuccess:(data)=>{
toast.success(`List "${data.title}" Deleted`);
closeRef.current?.click();
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
    const {execute:executeCopy} = useAction(copyList, {
        onSuccess:(data)=>{
toast.success(`List "${data.title}" Copied`);
closeRef.current?.click();
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
          const onDelete =(formData: FormData)=> {
            const id = formData.get("id") as string;
            const boardId = formData.get("boardId") as string;

            executeDelete({id, boardId})
          }
          const onCopy =(formData: FormData)=> {
            const id = formData.get("id") as string;
            const boardId = formData.get("boardId") as string;

            executeCopy({id, boardId})
          }
  return (
    <Popover>
    <PopoverTrigger asChild>
<Button className="h-auto w-auto p-2" variant="ghost">
<MoreHorizontal className="h-4 w-4"/>
</Button>
    </PopoverTrigger>
    <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
<div className="text-sm font-medium text-center text-neutral-600 pb-4">
    List Action
</div>
<PopoverClose ref={closeRef} asChild>
<Button
className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
variant={"ghost"}
>
<X className="h-4 w-4"/>
</Button>
    </PopoverClose>

    <Button
    onClick={onAddCard}
    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
    variant={"ghost"}
    >
       Add Card... 
    </Button>
 <form action={onCopy} className="flex-1 px-[2px]">
 <input hidden id="id" name="id" value={data.id} />
 <input hidden id="boardId" name="boardId" value={data.boardId} />
<FormButton
className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
variant={"ghost"}
>
    Copy list...
</FormButton>
</form>
<Separator/>
<form action={onDelete} className="flex-1 px-[2px]">
 <input hidden id="id" name="id" value={data.id} />
 <input hidden id="boardId" name="boardId" value={data.boardId} />
<FormButton
className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
variant={"ghost"}
>
    Delete This List
</FormButton>
</form>
    </PopoverContent>
  </Popover>
  
  )
}

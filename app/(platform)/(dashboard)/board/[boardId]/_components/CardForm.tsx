"use client"

import { FormButton } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
   listId: string;
   enableEditing: ()=> void;
   disableEditing: ()=> void;
   isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
listId,
enableEditing,
disableEditing,
isEditing
}, ref) => {

    if (isEditing) {
        return (
          <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md" >
            <FormTextarea
             onKeyDown={()=> {}}
             ref={ref}
              id="title"
              className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
              placeholder="Enter a title for this card..."
            />
            <input hidden id="listId" name="listId" value={listId} />

            <div className="flex items-center gap-x-1">
           <FormButton>
            Add card
           </FormButton>
           <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
            <X className="h-5 w-5"/>
           </Button>
            </div>
          </form>
        );
      } 
        

  return (
    <div className="pt-2 px-2">
        <Button
    onClick={enableEditing}
    className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
    size="sm"
    variant="ghost"
>
    <Plus className="h-4 w-4 mr-2" />
    Add a card
</Button>

    </div>
  )
})

CardForm.displayName = "CardForm"


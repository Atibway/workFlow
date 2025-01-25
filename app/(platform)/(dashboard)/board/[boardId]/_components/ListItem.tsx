
"use client"

import { Card, List } from "@prisma/client"
import ListHeader from "./ListHeader"
import { ElementRef, useRef, useState } from "react"
import { CardForm } from "./CardForm"



interface ListItemProps {
    data: List & {
        card: Card[]
    }
    index: number
}

export const ListItem = ({
data,
index
}: ListItemProps) => {
   const [isEditing, setIsEditing] = useState(false);   
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

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
  <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
    <ListHeader
    onAddCard = {enableEditing}
    data={data}
    />
    <CardForm
     listId={data.id}
     ref={textareaRef}
     isEditing={isEditing}
     enableEditing={enableEditing}
     disableEditing={disableEditing}
    />
  </div>
</li>

  )
}

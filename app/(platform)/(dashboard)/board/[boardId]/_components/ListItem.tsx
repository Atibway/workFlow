
"use client"

import { Card, List } from "@prisma/client"
import ListHeader from "./ListHeader"
import { ElementRef, useRef, useState } from "react"
import { CardForm } from "./CardForm"
import { CardItem } from "./CardItem"
import { cn } from "@/lib/utils"
import {Draggable, Droppable} from "@hello-pangea/dnd"



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
    <Draggable draggableId={data.id} index={index}>
{(provided)=> (

    <li 
    {...provided.draggableProps}
    ref={provided.innerRef}
    className="shrink-0 h-full w-[272px] select-none">
  <div
  {...provided.dragHandleProps}
  className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
    <ListHeader
    onAddCard = {enableEditing}
    data={data}
    />
    <Droppable droppableId={data.id} type="card">
{(provided)=> (

    <ol
    ref={provided.innerRef}
    {...provided.droppableProps}
  className={cn(
    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
    data.card.length > 0 ? "mt-2" : "mt-0",
  )}
>
  {data.card.map((card, index) => (
    <CardItem
      index={index}
      key={card.id}
      data={card}
    />
  ))}
  {provided.placeholder}
</ol>
)}
    </Droppable>

    <CardForm
     listId={data.id}
     ref={textareaRef}
     isEditing={isEditing}
     enableEditing={enableEditing}
     disableEditing={disableEditing}
    />
  </div>
</li>
)}
    </Draggable>

  )
}

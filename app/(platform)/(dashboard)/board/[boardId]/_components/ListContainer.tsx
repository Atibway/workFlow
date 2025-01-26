"use client"


import { Card, List } from "@prisma/client"
import { ListForm } from "./ListForm"
import { useEffect, useState } from "react"
import {DragDropContext, Droppable} from "@hello-pangea/dnd"
import { ListItem } from "./ListItem"
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"


interface ListContainerProps {
    data: (List & {
      card: Card[]
    })[]
    boardId: string
  }

export const ListContainer = ({
data,
boardId
}:ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute:executeUpdateListOrder} = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List Re-ordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute:executeUpdateCardOrder} = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("card Re-ordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  function reorder<T>(list: T[], startIndex: number, endIndex: number){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result
  }

  const onDragEnd = (result:any)=> {
const {destination, source, type} = result

if(!destination){
  return;
}
//if dropped in the same position
if(destination.droppableId === source.droppableId && destination.index === source.index){
  return;
}

//if User moving a list
if(type == "list"){
  const items = reorder(
    orderedData,
    source.index,
    destination.index,
  ).map((item, index)=> ({...item, order: index}))
  setOrderedData(items)
  //Server Actions
  executeUpdateListOrder({items, boardId});
}

//if User moving card
if(type === "card"){
let newOrderedData = [...orderedData]

//source and destination list
const sourceList = newOrderedData.find(list => list.id === source.droppableId);
const destList = newOrderedData.find(list => list.id === destination.droppableId);

if(!sourceList || !destList){
  return;
}

//check if card exists on the sourceList
if(!sourceList.card){
sourceList.card = []
}

//check if cards exists on the destList
if(!destList.card){
destList.card = []
}

// Moving the card in the same list
if (source.droppableId === destination.droppableId) {
  const reorderedCards = reorder(
      sourceList.card,
      source.index,
      destination.index,
  );

  reorderedCards.forEach((card, idx) => {
      card.order = idx;
  });

  sourceList.card = reorderedCards;

  setOrderedData(newOrderedData);

  //Server Actions
  executeUpdateCardOrder({
    boardId,
    items: reorderedCards
  })
  //User moves the card to another List
}else {
  //Remove card from the source List
  const [movedCard] = sourceList.card.splice(source.index, 1);

// Assign the new listId to the moved card
movedCard.listId = destination.droppableId;

// Add card to the destination list
destList.card.splice(destination.index, 0, movedCard);

sourceList.card.forEach((card, idx) => {
  card.order = idx;
});

// Update the order for each card in the destination list
destList.card.forEach((card, idx) => {
  card.order = idx;
});

setOrderedData(newOrderedData)
executeUpdateCardOrder({
  boardId,
  items: destList.card
})
}


}

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="lists" type="list" direction="horizontal">
{(provided)=> (
   <ol 
   {...provided.droppableProps}
   ref={provided.innerRef}
   className="flex gap-x-3 h-full">
    {orderedData.map((item, index) => (
        <ListItem key={item.id} index={index} data={item} />
      ))}
      {provided.placeholder}
    <ListForm/>
    <div className="flex-shrink-0 w-1"/>
   </ol>
)}
</Droppable>
    </DragDropContext>
  )
}

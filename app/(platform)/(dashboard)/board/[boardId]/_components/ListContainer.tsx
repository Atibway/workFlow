"use client"


import { Card, List } from "@prisma/client"
import { ListForm } from "./ListForm"
import { useEffect, useState } from "react"
import { ListItem } from "./ListItem"


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

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
   <ol className="flex gap-x-3 h-full">
    {orderedData.map((item, index) => (
        <ListItem key={item.id} index={index} data={item} />
      ))}
    <ListForm/>
    <div className="flex-shrink-0 w-1"/>
   </ol>
  )
}

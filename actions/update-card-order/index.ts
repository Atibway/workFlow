"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateSateActions } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";


 const handler = async (data: InputType): Promise<ReturnType>=>{

  const {userId, orgId} = auth()

if(!userId || !orgId){
    return {error: "Unauthorized"}
}

const {items, boardId} = data

let updatedCard;

try {
const transaction = items.map((card)=> db.card.update({
  where: {
    id: card.id,
    list :{
      board: {
        orgId
      }
    }
  },
  data: {
    order: card.order,
    listId: card.listId
  }
}))

updatedCard = await db.$transaction(transaction);



} catch (error) {
return {
  error: "Failed to re order"
}
}

revalidatePath(`/board/${boardId}`)
return {data: updatedCard};
}

export const updateCardOrder = CreateSateActions(UpdateCardOrder, handler);
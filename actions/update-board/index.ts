"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateSateActions } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";




 const handler = async (data: InputType): Promise<ReturnType>=>{

  const {userId, orgId} = auth()

if(!userId || !orgId){
    return {error: "Unauthorized"}
}

const {title, id} = data


let board;

try {

 board = await db.board.update({
  where: {
    id,
    orgId,

  },
  data:{
    title
  }
 })
} catch (error) {
return {
  error: "Failed to update."
}
}

revalidatePath(`/board/${id}`)
return {data: board};
}

export const updateBoard = CreateSateActions(UpdateBoard, handler);
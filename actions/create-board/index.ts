"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateSateActions } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";



 const handler = async (data: InputType): Promise<ReturnType>=>{

  const {userId, orgId} = auth()

if(!userId || !orgId){
    return {error: "Unauthorized"}
}

const {title, image} = data

const [
imageId,
imageThumbUrl,
imageFullUrl,
imageLinkHTML,
imageUserName
]  = image.split("|");


if( !imageId || !imageThumbUrl || !imageFullUrl|| !imageLinkHTML || !imageUserName) {
  return {
    error:"Missing fields. Failed to create board."
  }
}

let board;

try {

 board = await db.board.create({
  data: {
    title,
    orgId,
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML
  }
 })
} catch (error) {
return {
  error: "Failed to create."
}
}

revalidatePath(`/board/${board.id}`)
return {data: board};
}

export const createBoard = CreateSateActions(CreateBoard, handler);
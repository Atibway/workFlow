"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateSateActions } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";


 const handler = async (data: InputType): Promise<ReturnType>=>{

  const {userId, orgId} = auth()

if(!userId || !orgId){
    return {error: "Unauthorized"}
}

const {title, boardId, id} = data
console.log(title, boardId, id);

if(!title || !boardId || !id){
  return {error: "Field required"}
}

let list;

try {

 list = await db.list.update({
  where:{
    id,
    boardId,
    board:{
      orgId
    }
  },
  data: {
    title
  }
 })
} catch (error) {
return {
  error: "Failed to Update"
}
}
console.log(list);

revalidatePath(`/board/${boardId}`)
return {data: list};
}

export const updateList = CreateSateActions(UpdateList, handler);
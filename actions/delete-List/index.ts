"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateSateActions } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


 const handler = async (data: InputType): Promise<ReturnType>=>{

  const {userId, orgId} = auth()

if(!userId || !orgId){
    return {error: "Unauthorized"}
}

const { id, boardId} = data
let list
try {

 list = await db.list.delete({
  where: {
    id,
    boardId,
    board:{
      orgId
    }
  }
 })

  await createAuditLog({
    entityTitle: list.title,
    entityId: list.id,
    entityType: ENTITY_TYPE.LIST,
    action: ACTION.DELETE
  })

} catch (error) {
return {
  error: "Failed to Delete."
}
}

revalidatePath(`/board/${boardId}`)

return {data: list}
}

export const deleteList = CreateSateActions(DeleteList, handler);
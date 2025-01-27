import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


interface Props {
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    action: ACTION;
  }
  
 export  async function createAuditLog(props: Props) {
    try {
      const orgId = (await auth()).orgId;
      const user = await currentUser();
  
      if (!user || !orgId) throw new Error("User not found!");
  
      const { entityId, entityType, entityTitle, action } = props;

await db.auditLog.create({
  data: {
    orgId,
    entityId,
    entityType,
    entityTitle,
    action,
    userId: user.id,
    userImage: user?.imageUrl,
    userName: user?.firstName + " " + user?.lastName,
  }
});

      
    } catch (error) {
      console.error("[AUDIT_LOG_ERROR]", error);
    }
  }
  
import { z } from "zod"
import { ActionState } from "@/lib/create-safe-action";
import { Card } from "@prisma/client";
import { CopyCard } from "./schema";


export type InputType = z.infer< typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>
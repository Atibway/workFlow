"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
  } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher";
import { cardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
  

  export const CardModal = ()=> {
const id = useCardModal((state)=> state.id);
const isOpen = useCardModal((state)=> state.isOpen);
const onClose = useCardModal((state)=> state.onClose);

const  {data: cardData} = useQuery<cardWithList>({
queryKey: ["card", id],
queryFn: ()=> fetcher(`/api/cards/${id}`)
})

    return (
        <Dialog 
        onOpenChange={onClose}
        open={isOpen}
        >
  <DialogContent>
    <DialogHeader>
        {!cardData
        ? <Header.Skeleton/>
        :   <Header
        data={cardData}
        />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
  <div className="col-span-3">
    <div className="w-full space-y-6">
      {!cardData
        ? <Description.Skeleton />
        : <Description data={cardData} />
      }
    </div>
  </div>
  {!cardData
        ? <Actions.Skeleton />
        : <Actions data={cardData} />
      }
</div>
   
    </DialogHeader>
  </DialogContent>
</Dialog>

    )
  }
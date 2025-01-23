"use client"

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
  } from "@/components/ui/sheet"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
  

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMouted] = useState(false);

    const onOpen = useMobileSidebar((state)=> state.onOpen);
    const onClose = useMobileSidebar((state)=> state.onClose);
    const isOpen = useMobileSidebar((state)=> state.isOpen);

    useEffect(()=>{
setIsMouted(true)
    },[])
    useEffect(()=>{
onClose()
    },[pathname, onClose])

    if(!isMounted){
        return null
    }
  return (
    <>
<Button
onClick={onOpen}
className="block md:hidden"
variant={"ghost"}
size={"sm"}
>
<Menu className="h-7 w-7"/>
</Button>

<Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent side={"left"} className="p-2 pt-10">
 <Sidebar
 storegeKey="t-sidebar-mobile-state"
 />
  </SheetContent>
</Sheet>

    </>
  )
}

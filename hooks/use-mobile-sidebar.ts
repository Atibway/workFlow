import { create } from "zustand";

type MobileSidebarstore = {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

export const useMobileSidebar = create<MobileSidebarstore>((set)=> ({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))
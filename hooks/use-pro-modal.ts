import { create } from "zustand";

type CardStore = {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

export const useProModal = create<CardStore>((set)=> ({
  
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))
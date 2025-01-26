import { create } from "zustand";

type CardStore = {
    id?: string
    isOpen: boolean;
    onOpen: (id: string)=> void;
    onClose: ()=> void;
}

export const useCardModal = create<CardStore>((set)=> ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string)=> set({isOpen: true, id}),
    onClose: ()=> set({isOpen: false, id: undefined})
}))
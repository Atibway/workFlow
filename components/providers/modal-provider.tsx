"use client"

import React, { useEffect, useState } from 'react'
import { CardModal } from '../modals/card-modal'
import { ProModal } from '../modals/pro-modal';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
setIsMounted(true)
    }, [])

    if(!isMounted){
return null;
    }
  return (
    <div>
        <CardModal/>
        <ProModal/>
    </div>
  )
}

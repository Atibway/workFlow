

import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { cardWithList } from '@/types';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

interface ActionsProps {
  data: cardWithList
}

export const Actions = ({
    data
}: ActionsProps) => {
const params = useParams();
const cardModal = useCardModal();

  const {execute: executeCopyCard, isLoading:isLoadingCopy} = useAction(copyCard, {
    onSuccess: (data)=> {
    toast.success(`Card "${data.title}" Copied`)
    cardModal.onClose();
    }, 
    onError: (error)=> {
    toast.error(error ,  {
      style: {
        backgroundColor: '#ff4d4f', 
        color: 'white',            
        border: '1px solid #d32f2f', 
      },
    });
    }
      })
  const {execute: executeDeleteCard, isLoading:isLoadingDelete} = useAction(deleteCard, {
    onSuccess: (data)=> {
    toast.success(`Card "${data.title}" Deleted`)
    cardModal.onClose();
    }, 
    onError: (error)=> {
    toast.error(error ,  {
      style: {
        backgroundColor: '#ff4d4f', 
        color: 'white',            
        border: '1px solid #d32f2f', 
      },
    });
    }
      })

      const onCopy = ()=> {
        const boardId = params.boardId as string;

        executeCopyCard({
          id: data.id,
          boardId
        })
      }
      const onDelete = ()=> {
        const boardId = params.boardId as string;

        executeDeleteCard({
          id: data.id,
          boardId
        })
      }

  return (
    <div className="space-y-2 mt-2">
    <p className="text-xs font-semibold text-start">Actions</p>
    <Button 
    onClick={onCopy}
    disabled={isLoadingCopy}
    variant="gray" 
    className="w-full justify-start" 
    size="inline"
    >
      <Copy className="h-4 w-4 mr-2" /> Copy
    </Button>
    <Button 
    onClick={onDelete}
    disabled={isLoadingDelete}
    variant="gray" 
    className="w-full justify-start" 
    size="inline"
    >
      <Trash className="h-4 w-4 mr-2" /> Delete
    </Button>
  </div>
  
  )
}


Actions.Skeleton = function HeaderSkeleton() {
    return (
      <div className="space-y-2 mt-2">
        <Skeleton className=" w-20 h-4 bg-neutral-200" />
        <Skeleton className=" w-full h-4 bg-neutral-200" />
        <Skeleton className=" w-full h-4 bg-neutral-200" />
        
      </div>
    );
  }
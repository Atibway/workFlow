
import React from 'react'
import { CraeteBoardForm } from './_components/BoardForm'
import { db } from '@/lib/db'

const OrganisationIdPage = async() => {
  const boards  = await db.board.findMany()
  return (
    <div className='flex flex-col space-y-4'>
      <CraeteBoardForm/>
      <div className='space-y-2'>
{boards.map((board)=> (
  <div key={board.id}>
Board title: {board.title}
  </div>
))}
      </div>
    </div>
  )
}

export default OrganisationIdPage
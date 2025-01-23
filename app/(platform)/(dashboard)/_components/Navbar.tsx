
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import { MobileSidebar } from './MobileSidebar'

export const Navbar = () => {
  return (
    <nav className='fixed px-4 z-50 top-0 w-full h-14 border-b shadow-sm bg-white
     flex items-center'>
            <MobileSidebar/>
        <div className="flex items-center gap-x-4">
            <div className="hidden md:flex">
                <Logo/>
            </div>
            <Button variant={"primary"} size={"sm"} className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
                Create
            </Button>
            <Button variant={"primary"} size={"sm"} className='rounded-sm block md:hidden'>
                <Plus className='h-4 w-4'/>
            </Button>
            
        </div>

        <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
  hidePersonal
  afterSelectOrganizationUrl={"/organization/:id"}
  afterLeaveOrganizationUrl='/select-org'
  afterCreateOrganizationUrl={"/organization/:id"}
  appearance={{
    elements:{
        rootBox: {
            display: "Flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }
  }}
  />
  <UserButton
  afterSwitchSessionUrl='/'
  appearance={{
    elements:{
        avatarBox:{
            height: 30,
            width: 30
        }
    }
  }}
  />
        </div>
    </nav>
  )
}

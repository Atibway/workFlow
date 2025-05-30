


import React from 'react'
import { Info } from '../_components/Info';

import { SubscriptionButton } from './_components/SubscriptionButton';
import { Separator } from '@/components/ui/separator';
import { checkSubscription } from '@/lib/subscription';

const BillingPage = async() => {
    const isPro = await checkSubscription();

  return (
    <div className='w-full'>
<Info
isPro={isPro}
/>
<Separator className='my-2'/>

<SubscriptionButton
isPro={isPro}
/>

    </div>
  )
}

export default BillingPage
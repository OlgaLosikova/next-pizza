import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import {  CircleUser, User } from 'lucide-react'
import Link from 'next/link'

interface Props {
  onClickSighIn:()=>void;
  className?:string;
}

const ProfileButton:React.FC<Props> = ({className, onClickSighIn}) => {
       const {data:session}=useSession();
  return (
    <div>
        {!session?<Button onClick={onClickSighIn} variant='outline' className='flex items-center gap-3'><User size={16} />Войти</Button>:<Link href='/profile'>
        <Button variant={'secondary'} className='flex items-center gap-2'>
<CircleUser size={18}/>
Профиль
        </Button>
        </Link>}
    </div>
  )
}
export default ProfileButton
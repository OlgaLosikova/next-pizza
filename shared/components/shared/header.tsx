'use client'
import React, { useEffect } from 'react'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import ProfileButton from './profile-button'
import Container from './container'
import Link from 'next/link'
import SearchInput from './search-input'
import CartButton from './cart-button'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import AuthModal from './auth-modal/auth-modal'

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

const Header: React.FC<Props> = ({ className, hasSearch, hasCart }) => {
  const [open, setOpen]=React.useState(false)
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('paid')) toast.success('Оплата прошла успешно!')
  }, [])
  return (
    <header className={cn('border border-b', className)}>
      <Container className='flex item-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div><h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p></div>
          </div>
        </Link>

        {hasSearch && <div className='mx-10 flex-1'>
          <SearchInput />
        </div>}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1 transition'>
            <AuthModal open={open} onClose={()=>setOpen(false)}/>
            <ProfileButton onClickSighIn={()=>setOpen(true)}/>
            {hasCart && <CartButton />}
          </div>
        </div>
      </Container>
    </header>
  )
}
export default Header